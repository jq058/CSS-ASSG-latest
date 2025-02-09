// Student Name: May Cherry Aung 
// Student Number: S10269732

// Function to fetch vaccination data from data.gov.sg API
export const fetchVaccinationData = async () => {
  try {
    // Fetching the data from the API link
    const response = await fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_713e8c4fd88c64a7b7e55e9c2643e936"
    );

    // Check if the response is okay, if not, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Convert the response to JSON format
    const jsonData = await response.json();
    const records = jsonData.result.records; // Get the actual records from the JSON data

    // Mapping the records to get only the data we need
    return records.map(item => ({
      date: item.vacc_date, // Vaccination date in YYYY-MM-DD format
      received_at_least_one_dose: Number(item.received_at_least_one_dose), // Number of people who got at least one dose
      full_regimen: Number(item.full_regimen), // Number of people who completed full vaccination
      minimum_protection: Number(item.minimum_protection) // Number of people with minimum protection
    }));
  } catch (error) {
    // If something goes wrong, log the error and return an empty array
    console.error("Error fetching vaccination data:", error);
    return [];
  }
};
