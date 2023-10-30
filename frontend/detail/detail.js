const routeFoundData = sessionStorage.getItem('routeFoundData');

window.addEventListener('load', function() {
    if (routeFoundData) {
        const routeFound = JSON.parse(routeFoundData);




















    } else {
        console.error("Please plan a route first");
    }
});


function setInnerHTMLText(newDiv, string, i) {
    newDiv.innerHTML = 'Stap ' + i + ' - ' + string;
    newDiv.style.fontSize = '26px';
    newDiv.style.textAlign = 'center';
}