import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Import Navbar styles

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Link href="/">Covid</Link>
            <div>
                <Link href="/">Home</Link>
                <Link href="/live-data">Live Data</Link>
                <Link href="/heatmap">Interactive Heatmap</Link>
                <Link href="/heatmap">Covid in Singapore</Link>
                <Link href="/heatmap">About Covid</Link>
            </div>
        </div>
    );
};

export default Navbar;

