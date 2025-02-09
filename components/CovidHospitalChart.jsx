"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { downloadCSV } from "../utils/exportData";

export default function HospitalisationChart() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState("both"); // Default selection to both
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  
  // State for email subscription
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=d_98e8d8ba612a748413c439550c3c6942"
      );
      const result = await response.json();

      const records = result.result.records;

      const formattedData = records.reduce((acc, curr) => {
        const week = curr.epi_week;
        if (!acc[week]) {
          acc[week] = { epi_week: week, Hospitalised: 0, ICU: 0 };
        }
        if (
          curr.new_admisison_type === "Hospitalised" ||
          curr.new_admisison_type === "ICU"
        ) {
          acc[week][curr.new_admisison_type] = parseInt(curr.count, 10);
        }
        return acc;
      }, {});

      const allData = Object.values(formattedData);
      setData(allData);
      setFilteredData(allData);

      // Extract unique months from the data based on epi_week (first 7 characters)
      const months = [...new Set(allData.map((item) => item.epi_week.slice(0, 7)))];
      setAvailableMonths(months);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = data.filter((item) => item.epi_week.startsWith(selectedMonth));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth, data]);

  const handleSelectionChange = (e) => {
    setSelectedData(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSubscription = () => {
    if (email) {
      // Simulate subscription logic
      setSubscribed(true);
      alert(`Subscribed with ${email} to receive updates.`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const getDescription = () => {
    if (selectedData === "ICU") {
      return (
        "The graph illustrates the weekly count of new ICU admissions due to COVID-19 in Singapore from January 2023 to January 2024. " +
        "The x-axis represents the epidemiological weeks (Epi-weeks), ranging from week 9 of 2023 to week 7 of 2024. " +
        "The y-axis shows the number of ICU admissions, with counts ranging from 0 to 40.\n" +
        "Key Observations: There is a noticeable peak between weeks 15 and 21 of 2023, where ICU admissions fluctuated between 10 and 17 cases. " +
        "A significant spike occurs around week 51 of 2023, reaching over 30 ICU admissions, followed by a gradual decline into early 2024. " +
        "After week 1 of 2024, the number of ICU admissions steadily decreases, approaching zero by week 7 of 2024. " +
        "The data is sourced from the Ministry of Health (MOH) and was last updated 8 months ago. A CSV file with the data is available for download."
      );
    } else if (selectedData === "Hospitalised") {
      return (
        "The graph illustrates the weekly count of new COVID-19 hospitalisations in Singapore from January 2023 to January 2024. " +
        "The x-axis represents the epidemiological weeks (Epi-weeks), ranging from week 9 of 2023 to week 7 of 2024. " +
        "The y-axis shows the number of hospitalisations, with counts ranging from 0 to 1250.\n" +
        "Key Observations: There is a significant peak between weeks 15 and 21 of 2023, where hospitalisations ranged between 500 and 550 cases. " +
        "Another major spike occurs around week 50 of 2023, reaching close to 950 hospitalisations, followed by a steady decline into early 2024. " +
        "By week 7 of 2024, the number of hospitalisations drops significantly. " +
        "The data is sourced from the Ministry of Health (MOH) and was last updated 8 months ago. A CSV file with the data is available for download."
      );
    } else {
      return (
        "The graph illustrates the weekly count of new COVID-19 hospitalisations and ICU admissions in Singapore from January 2023 to January 2024. " +
        "The data is sourced from the Ministry of Health (MOH) and was last updated 8 months ago. A CSV file with the data is available for download."
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-[#2C3E50]">
          Number of New COVID-19 Hospitalisations / ICU Admissions by Epi-week
        </h2>

        {/* Dropdown to select Hospitalised, ICU, or Both */}
        <div className="mb-4">
          <label
            htmlFor="hospitalDataSelect"
            className="block font-medium text-gray-700 mb-2"
          >
            Select Data to Display:
          </label>
          <select
            id="hospitalDataSelect"
            className="border border-gray-400 rounded-md p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
            value={selectedData}
            onChange={handleSelectionChange}
          >
            <option value="both">All</option>
            <option value="Hospitalised">Hospitalised</option>
            <option value="ICU">ICU Admissions</option>
          </select>
        </div>

        {/* Month-based Filter */}
        <div className="mb-4">
          <label
            htmlFor="monthFilter"
            className="block font-medium text-gray-700 mb-2"
          >
            Filter by Month:
          </label>
          <select
            id="monthFilter"
            className="border border-gray-400 rounded-md p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">All Months</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={400}
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="epi_week"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fill: "#6b7280" }}
            />
            <YAxis
              tick={{ fill: "#6b7280" }}
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280",
              }}
            />
            <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderColor: "#d1d5db" }} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: "10px" }}
            />

            {selectedData === "both" ? (
              <>
                <Bar
                  dataKey="Hospitalised"
                  fill="#D18700"
                  name="Hospitalised"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="ICU"
                  fill="#6a0dad"
                  name="ICU Admissions"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
              </>
            ) : (
              <Bar
                dataKey={selectedData}
                fill={selectedData === "Hospitalised" ? "#D18700" : "#6a0dad"}
                name={selectedData === "Hospitalised" ? "Hospitalised" : "ICU Admissions"}
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
        <p className="text-gray-800 mt-4 whitespace-pre-line">{getDescription()}</p>

        {/* CSV Download Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => downloadCSV(filteredData, "Hospitalisation_Data")}
            className="bg-[#2C3E50] hover:bg-[#34495E] text-white py-2 px-4 rounded transition-colors duration-300 shadow"
          >
            Download CSV
          </button>
        </div>

        {/* Email Subscription Section */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800">Get Notified of Updates</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#2C3E50] w-full sm:w-auto"
            />
            <button
              onClick={handleSubscription}
              className="bg-[#2C3E50] hover:bg-[#34495E] text-white py-2 px-4 rounded transition-colors duration-300 shadow mt-2 sm:mt-0 sm:ml-4"
            >
              Subscribe
            </button>
          </div>
          {subscribed && <p className="text-green-600 font-semibold mt-2">You are subscribed!</p>}
        </div>
      </div>
    </div>
  );
}
