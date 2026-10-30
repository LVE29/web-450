/**
 * Title: config.js
 * Author: Professor Krasso
 * Date: 8/4/23
 */
/**
 * Modified by: Leslie Espino
 * Date: 10/29/2026
 * Description: Moved the database connection setting to an
 * environment variable so credentials are not stored in source code.
 */

"use strict";

require("dotenv").config();

// Only the database name is needed here; connection credentials
// are supplied separately through the local environment variable.
const db = {
  name: "apre",
};
// Declare the config object
const config = {
  port: 3000, // This is the default port for MongoDB
  dbUrl: process.env.MONGODB_URI,
  dbname: db.name, // This is the name of the database in MongoDB
};

module.exports = config; // Expose the config as a module
