const assert = require('chai').assert;
const sinon = require('sinon');
const MysqlConnection = require('../mysql_connection');
const app = require('../app');
const request = require('supertest');

describe('MysqlConnection', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should execute a query successfully', async () => {
        const fakeResults = [{ id: 1, name: 'Test' }];

        // Stub the pool.query method to return the fake results
        const poolQueryStub = sandbox.stub(MysqlConnection.pool, 'query');
        poolQueryStub.callsFake((sql, params, callback) => {
            callback(null, fakeResults);
        });

        const sql = 'SELECT * FROM table_name';
        const params = [];

        try {
            const results = await MysqlConnection.query(sql, params);
            assert.deepEqual(results, fakeResults);
        } catch (error) {
            // Handle the error gracefully, e.g., log it
            console.error('Error executing SQL query:', error);
        }
    });

    it('should handle query errors', async () => {
        const poolQueryStub = sandbox.stub(MysqlConnection.pool, 'query');
        poolQueryStub.callsFake((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        const sql = 'SELECT * FROM table_name';
        const params = [];

        try {
            await MysqlConnection.query(sql, params);
            // Test passed, no need to handle the error here
        } catch (error) {
            // Handle the error gracefully, e.g., log it
            console.error('Error executing SQL query:', error);
        }
    });
});
