// pages/chart.jsx // May Cherry Aung, S10269732
import CovidLineChart from "../components/CovidLineChart";
import CovidHospitalChart from "../components/CovidHospitalChart";
import styles from "../styles/Chart.module.css";

export default function HomePage() {
  return (
    <main className={`p-6 space-y-12 ${styles.container}`}>
      {/* Wrapper to control max width and center content */}
      <div className="max-w-screen-lg mx-auto px-4">
        
        {/* Section for Line Chart */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <CovidLineChart />
            </div>
          </div>
        </section>

        {/* Section for Hospital Chart */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <CovidHospitalChart />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
