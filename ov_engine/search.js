const db = require('../mysql_connection');

class Search {
    constructor(start_station_name, startTime) {
        this.start_station_name = start_station_name;
        this.startTime = startTime;
    }

    rows = [];

    async fetchTrainTrackRows() {
        try {
            // Calculate the end time as 1 hour after the provided start time
            const endTime = new Date(this.startTime);
            endTime.setHours(endTime.getHours() + 1);

            // Create a MySQL query to retrieve rows within the 1-hour time period
            const query =
                `SELECT * FROM train_tracks WHERE start_station_name = ? AND timeOfDeparture >= ? AND timeOfDeparture <= ?;`;

            // Execute the query with the provided parameters
            this.rows = await db.query(query, [this.start_station_name, this.startTime, endTime]);

            if(this.rows.length > 0) {
                console.log('search - fetchTrainTrackRows: rows - ' + this.rows.length)
                return this.rows;
            } else {
                console.error('search - fetchTrainTrackRows: rows !> 0')
            }
        } catch (error) {
            console.error('Error executing the query:', error);
            throw error;
        }
    }
}

module.exports = Search;
