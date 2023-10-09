async function service(selectedFromLocation, selectedToLocation, time, transferTime) {
    try {
        const response = await axios.get('http://localhost:3001/plan', {
            params: {
                from: selectedFromLocation,
                to: selectedToLocation,
                time: time,
                transferTime: transferTime
            }
        });

        const routeFound = response.data.routeFound;

        if (routeFound) {
            sessionStorage.setItem('routeFoundData', JSON.stringify(routeFound));

        }


    } catch (error) {
        console.error("API Request Error:", error);
        alert("API Request Error: " + error.message);
    }
}

