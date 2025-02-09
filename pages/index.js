/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the Home page  
 */
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Create this CSS file for the homepage styles

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to the COVID-19 InfoHub!</h1>
            <p className={styles.description}>Track the spread of COVID-19 across the world with our tools</p>

            {/* Navigate to Heatmap */}
            <div className={styles.navContainer}>
                <Link href="/heatmap">
                    <button className={styles.button}>Find out more</button>
                </Link>
            </div>
        </div>
    );
}
