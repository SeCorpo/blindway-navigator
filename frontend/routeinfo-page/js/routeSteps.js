class RouteSteps {
    constructor(routeFound) {
        this.arrayOfRouteSteps = [];
        this.currentStation = routeFound[0].start_station_name;
        this.currentTimer =
        this.beginStation = routeFound[0].start_station_name;
        this.endStation = routeFound[routeFound.length - 1].end_station_name;

        this.welcomeMessage();

        if(routeFound[0]) {
            this.frontToTrain(routeFound[0]);
        }

        for (let i = 1; i < routeFound.length - 1; i++) {

            this.perronToPerron(routeFound[i])
            this.insideTrainToNextPerron(routeFound[i])
        }

        if(routeFound[routeFound.length -1]) {
            this.perronToExit(routeFound[routeFound.length -1])
        }

        this.arrayOfRouteSteps.forEach((step) => {
            console.log(step);
        });

        return this.arrayOfRouteSteps;

    }

    welcomeMessage() {
        this.arrayOfRouteSteps.push('welcomeMessage-Welkom in Blindway-navigator, wij begeleiden u vandaag met uw reis van: ' + this.beginStation
            + ' naar: ' + this.endStation);
    }
    frontToTrain(row) {
        this.arrayOfRouteSteps.push('frontToTrain-Uw eerste trein vertrekt om: ' + row.timeOfDeparture + ' vanaf perron: ' + row.departurePlatform);
        //currentTimer to timeOfDeparture

        this.arrayOfRouteSteps.push('frontToTrain-Loop richting de lift naar perron: ' + row.departurePlatform);
        //direction from station entrance to first lift location for first platform

        this.arrayOfRouteSteps.push('frontToTrain-U ben aangekomen op het perron, stap in de trein richting: ' + row.end_station_name + ', de trein vertrekt om: ' + row.timeOfDeparture);
        //if currentTimer =< 3 minutes && not already in train {automatically read next string (warning)}

        this.arrayOfRouteSteps.push('frontToTrain-Neem plaats in de trein, druk op volgende als u in de trein zit');
    }

    insideTrainToNextPerron(row) {
        //change currentTimer to timeOfArrival
        this.arrayOfRouteSteps.push('insideTrainToNextPerron-U zit in de trein naar: ' + row.end_station_name + ', de trein komt aan om: ' + row.timeOfArrival);
        //if currentTimer =< 5 minutes {automatically read next string (warning)}

        this.arrayOfRouteSteps.push('insideTrainToNextPerron-Over 5 minuten komt uw trein aan, u komt aan op perron: ' + row.arrivalPlatform);

        //if currentLocation =< row.end_station_name {automatically read next strings (warning)}
        this.arrayOfRouteSteps.push('insideTrainToNextPerron-Welkom op station: ' + row.end_station_name + this.exitSideToString(row.exitSide) + ', druk op volgende als u bent uitgestapt en op het perron staat');

    }

    perronToPerron(row) {
        //change currentTimer to row1.timeOfDeparture
        this.arrayOfRouteSteps.push('perronToPerron-Loop naar de lift, ga naar boven zodat u naar het volgende perron kan komen, druk op volgende als u boven bent');

        this.arrayOfRouteSteps.push('perronToPerron-Loop richting de lift van perron ' + row.departurePlatform);

        this.arrayOfRouteSteps.push('perronToPerron-Ga met de lift naar het perron');

        this.arrayOfRouteSteps.push('perronToPerron-U bent aangekomen op het perron: ' + row.departurePlatform + ', druk op volgende als u in de trein zit.');

    }

    perronToExit(row) {
        this.arrayOfRouteSteps.push('perronToExit-U bent aangekomen op station: ' + row.end_station_name + ', het eindstation van uw reis.');

        //fromCurrentToLocation(station > arrivalPlatform > lift)
        this.arrayOfRouteSteps.push('perronToExit-Loop richting de lift van perron: ' + row.arrivalPlatform + ', druk op volgende als u boven bent');

        //fromCurrentToLocation(station > exit)
        this.arrayOfRouteSteps.push('perronToExit-Loop richting de uitgang van het station.');

    }

    exitSideToString(exitSide) {
        if(exitSide === 'L') {
            return 'stap uit aan de linkerzijde';
        } else if(exitSide === 'R') {
            return 'stap uit aan de rechterzijde';
        } else {
            return 'stap uit aan de perronzijde';
        }
    }

}
