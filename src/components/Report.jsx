import React from "react";
import { FaFileCsv } from "react-icons/fa";

const Report = ({ greenhouse, latestData, pastData, thresholds, systemState }) => {
  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = [
      "Type",
      "Temperature (°C)",
      "Humidity (%)",
      "Moisture (%)",
      "Timestamp",
    ];
    csvContent += headers.join(",") + "\r\n";

    // Add greenhouse info
    csvContent += `"Greenhouse Name",${greenhouse.name || "N/A"}\r\n`;
    csvContent += `"Plant Name",${greenhouse.plantname || "N/A"}\r\n`;
    csvContent += `"Temperature Threshold",${thresholds.temperature || "N/A"} °C\r\n`;
    csvContent += `"Humidity Threshold",${thresholds.humidity || "N/A"} %\r\n`;
    csvContent += `"Moisture Threshold",${thresholds.moisture || "N/A"} %\r\n`;
    csvContent += "\r\n";

    // Add latest data
    csvContent += [
      "Latest Data",
      latestData?.temperature || "N/A",
      latestData?.humidity || "N/A",
      latestData?.moisture || "N/A",
      latestData?.timestamp ? new Date(latestData.timestamp).toLocaleString() : "N/A",
    ].join(",") + "\r\n";

    // Add past data
    csvContent += "\r\nPast Data\r\n";
    pastData.forEach((data) => {
      csvContent += [
        "Sensor Data",
        data.temperature || "N/A",
        data.humidity || "N/A",
        data.moisture || "N/A",
        data.timestamp ? new Date(data.timestamp).toLocaleString() : "N/A",
      ].join(",") + "\r\n";
    });

    // Add system state
    csvContent += "\r\nSystem State\r\n";
    csvContent += [
      "Ventilation",
      systemState.ventilation || "N/A",
    ].join(",") + "\r\n";
    csvContent += [
      "Water Pump",
      systemState.waterPump || "N/A",
    ].join(",") + "\r\n";

    // Create a download link and click it to download the CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "greenhouse_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button 
      className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      onClick={generateCSV}
    >
      <FaFileCsv className="mr-2" />
      Download CSV Report
    </button>
  );
};

export default Report;
