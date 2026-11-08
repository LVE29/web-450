/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre agent performance API for the agent performance reports
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');
const createError = require('http-errors');

const router = express.Router();

/**
 * @description
 *
 * GET /call-duration-by-date-range
 *
 * Fetches call duration data for agents within a specified date range.
 *
 * Example:
 * fetch('/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/call-duration-by-date-range', (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(createError(400, 'Start date and end date are required'));
    }

    console.log('Fetching call duration report for date range:', startDate, endDate);

    mongo(async db => {
      const data = await db.collection('agentPerformance').aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        },
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentDetails'
          }
        },
        {
          $unwind: '$agentDetails'
        },
        {
          $group: {
            _id: '$agentDetails.name',
            totalCallDuration: { $sum: '$callDuration' }
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$_id',
            callDuration: '$totalCallDuration'
          }
        },
        {
          $group: {
            _id: null,
            agents: { $push: '$agent' },
            callDurations: { $push: '$callDuration' }
          }
        },
        {
          $project: {
            _id: 0,
            agents: 1,
            callDurations: 1
          }
        }
      ]).toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error('Error in /call-duration-by-date-range', err);
    next(err);
  }
});


/**
 * Author: Leslie Espino
 * Date: 11/08/2026
 * Task: M-084 - Agent Performance Report
 * Description: Retrieves average performance scores for
 * each agent to support the Sprint 2 report.
 *
 * GET /agent-performance-summary
 */
router.get('/agent-performance-summary', (req, res, next) => {
  mongo(async db => {
    const report = await db.collection('agentPerformance').aggregate([
      {
        $lookup: {
          from: 'agents',
          localField: 'agentId',
          foreignField: 'agentId',
          as: 'agentInfo'
        }
      },
      {
        $unwind: '$agentInfo'
      },
      {
        $group: {
          _id: {
            agentId: '$agentId',
            name: '$agentInfo.name'
          },
          averagePerformance: {
            $avg: {
              $avg: '$performanceMetrics.value'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          agentId: '$_id.agentId',
          name: '$_id.name',
          averagePerformance: 1
        }
      },
      {
        $sort: {
          name: 1
        }
      }
    ]).toArray();

    res.json(report);
  }, next);
});

module.exports = router;