import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    const section = document.getElementById('recipes');
    let recipesJSON = await((await fetch('/api/recipes')).json());
    recipesJSON.forEach(country => {
        let recipes = country.recipes;
        recipes.forEach(recipe => {
            const article = createMarkup('article','', section)
            createMarkup('a',`${recipe.title}`, article, [{href: `/recipe?id=${recipe.id}`}, {class: 'fs-4'}]);
        })
    })
}


export async function recipe(id) {
    const recipeInfo= createMarkup("section","",document.body);
    let recipe = await((await fetch(`/api/recipe?id=${id}`)).json());
    console.log(recipe);
    createMarkup("h3", recipe.title, recipeInfo);
    createMarkup("ul", "", recipeInfo);
    recipe.ingredients.forEach(function(ingredient){
        createMarkup("li", ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias, recipeInfo);
    });
}