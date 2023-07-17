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
    "/recipe": '../html/recipeDetail.html',
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
        case '/recipe':
            const param = new URLSearchParams(window.location.search);
            const id = parseInt(param.get("id"));
            recipe(id);
        case '/create-recipe':
            createRecipe();
            break;
        default:
            break;
    }
};

window.route = route;

handleLocation();