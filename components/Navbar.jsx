/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the Navbar, including layout, design, and functionality.  
 */
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Import Navbar styles

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Link href="/">Covid</Link>
            <div>
                <Link href="/">Home</Link>
                <Link href="/dashboard_home">Live Data</Link>
                <Link href="/heatmap">Interactive Heatmap</Link>
                <Link href="/maychart">Covid in Singapore</Link>
                <Link href="/page">About Covid</Link>
            </div>
        </div>
    );
};

export default Navbar;

