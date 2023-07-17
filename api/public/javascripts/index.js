import { recipes } from "./recipes.js";

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "../html/404.html",
    "/recipes": "../html/recipes.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    switch (path) {
        case '/recipes':
            recipes();
            break;
    
        default:
            break;
    }
};

//window.onpopstate = handleLocation;
window.route = route;

handleLocation();