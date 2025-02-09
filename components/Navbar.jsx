/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the Navbar, including layout, design, and functionality.
 */

import Link from "next/link";
import styles from "../styles/Navbar.module.css"; // Import Navbar styles

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            {/* Logo/Title */}
            <div className={styles.logo}>
                <Link href="/">Covid</Link>
            </div>

            {/* Navigation Links */}
            <div className={styles.navLinks}>
                <Link href="/">Home</Link>
                <Link href="/dashboard_home">Live Data</Link>
                <Link href="/heatmap">Interactive Heatmap</Link>
                <Link href="/maychart">Covid in Singapore</Link>
                <Link href="/page">About Covid</Link>
            </div>
        </nav>
    );
};

export default Navbar;

