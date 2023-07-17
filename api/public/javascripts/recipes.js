import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    const section = document.getElementById('recipes');
    let recipes = await((await fetch('/api/recipes')).json());
    recipes.forEach(recipe => {
        const article = createMarkup('article','', section)
        createMarkup('a',`${recipe.title}`, article, [{href: `/recipe?id=${recipe.id}`}, {class: 'fs-4'}]);
    })
}


export async function recipe(id) {
    const recipeInfo= createMarkup("section","",document.body);
    let recipe = await((await fetch(`/api/recipe?id=${id}`)).json());
    createMarkup("h3", recipe.title, recipeInfo);
    createMarkup("ul", "", recipeInfo);
    recipe.ingredients.forEach(function(ingredient){
        createMarkup("li", ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias, recipeInfo);
    });
}