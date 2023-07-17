import { createRecipe } from "./createRecipe.js";
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
    "/recipe": '', //Add recipe file to view a single recipe. use query string to get the id of the recipe. //window.location.search = query string
    "/create-recipe": "../html/createRecipe.html"

};

const handleLocation = async () => {
    
    const path = window.location.pathname;
    console.log(path);
    const route = routes[path] || routes[404];
    console.log(route);
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;

    //Add case when you add an html file wich need js
    switch (path) {
        case '/recipes':
            recipes();
            break;
        case '/create-recipe':
            createRecipe();
            break;
        default:
            break;
    }
};

window.route = route;

handleLocation();