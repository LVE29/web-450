# Agent Performance Reporting Engine (APRE)

## Project Overview

The Agent Performance Reporting Engine (APRE) is a MEAN stack application that provides reporting and administrative tools for reviewing sales, agent performance, and customer feedback data.

The application uses Angular for the frontend, Node.js and Express for the backend, and MongoDB for data storage.

This repository contains the APRE Brownfield project used for WEB 450 development assignments. New features, fixes, and tests are added to the existing application throughout the course.

## Technologies

- Angular and TypeScript
- Node.js and Express
- MongoDB
- Jest and Supertest
- Jasmine and Karma
- HTML and CSS

## Project Structure

The application is organized into two main folders:

- `apre-client` – Angular frontend, components, routing, and user interface
- `apre-server` – Express API, MongoDB integration, and server-side tests

## Application Features

### Dashboard
Provides an overview of application data using charts and reports.

### User Management
Allows authorized users to view, create, and manage user accounts.

### Sales Reports
- **Sales by Region:** Displays sales totals by salesperson for a selected region.
- **Sales by Region – Tabular:** Presents regional sales information in a table.
- **Monthly Sales:** Groups sales totals by year and month and displays them in a bar chart.

### Agent Performance Reports
Includes a Call Duration by Date Range report.

### Customer Feedback Reports
Includes a Channel Rating by Month report.

### Support and FAQ
Provides additional application information and assistance.

## Installation and Setup

### Prerequisites

- Node.js and npm
- Access to a MongoDB database
- Git
- A code editor such as Visual Studio Code

### Backend Setup

1. Open a terminal in the `apre-server` folder.
2. Install dependencies:

   npm install

3. Create a `.env` file in `apre-server` with the following setting:

   MONGODB_URI=your_mongodb_connection_string

4. Start the server:

   npm start

The backend uses port 3000 by default.

**Security:** Database credentials should be stored in environment variables rather than committed to source control. Do not upload `.env` to GitHub.

### Frontend Setup

1. Open a separate terminal in the `apre-client` folder.
2. Install dependencies:

   npm install

3. Start the Angular development server:

   npx ng serve

4. Open http://localhost:4200 in a browser.

The frontend requires the backend and database connection for features that retrieve live data.

## Running Tests

### Backend

From `apre-server`, run:

    npm test

To run the sales report API tests specifically:

    npx jest test/routes/reports/sales/index.spec.js --runInBand

### Frontend

From `apre-client`, run:

    npx ng test --watch=false

To run only the Monthly Sales component tests:

    npx ng test --watch=false --include="src/app/reports/monthly-sales/monthly-sales.component.spec.ts"

### Production Build

From `apre-client`, run:

    npx ng build

## Development Updates

### Monthly Sales Report

Added a new sales report that retrieves monthly totals through the `/api/reports/sales/monthly` endpoint and displays the results using the application's shared chart component.

The update includes:
- A MongoDB aggregation pipeline for monthly sales totals
- An Angular Monthly Sales component
- Routing and sidebar navigation
- Three new backend unit tests
- Three new frontend unit tests

**Verification results:**
- Sales API tests: 9 passed
- Monthly Sales Angular tests: 3 passed
- Angular production build: Successful, with bundle-size warnings

**Known limitation:** The monthly report currently assumes the sales collection uses a MongoDB Date field named `date`. This field has not been verified against the live database. The professor-provided MongoDB connection was unavailable during development, so live-data behavior remains unverified.

## Development Notes

This project builds on the existing APRE application. Changes should preserve existing functionality, include appropriate testing, and document new features or fixes.

Additional development updates will be documented as the project progresses.
