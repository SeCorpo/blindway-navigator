const Build = require("../../ov_engine/build");

class plannerController {
    constructor() {
        this.fromStation = '';
        this.time = '';
        this.toStation = '';
        this.fromTo = '';
        this.transferTime = '';

        this.form = document.getElementById('form');
        this.inFromStation = document.getElementById('from');
        this.inTime = document.getElementById('time');
        this.inToStation = document.getElementById('to');
        this.inFromTo = document.getElementById('fromto');
        this.inTransferTime = document.getElementById('transfertime');
        this.inputs = document.querySelector('.input');
        this.times = document.querySelector('.time');
        this.outputtext = document.querySelector('.outputtext');

        this.inTime.addEventListener('input', (e) => this.handleTimeInput(e));
        this.inTransferTime.addEventListener('input', (e) => this.handleTransferTimeInput(e));
        this.inFromStation.addEventListener('change', (e) => this.handleFromStationChange(e));
        this.inToStation.addEventListener('change', (e) => this.handleToStationChange(e));
        this.inFromTo.addEventListener('change', (e) => this.handleFromToChange(e));
        this.form.addEventListener('change', (e) => this.handleSubmit(e));
    }

    handleTimeInput(e) {
        this.time = e.target.value;
        this.updateRoute();
    }

    handleTransferTimeInput(e) {
        this.transferTime = e.target.value;
        this.updateRoute();
    }

    handleFromStationChange(e) {
        this.fromStation = e.target.value;
        this.updateRoute();
    }

    handleToStationChange(e) {
        this.toStation = e.target.value;
        this.updateRoute();
    }

    handleFromToChange(e) {
        this.fromTo = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.updateRoute();
    }

    updateRoute() {
        const buildInstance = new Build(
            this.fromStation,
            this.toStation,
            this.time,
            this.transferTime
        );
        this.outputtext.innerHTML = buildInstance.routeString;

    }
}


document.addEventListener('DOMContentLoaded', () => {
    const controller = new plannerController();
});
