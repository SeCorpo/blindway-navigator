var Search = require('./search');

class Build {

    constructor(start_station_name_journey, end_station_name_journey, startTime, transferTime) {
        this.start_station_name_journey = start_station_name_journey;
        this.end_station_name_journey = end_station_name_journey;
        this.startTime = startTime;
        this.transferTime = transferTime;

        this.routeFound = [];
        this.routeString = 'Vul alle velden in';

        this.buildRoute()
            .catch(error => {
                console.error('Error building route:', error);
            });
    }



    //build a route from start_station_name_journey > end_station_name_journey @ startTime from up to three train_tracks
    async buildRoute() {
        try {
            const search1 = new Search(this.start_station_name_journey, this.startTime);
            let search_array1 = await search1.fetchTrainTrackRows();

            //if any route was found
            if(search_array1) {
                for (const row of search_array1) {
                    let array1 = [row];

                    const search2 = new Search(this.findNext_search_station(row), this.findNext_search_start_time(row));
                    let search_array2 = await search2.fetchTrainTrackRows();

                    if(search_array2) {
                        for (const row2 of search_array2) {
                            if(this.findNext_search_station(row2) === this.end_station_name_journey) {
                                this.routeFound.push(row, row2);
                            } else {
                                console.error('in=build: no train_track found from second station within an hour');

                                //tree train_tracks deep
                                const search3 = new Search(this.findNext_search_station(row2), this.findNext_search_start_time(row2));
                                let search_array3 = await search3.fetchTrainTrackRows();

                                if(search_array3) {
                                    for(const row3 of search_array3) {
                                        if(this.findNext_search_station(row3) === this.end_station_name_journey) {
                                            this.routeFound.push(row, row2, row3);
                                        } else{
                                            console.error('in=build: : no train_track found from third station within an hour\n' +
                                                'cannot build a route from more than 3 separate train_tracks');
                                        }
                                    }
                                } else {
                                    console.error('in=build: no train_track found from third station within an hour');
                                }
                            }
                        }
                    } else {
                        console.error('in=build: no train_track found from second station within an hour');
                    }
                }
            } else {
                console.error('in=build: cannot find a route from given station at given time');
            }

            console.log(('in=build: number of rows in routeFound ' + this.routeFound.length));
            this.routeString = this.getRouteAsString();
        } catch(error) {
            console.error('in=build: cannot build route ', error);
            this.routeString = 'in=build: Error building route: ' + error;
        }
    }
    findNext_search_station(row) {
        return row.end_station_name;
    }
    findNext_search_start_time(row) {
        let next_start_time = row.timeOfArrival;

        next_start_time = new Date(next_start_time);
        next_start_time.setMinutes(next_start_time.getMinutes() + this.transferTime);

        return next_start_time;
    }

    getRouteAsString() {
        let result = '';

        this.routeFound.forEach((row, index) => {
            result += 'Track: ' + (index + 1) + '\n';
            result += 'track_id: ' + row.track_id + '\n';
            result += 'start_station_name: ' + row.start_station_name + '\n';
            result += 'end_station_name: ' + row.end_station_name + '\n';
            result += 'timeOfDeparture: ' + row.timeOfDeparture + '\n';
            result += 'timeOfArrival: ' + row.timeOfArrival + '\n';
            result += 'departurePlatform: ' + row.departurePlatform + '\n';
            result += 'arrivalPlatform: ' + row.arrivalPlatform + '\n';
            result += '------------------\n';
        });
        console.log(result)
        return result;
    }

    // printAllRows(routeFound) {
    //     routeFound.forEach((row, index) => {
    //         console.log('Track: ', index + 1);
    //         console.log('track_id:', row.track_id);
    //         console.log('start_station_name:', row.start_station_name);
    //         console.log('end_station_name:', row.end_station_name);
    //         console.log('timeOfDeparture:', row.timeOfDeparture);
    //         console.log('timeOfArrival:', row.timeOfArrival);
    //         console.log('departurePlatform:', row.departurePlatform);
    //         console.log('arrivalPlatform:', row.arrivalPlatform);
    //         console.log('------------------');
    //     });
    // }
}
module.exports = Build;


















