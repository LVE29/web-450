# Agent Performance Reporting Engine (APRE)

## Project Overview

APRE is a MEAN stack application used for managing users and generating sales, agent performance, and customer feedback reports. This repository contains the existing application and development updates completed throughout WEB 450.

## Technologies

- Angular, TypeScript, HTML, and CSS
- Node.js and Express
- MongoDB
- Jest, Supertest, Jasmine, and Karma

## Project Structure

- `apre-client` – Angular frontend
- `apre-server` – Express backend and MongoDB integration

## Installation and Setup

**Backend**

From the `apre-server` folder:

```bash
npm install
```

Create a `.env` file containing:

```env
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

**Frontend**

From the `apre-client` folder:

```bash
npm install
npx ng serve
```

Open `http://localhost:4200` in your browser.

Database credentials must remain in the local `.env` file and should never be committed to GitHub.

## Development Updates

### Monthly Sales Report

Added a Monthly Sales Report that retrieves monthly sales totals through a new API endpoint and displays the results using APRE's shared chart component. Updated routing and navigation and added three backend and three frontend tests.

**Verification:** 9 sales API tests and 3 Angular tests passed. The production build succeeded with bundle-size warnings. Live database results were not verified.

### Agent Performance Report (M-084)

Added an Agent Performance Report that calculates average performance scores for each agent using MongoDB. The report uses APRE's shared TableComponent for sorting and pagination.

Updated the API, Angular component, routing, and sidebar navigation.

**Verification:** 3 backend tests and 3 Angular tests passed. The report successfully displayed 16 agent records in the application.

## Testing

Run backend tests from `apre-server`:

```bash
npm test
```

Run Angular tests from `apre-client`:

```bash
npx ng test --watch=false
```

Run the Angular production build:

```bash
npx ng build
```

## Notes

This project builds on the original APRE application. Existing functionality is maintained as new reports, fixes, and tests are added throughout the course.