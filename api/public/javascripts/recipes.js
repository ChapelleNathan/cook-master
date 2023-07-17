import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    const section = document.getElementById('recipes');
    let recipes = await((await fetch('/api/recipes')).json());
    recipes.forEach(recipe => {
        render(recipe, section);
    })
}


export function render(recette, parent) {
    const recipeBox= createMarkup("article","",parent);
    createMarkup("h3",recette.title,recipeBox,[{class: 'fs-4'}]);
    createMarkup("ul","",recipeBox);
    recette.ingredients.forEach(function(ingredient){
        createMarkup("li", ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias);
    });
}