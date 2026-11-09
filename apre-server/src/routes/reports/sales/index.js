
/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre sales report API for the sales reports
 *
 * Modified by: Leslie Espino
 * Date: 11/1/2026
 * Description: Added an endpoint for monthly sales totals.
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');

const router = express.Router();

/**
 * GET /regions
 * Fetches a list of distinct sales regions.
 */
router.get('/regions', (req, res, next) => {
  try {
    mongo(async db => {
      const regions = await db.collection('sales').distinct('region');
      res.send(regions);
    }, next);
  } catch (err) {
    console.error('Error getting regions: ', err);
    next(err);
  }
});

/**
 * GET /regions/:region
 * Fetches sales data for a specific region, grouped by salesperson.
 */
router.get('/regions/:region', (req, res, next) => {
  try {
    mongo(async db => {
      const salesReportByRegion = await db.collection('sales').aggregate([
        { $match: { region: req.params.region } },
        {
          $group: {
            _id: '$salesperson',
            totalSales: { $sum: '$amount' }
          }
        },
        {
          $project: {
            _id: 0,
            salesperson: '$_id',
            totalSales: 1
          }
        },
        {
          $sort: { salesperson: 1 }
        }
      ]).toArray();

      res.send(salesReportByRegion);
    }, next);
  } catch (err) {
    console.error('Error getting sales data for region: ', err);
    next(err);
  }
});

/**
 * GET /monthly
 * Fetches total sales grouped by year and month.
 *
 * Note: Assumes sales documents contain a date field.
 */
router.get('/monthly', (req, res, next) => {
  try {
    mongo(async db => {
      try {
        const monthlySales = await db.collection('sales').aggregate([
          {
            $match: {
              date: { $type: 'date' }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: '$date' },
                month: { $month: '$date' }
              },
              totalSales: { $sum: '$amount' }
            }
          },
          {
            $project: {
              _id: 0,
              year: '$_id.year',
              month: '$_id.month',
              totalSales: 1
            }
          },
          {
            $sort: { year: 1, month: 1 }
          }
        ]).toArray();

        res.send(monthlySales);
      } catch (err) {
        next(err);
      }
    }, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
