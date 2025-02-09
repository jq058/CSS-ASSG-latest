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
            <h1 className={styles.title}>Welcome to the COVID-19 info hub!</h1>
            <p className={styles.description}>Stay informed with the latest updates, facts, and resources about COVID-19. <br></br>Explore our sections to learn more about COVID-19 and see live updates of covid cases,<br></br> an interactive heatmap, and the progress of vaccinations in Singapore.</p>

            {/* Navigate to Heatmap */}
            <div className={styles.navContainer}>
                <Link href="/heatmap">
                    <button className={styles.button}>Find out more</button>
                </Link>
            </div>
        </div>
    );
}
