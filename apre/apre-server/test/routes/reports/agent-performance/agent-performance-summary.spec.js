
/**
 * Author: Leslie Espino
 * Date: 11/08/2026
 * File: agent-performance-summary.spec.js
 * Description: Unit tests for the M-084 Agent Performance Report API.
 */

'use strict';

const request = require('supertest');
const express = require('express');
const router = require('../../../../src/routes/reports/agent-performance/index');
const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

const app = express();
app.use(express.json());
app.use('/api/reports/agent-performance', router);

describe('M-084 Agent Performance Report API', () => {
  beforeEach(() => {
    mongo.mockReset();
  });

  // Test 1: Verify the endpoint returns agent performance data.
  it('should return agent performance data', async () => {
    const mockData = [
      { agentId: '1', name: 'Agent A', averagePerformance: 90 },
      { agentId: '2', name: 'Agent B', averagePerformance: 85 }
    ];

    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue(mockData)
        })
      };

      await callback(db);
    });

    const response = await request(app)
      .get('/api/reports/agent-performance/agent-performance-summary');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  // Test 2: Verify an empty report is handled correctly.
  it('should return an empty array when no records exist', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([])
        })
      };

      await callback(db);
    });

    const response = await request(app)
      .get('/api/reports/agent-performance/agent-performance-summary');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test 3: Verify database errors are handled.
  it('should return an error when the database query fails', async () => {
    mongo.mockImplementation(async (callback, next) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockRejectedValue(
            new Error('Database query failed')
          )
        })
      };

      try {
        await callback(db);
      } catch (error) {
        next(error);
      }
    });

    const response = await request(app)
      .get('/api/reports/agent-performance/agent-performance-summary');

    expect(response.status).toBe(500);
  });
});
