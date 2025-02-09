/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the Legend, including layout, design, and functionality.
 */

import styles from "../styles/Legend.module.css"; // Import the Legend styles

const Legend = () => {
    // Define color mappings and labels for different COVID-19 case levels
    const legendItems = [
        { color: "green", label: "Less than 5,000 Cases" },
        { color: "yellow", label: "5,000 – 50,000 Cases" },
        { color: "orange", label: "50,000 – 1,000,000 Cases" },
        { color: "red", label: "1,000,000+ Cases" },
        { color: "gray", label: "No Data" },
    ];

    return (
        <div className={styles.legendContainer}>
            <p><b>COVID-19 Cases by Country</b></p>
            {legendItems.map((item, index) => (
                <div key={index} className={styles.legendItem}>
                    <div className={styles.colorBox} style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;
