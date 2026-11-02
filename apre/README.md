
# APRE Brownfield Project

## Project Overview

APRE is an existing web application that I am working on as part of my WEB 450 coursework. The project includes features for managing users, viewing sales reports, tracking agent performance, and reviewing customer feedback.

The goal of working with this brownfield application is to make improvements to an existing codebase while keeping its current functionality intact. Throughout the course, I will be adding features, fixing issues, writing tests, and documenting changes.

## Technologies Used

- Angular and TypeScript
- Node.js and Express
- MongoDB
- HTML and CSS
- Jest and Supertest
- Jasmine and Karma
- Git and GitHub

## Project Structure

The application is divided into two main folders:

- `apre-client` - Angular frontend, including components, pages, routing, and user interface features.
- `apre-server` - Node.js and Express backend, including API routes, database operations, and server-side tests.

## Application Features

### Dashboard
Displays application data through charts and visual reports.

### User Management
Provides features for viewing and managing user accounts.

### Sales Reports
Includes sales reporting features such as Sales by Region, Sales by Region (Tabular), and Monthly Sales.

### Agent Performance
Includes a Call Duration by Date Range report.

### Customer Feedback
Includes a Channel Rating by Month report.

### Support and FAQ
Provides additional information and support within the application.

## Getting Started

### Prerequisites

Before running the application, make sure you have:

- Node.js and npm installed
- Visual Studio Code or another code editor
- Access to the MongoDB database used by the project

### Running the Backend

1. Open a terminal in the `apre-server` folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the required MongoDB connection using the `MONGODB_URI` environment variable in a local `.env` file.
4. Start the backend:

   ```bash
   npm start
   ```

The backend runs on port 3000 by default.

### Running the Frontend

1. Open another terminal in the `apre-client` folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Angular application:

   ```bash
   npx ng serve
   ```

4. Open `http://localhost:4200` in a browser.

Both the backend and a working database connection are needed for features that retrieve live data.

## Testing

The project includes automated tests for backend routes and Angular components.

### Backend Tests

From the `apre-server` folder:

```bash
npm test
```

To run the sales report tests:

```bash
npx jest test/routes/reports/sales/index.spec.js --runInBand
```

### Frontend Tests

From the `apre-client` folder:

```bash
npx ng test --watch=false
```

To run the Monthly Sales component tests:

```bash
npx ng test --watch=false --include="src/app/reports/monthly-sales/monthly-sales.component.spec.ts"
```

### Angular Build

To build the frontend:

```bash
npx ng build
```

## Development Updates

### Monthly Sales Report - November 2026

Added a Monthly Sales report to the existing Sales Reports section.

Changes include:

- Created a backend API endpoint to aggregate sales totals by month and year.
- Created an Angular component to display monthly sales data using the existing chart component.
- Added routing and sidebar navigation for the new report.
- Added three backend tests covering successful responses, empty results, and database errors.
- Added three frontend tests covering successful data retrieval, empty results, and API errors.

### Verification

The following checks were completed:

- Sales API tests: 9 passed, including 3 new tests.
- Monthly Sales component tests: 3 passed.
- Angular production build: Completed with bundle-size warnings.

### Known Limitation

The Monthly Sales API currently assumes that sales records contain a MongoDB Date field named `date`. The database schema could not be verified because the MongoDB connection was unavailable during testing.

The automated tests passed using mocked database responses, but the report has not yet been verified against live sales data.

## Development Practices

As I continue working on APRE, I plan to keep changes focused on the assigned tasks, test new functionality, and review existing code before making modifications.

GitHub will be used to track changes throughout the project. This README will also be updated as additional features and improvements are completed.

## Security Notes

Database credentials and other sensitive configuration values should be kept in environment variables rather than committed to GitHub.

Local `.env` files, dependency folders, and generated build files should not be included in repository commits.
