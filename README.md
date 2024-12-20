# LocalFarm - React Application

**LocalFarm** is a modern React-based web application designed for managing local farms and greenhouses efficiently.

Hosted on Azure: https://zealous-glacier-0fddea800.4.azurestaticapps.net
 
 **Credentials**:

 Email: test@gmail.com

 Password: 123456

### Final Year Project
This project is presented as a partial fulfillment of the Bachelor of Information Technology (BIT) degree at Texas College of Management and IT.  
**Developed by Abhay Kumar Mandal**, BIT 2021 Fall.

## Features

- **🌱 Add and Delete Greenhouses:** Seamlessly add and remove greenhouses based on your needs.
- **🔒 Role-based Access Control:** 
  - **Farm Owners** can fully manage (add/edit/delete) greenhouses.
  - **Farmers** have restricted access to view and manage only their assigned greenhouses.
- **🔗 Firebase Integration:** Securely stores user and greenhouse data using Firebase.
- **📊 Dynamic Data Visualization:** 
  - Real-time data for temperature, humidity, and soil moisture is visualized using **ECharts**.
- **⚙️ Threshold Monitoring:** Monitors sensor thresholds for automated greenhouse control.
- **📱 Responsive Design:** 
  - Fully responsive across various devices with **Tailwind CSS**.
- **🌗 Light and Dark Mode:** Supports both light and dark themes for an enhanced user experience.
- **🔑 User Authentication:** Secure user sign-in managed via Firebase Authentication.
- **📧 Email Notifications:** Sends notifications using **EmailJS**.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v12 or above)  
  [Download and Install Node.js](https://nodejs.org/)

- **npm** (v6 or above)  
  Comes with Node.js. If not installed, get it via [npmjs.com](https://www.npmjs.com/get-npm).

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

Access the application at `http://localhost:5173`.

To expose the app to your local network:

```bash
npm run dev -- --host 0.0.0.0
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `build/` folder with production-ready code.

