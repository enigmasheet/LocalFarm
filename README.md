
```markdown
# LocalFarm - React Application

This project is a React-based web application for managing local farms and greenhouses.

### Final Year Project
This project is submitted in partial fulfillment of the requirements for the Bachelor of Information Technology (BIT) degree at Texas College of Management and IT.  
Developed by **Abhay Kumar Mandal**, BIT 2021 Fall.

## Features

- **Add and Delete Greenhouses:** Users can add and remove greenhouses as per their needs.
- **Role-based Access Control:** The system supports role-based access control where:
  - **Farm Owners** can manage (add/edit/delete) greenhouses.
  - **Farmers** have restricted access, allowing them to view and manage only specific greenhouses.
- **Firebase Integration for Database:** Firebase is used to store user and greenhouse data securely.
- **Dynamic Data Visualization:** Real-time data for temperature, humidity, and soil moisture is visualized using dynamic charts with **ECharts**.
- **Threshold Monitoring:** Includes a feature to monitor sensor thresholds for greenhouse automation.
- **Responsive Design:** The application is designed to be fully responsive across various devices using **Tailwind CSS**.
- **Light and Dark Mode:** The application supports both light and dark mode for better user experience.
- **User Authentication:** Firebase Authentication is used for secure user sign-in.
- **Email Notifications:** Utilizes **EmailJS** for sending email notifications.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v12 or above)  
  [Download and Install Node.js](https://nodejs.org/)

- **npm** (v6 or above)  
  Comes with Node.js. If not installed, you can install it via [npmjs.com](https://www.npmjs.com/get-npm).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/enigmasheet/LocalFarm.git
   cd LocalFarm
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

To expose the app to your local network:

```bash
npm run dev -- --host 0.0.0.0
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate the `build/` folder with production-ready code.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
```
