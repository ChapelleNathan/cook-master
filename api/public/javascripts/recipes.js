import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    const section = document.getElementById('recipes');
    let recipes = await((await fetch('/api/recipes')).json());
    recipes.forEach(recipe => {
        render(recipe);
    })
}


export function render(recette) {
    const recipeBox= createMarkup("article","",section);
    createMarkup("h3",recette.title,recipeBox,[{class: 'fs-4'}]);
    console.log(recette.title,recipeBox);
    createMarkup("ul","",recipeBox);
    recette.ingredients.forEach(function(ingredient){
        createMarkup("li", ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias);
        console.log(ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias);
    });
}