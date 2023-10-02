const db = require('../mysql_connection');

class Search {
    constructor(start_station_name, startTime) {
        this.start_station_name = start_station_name;
        this.startTime = startTime;
    }

    rows = [];

    async fetchTrainTrackRows() {
        try {
            //get time from date
            const startHour = this.startTime.getHours();
            const startMinutes = this.startTime.getMinutes();
            const startTimeString = `${startHour.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}` + ':00';



            //end time = +1 hour
            const endTime = new Date(this.startTime);
            endTime.setHours(startHour + 1);
            endTime.setMinutes(startMinutes);
            const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}` + ':00';

            // Create a MySQL query to retrieve rows within the 1-hour time period
            const query =
                `SELECT * FROM train_tracks WHERE start_station_name = ? AND TIME(timeOfDeparture) >= ? AND TIME(timeOfDeparture) <= ?;`;

            // Execute the query with the provided parameters
            this.rows = await db.query(query, [this.start_station_name, startTimeString, endTimeString]);

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
