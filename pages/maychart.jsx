//Student Name: May Cherry Aung Student Number: S10269732

// Importing components for displaying COVID-19 line and hospitalisation charts
import CovidLineChart from "../components/CovidLineChart";
import CovidHospitalChart from "../components/CovidHospitalChart";
// Importing CSS module for styling
import styles from "../styles/Chart.module.css";

export default function HomePage() {
  return (
    // Main container with padding and space between sections, using styles from Chart.module.css
    <main className={`p-6 space-y-12 ${styles.container}`}>
      {/* Centering content and adding padding */}
      <div className="max-w-screen-lg mx-auto px-4">
        {/* Section for COVID-19 Line Chart */}
        <section className="chart-container">
          <CovidLineChart />
        </section>
        {/* Section for COVID-19 Hospitalisation Chart */}
        <section className="chart-container">
          <CovidHospitalChart />
        </section>
      </div>
    </main>
  );
}