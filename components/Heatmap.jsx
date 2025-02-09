import { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { ClockLoader } from "react-spinners"; // Import ClockLoader
import styles from "../styles/Heatmap.module.css";
import Legend from './Legend'; // Import the Legend component

// Dynamically import LeafletMap to disable SSR
const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false });

const Heatmap = () => {
    const [covidData, setCovidData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getCovidData();
                console.log("Fetched Data: ", data);
                if (data.length === 0) {
                    setError(true);
                } else {
                    setCovidData(data);
                }
            } catch (err) {
                setError(true);
                console.error("Error fetching data:", err.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    async function getCovidData() {
        const url = "https://disease.sh/v3/covid-19/countries";
        const response = await fetch(url);
        const data = await response.json();

        return data.map((country) => ({
            Country: country.country,
            TotalConfirmed: country.cases,
            lat: country.countryInfo.lat,
            lon: country.countryInfo.long,
        }));
    }

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                {/* Show ClockLoader while data is loading */}
                <ClockLoader color="#2A9D8F" size={100} />
                <p>Fetching data...</p>
            </div>
        );
    }

    if (error) return <h2 className={styles.error}>Error fetching data. Please try again later.</h2>;

    return (
        <div className={styles.container}>
            <LeafletMap data={covidData} />
            {/* Only render the Legend once the map has loaded */}
            {!loading && <div className={styles.legendContainer}><Legend /></div>}
        </div>
    );
};

export default memo(Heatmap);
