/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented:   created a functional heatmap
 */
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat"; // Import Leaflet heatmap functionality
import geoJson from "custom.geo.json"; // Import GeoJSON file
import chroma from 'chroma-js';

// Color mapping function based on selected data layer (total, active, or deaths)
const getColor = (cases) => {
    const scale = chroma.scale(['green', 'yellow', 'orange', 'red'])
        .domain([0, 5000, 50000, 1000000]);

    return scale(cases).hex();
};

const LeafletMap = ({ data, selectedLayer }) => {
    useEffect(() => {
        if (!data || data.length === 0) return;

        const map = L.map("map").setView([20, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        }).addTo(map);

        const geoLayer = L.geoJSON(geoJson, {
            style: (feature) => {
                const countryData = data.find((country) => country.Country === feature.properties.name);
                let color;
                switch (selectedLayer) {
                    case "total":
                        color = countryData ? getColor(countryData.TotalConfirmed) : 'gray';
                        break;
                    case "active":
                        color = countryData ? getColor(countryData.ActiveCases) : 'gray';
                        break;
                    case "deaths":
                        color = countryData ? getColor(countryData.Deaths) : 'gray';
                        break;
                    default:
                        color = 'gray';
                }

                return {
                    fillColor: color,
                    weight: 1,
                    opacity: 0.6,
                    color: 'white',
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
                            color: '#666',
                            fillOpacity: 0.9
                        });

                        let countryCardContent = `
                            <div class="country-card">
                                <h3>${feature.properties.name}</h3>
                        `;

                        // Show data based on selected layer
                        const cases = selectedLayer === "total" ? countryData.TotalConfirmed :
                            selectedLayer === "active" ? countryData.ActiveCases :
                            selectedLayer === "deaths" ? countryData.Deaths : 0;

                        countryCardContent += `<p><strong>${selectedLayer === "total" ? "Total Cases" :
                            selectedLayer === "active" ? "Active Cases" : "Deaths"}:</strong> ${cases || "No Data"}</p>`;
                        countryCardContent += `</div>`;

                        layer.bindPopup(countryCardContent).openPopup();
                    });

                    layer.on("mouseout", (e) => {
                        geoLayer.resetStyle(e.target);
                    });
                }
            }
        }).addTo(map);

        return () => {
            map.remove();
        };
    }, [data, selectedLayer]);

    return <div id="map" style={{ width: "75%", height: "700px" }}></div>;
};

export default LeafletMap;
