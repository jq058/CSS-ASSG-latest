/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Created a functional heatmap.
 */

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat"; // Import Leaflet heatmap functionality
import geoJson from "custom.geo.json"; // Import GeoJSON file
import chroma from "chroma-js"; // Import Chroma.js for color mapping

// Function to get color scale based on COVID-19 case numbers
const getColor = (cases) => {
    const scale = chroma.scale(["green", "yellow", "orange", "red"])
        .domain([0, 5000, 50000, 1000000]); // Define data thresholds

    return scale(cases).hex(); // Convert color scale to hex
};

const LeafletMap = ({ data, selectedLayer }) => {
    useEffect(() => {
        if (!data || data.length === 0) return;

        // Initialize map
        const map = L.map("map").setView([20, 0], 2);

        // Add OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        }).addTo(map);

        // Define GeoJSON layer with styles and interactions
        const geoLayer = L.geoJSON(geoJson, {
            style: (feature) => {
                const countryData = data.find((country) => country.Country === feature.properties.name);
                let color;

                switch (selectedLayer) {
                    case "total":
                        color = countryData ? getColor(countryData.TotalConfirmed) : "gray";
                        break;
                    case "active":
                        color = countryData ? getColor(countryData.ActiveCases) : "gray";
                        break;
                    case "deaths":
                        color = countryData ? getColor(countryData.Deaths) : "gray";
                        break;
                    default:
                        color = "gray";
                }

                return {
                    fillColor: color,
                    weight: 1,
                    opacity: 0.6,
                    color: "white",
                    fillOpacity: 0.7,
                };
            },
            onEachFeature: (feature, layer) => {
                const countryData = data.find((country) => country.Country === feature.properties.name);

                if (countryData) {
                    layer.on("mouseover", (e) => {
                        const layer = e.target;
                        layer.setStyle({
                            weight: 3,
                            color: "#666",
                            fillOpacity: 0.9,
                        });

                        // Construct popup content dynamically
                        const cases = selectedLayer === "total"
                            ? countryData.TotalConfirmed
                            : selectedLayer === "active"
                                ? countryData.ActiveCases
                                : selectedLayer === "deaths"
                                    ? countryData.Deaths
                                    : 0;

                        const popupContent = `
                            <div class="country-card">
                                <h3>${feature.properties.name}</h3>
                                <p><strong>${selectedLayer === "total" ? "Total Cases" : 
                                    selectedLayer === "active" ? "Active Cases" : "Deaths"}:</strong> 
                                    ${cases || "No Data"}
                                </p>
                            </div>
                        `;

                        layer.bindPopup(popupContent).openPopup();
                    });

                    layer.on("mouseout", (e) => {
                        geoLayer.resetStyle(e.target);
                    });
                }
            },
        }).addTo(map);

        // Cleanup function to remove map on component unmount
        return () => {
            map.remove();
        };
    }, [data, selectedLayer]);

    return <div id="map" style={{ width: "75%", height: "700px" }}></div>;
};

export default LeafletMap;
