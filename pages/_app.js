// pages/_app.js
/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the page  
 */

import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import '../styles/global.css'; // Global Styles
import "../styles/styles.css";
import '../styles/Chart.module.css';

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Navbar /> {/* Display Navbar on every page */}
            <Component {...pageProps} />
            <Footer /> {/* Display Footer on every page */}
        </div>
    );
}
