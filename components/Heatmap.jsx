/*  
 * Name: Lau Jia Qi  
 * Student ID: S10267822A
 * Implemented: Full development of the page, including layout, design, and functionality.
 */

import { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { ClockLoader } from "react-spinners"; // Import ClockLoader for loading state
import styles from "../styles/Heatmap.module.css";
import Legend from './Legend'; // Import the Legend component

// MUI components
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"; 

// Dynamically import LeafletMap to disable SSR (Server-Side Rendering)
const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false });

const Heatmap = () => {
    const [covidData, setCovidData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState("total"); // Default filter: Total Cases

    // Fetch COVID-19 data from API on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getCovidData();
                console.log("Fetched Data: ", data);
                
                if (data.length === 0) {
                    setError(true);
                } else {
                    setCovidData(data);
                    setFilteredData(data); // Initially display full dataset
                }
            } catch (err) {
                setError(true);
                console.error("Error fetching data:", err.message);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Update filtered data whenever selected layer changes
    useEffect(() => {
        setFilteredData(
            covidData.map((country) => ({
                ...country,
                value: country[selectedLayer], // Dynamically select the correct data field
            }))
        );
    }, [selectedLayer, covidData]);

    // Fetch COVID-19 country-level data from API
    const getCovidData = async () => {
        const url = "https://disease.sh/v3/covid-19/countries";
        try {
            const response = await fetch(url);
            const data = await response.json();

            return data.map((country) => ({
                Country: country.country,
                TotalConfirmed: country.cases,
                ActiveCases: country.active,
                Deaths: country.deaths,
                lat: country.countryInfo.lat,
                lon: country.countryInfo.long,
                CasesByYear: country.timeline ? country.timeline.cases : {}, // Adding historical data
            }));
        } catch (error) {
            console.error("Error fetching COVID data:", error);
            return [];
        }
    };

    // Handle selection change in filter dropdown
    const handleLayerChange = (event) => {
        setSelectedLayer(event.target.value);
    };

    // Show loading state while fetching data
    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <ClockLoader color="#2A9D8F" size={100} />
                <p>Fetching data...</p>
            </div>
        );
    }

    // Show error message if data fetch fails
    if (error) {
        return <h2 className={styles.error}>Error fetching data. Please try again later.</h2>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>COVID-19 Interactive Heatmap</h1>
            
            {/* Data Layer Filter Dropdown (MUI Select) */}
            <div className={styles.layerFilter}>
                <FormControl variant="outlined">
                    <InputLabel>Filter by</InputLabel>
                    <Select
                        value={selectedLayer}
                        onChange={handleLayerChange}
                        label="Filter by"
                        className={styles.select}
                    >
                        <MenuItem value="total">Total Cases</MenuItem>
                        <MenuItem value="active">Active Cases</MenuItem>
                        <MenuItem value="deaths">Deaths</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Render the map with filtered data */}
            <LeafletMap data={filteredData} selectedLayer={selectedLayer} />
            
            {/* Show Legend once map is loaded */}
            {!loading && (
                <div className={styles.legendContainer}>
                    <Legend />
                </div>
            )}
        </div>
    );
};

// Memoize component for performance optimization
export default memo(Heatmap);
