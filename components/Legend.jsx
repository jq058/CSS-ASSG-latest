/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the Legend, including layout, design, and functionality.  
 */
import styles from "../styles/Legend.module.css"; // Assuming you have a separate CSS file for the Legend

const Legend = () => {
    return (
        <div className={styles.legendContainer}>
            <p><b>COVID-19 Cases by Country</b></p>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'green' }}></div>
                <span> less than 5000 Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'yellow' }}></div>
                <span>5000–50000 Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'orange' }}></div>
                <span>50000–1000000 Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'red' }}></div>
                <span>1000000+ Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'gray' }}></div>
                <span>No Data</span>
            </div>
        </div>
    );
};

export default Legend;
