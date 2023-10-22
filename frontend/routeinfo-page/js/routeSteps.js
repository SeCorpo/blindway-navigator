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
            this.insideTrainToLiftUp(routeFound[0]);
        }

        for (let i = 1; i < routeFound.length; i++) {
            this.liftUpToNextTrain(routeFound[i]);
            this.insideTrainToLiftUp(routeFound[i]);
        }

        if(routeFound[routeFound.length -1]) {
            this.liftUpToExit(routeFound[routeFound.length -1])
        }

        return this.arrayOfRouteSteps;

    }

    welcomeMessage() {
        this.arrayOfRouteSteps.push('Welkom in Blindway-navigator, wij begeleiden u vandaag met uw reis van: ' + this.beginStation
            + ' naar: ' + this.endStation);
    }
    frontToTrain(row) {
        this.arrayOfRouteSteps.push('Uw eerste trein vertrekt om: ' + row.timeOfDeparture + ' vanaf perron: ' + row.departurePlatform);
        //currentTimer to timeOfDeparture

        this.arrayOfRouteSteps.push('Loop richting de lift naar perron: ' + row.departurePlatform);
        //direction from station entrance to first lift location for first platform

        this.arrayOfRouteSteps.push('Neem de lift naar het perron, druk op volgende als u aangekomen bent');

        this.arrayOfRouteSteps.push('U ben aangekomen op het perron, stap in de trein richting: ' + row.end_station_name + ', de trein vertrekt om: ' + row.timeOfDeparture);
        //if currentTimer =< 3 minutes && not already in train {automatically read next string (warning)}

        this.arrayOfRouteSteps.push('Neem plaats in de trein, druk op volgende als u in de trein zit');

    }

    insideTrainToLiftUp(row) {
        //change currentTimer to timeOfArrival
        this.arrayOfRouteSteps.push('U zit in de trein richting: ' + row.end_station_name + ', de trein komt aan om: ' + row.timeOfArrival);
        //if currentTimer =< 5 minutes {automatically read next string (warning)}

        this.arrayOfRouteSteps.push('Over 5 minuten komt uw trein aan, u komt aan op perron: ' + row.arrivalPlatform);

        //if currentLocation =< row.end_station_name {automatically read next strings (warning)}
        this.arrayOfRouteSteps.push('Als uw trein is aangekomen in: ' + row.end_station_name + this.exitSideToString(row.exitSide) + ', druk op volgende als u bent uitgestapt en op het perron staat');

        this.arrayOfRouteSteps.push('Loop naar de lift, neem de lift naar boven, druk op volgende als u boven bent');

    }
    liftUpToNextTrain(row) {
        this.arrayOfRouteSteps.push('Loop richting de lift naar perron ' + row.departurePlatform);

        this.arrayOfRouteSteps.push('Ga met de lift naar het perron');

        this.arrayOfRouteSteps.push('U bent aangekomen op perron: ' + row.departurePlatform);

        this.arrayOfRouteSteps.push('Stap in de trein richting ' + row.end_station_name + ', de trein vertrekt om: ' + row.timeOfDeparture);

        this.arrayOfRouteSteps.push('Neem plaats in de trein, druk op volgende als u in de trein zit');

    }
    liftUpToExit(row) {
        this.arrayOfRouteSteps.push('Loop richting de uitgang van het station')

        this.arrayOfRouteSteps.push('U bent aangekomen op station ' + row.end_station_name + ', bedankt voor het gebruiken van Blindway-Navigator')
    }


    exitSideToString(exitSide) {
        if(exitSide === 'L') {
            return ', stap uit aan de linkerzijde';
        } else if(exitSide === 'R') {
            return ', stap uit aan de rechterzijde';
        } else {
            return ', stap uit aan de perronzijde';
        }
    }

}
