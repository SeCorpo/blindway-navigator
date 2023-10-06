const db = require('../mysql_connection');

class Search {
    constructor(start_station_name, startTime) {
        this.start_station_name = start_station_name;
        this.startTime = startTime;
        console.log('search - this.startTime:', this.startTime); // Debugging statement
    }

    rows = [];

    async fetchTrainTrackRows() {
        try {

            console.log('search - From: [', this.start_station_name, '] startTimeString: ', this.startTime, ' endTimeString: ', this.getTimePlusOneHour());

            // Create a MySQL query to retrieve rows within the 1-hour time period
            // const query =
            //     `SELECT * FROM train_tracks WHERE start_station_name = ? AND TIME(timeOfDeparture) >= ? AND TIME(timeOfDeparture) <= ?;`;

            const query = `SELECT track_id, start_station_name, end_station_name, TIME(timeOfDeparture) as timeOfDeparture, TIME(timeOfArrival) as timeOfArrival, departurePlatform, arrivalPlatform, train_type, exitSide 
FROM train_tracks WHERE start_station_name = ? AND TIME(timeOfDeparture) >= ? AND TIME(timeOfDeparture) <= ?;`;

            // Execute the query with the provided parameters
            this.rows = await db.query(query, [this.start_station_name, this.startTime, await this.getTimePlusOneHour()]);

            if(this.rows.length > 0) {
                console.log('search - fetchTrainTrackRows: rows - ' + this.rows.length)
                return this.rows;
            } else {
                console.error('search - fetchTrainTrackRows: rows !> 0')
            }
        } catch(error) {
            console.error('Error executing the query:', error);
            throw error;
        }
    }
    getTimePlusOneHour() {
        const [hours, minutes, seconds] = this.startTime.split(":").map(Number);

        let newHours = hours + 1;
        let newMinutes = minutes;
        let newSeconds = seconds;

        if (newHours >= 24) {
            newHours -= 24;
        }

        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
    }
    async fetchTimeOfArrival(transferTime, trackId) {
        try {
            //const query = `SELECT TIME(timeOfArrival) as time FROM train_tracks WHERE track_id = ?`;

            const query = `
            SELECT TIME(DATE_ADD(timeOfArrival, INTERVAL ? MINUTE)) as time
            FROM train_tracks
            WHERE track_id = ?
        `;

            const result = await db.query(query, [transferTime, trackId]);

            if (result.length > 0) {
                return result[0].time;
            } else {
                throw new Error('No matching records found');
            }
        } catch(error) {
            console.log('search: cannot fetch timeOfArrival from row:');
            throw error;
        }
    }
}

module.exports = Search;
