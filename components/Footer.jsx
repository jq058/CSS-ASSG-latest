/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the footer, including layout, design, and functionality.
 */

// components/Footer.jsx
import styles from '../styles/Footer.module.css'; // Import Footer styles

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} CSS Assignment. By Jia Qi, Abin, May, Janice</p>
            
            <p>Learn more from other sources:</p>
            
            <div className={styles.links}>
                <a href="https://data.who.int/dashboards/covid19/data" target="_blank" rel="noopener noreferrer">WHO</a> | 
                <a href="https://www.worldometers.info/coronavirus/" target="_blank" rel="noopener noreferrer">Worldometer</a> | 
                <a href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home" target="_blank" rel="noopener noreferrer">CDC</a>
            </div>
        </footer>
    );
};

export default Footer;
