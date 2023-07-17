import createMarkup from "./utils/_createMarkup.js";

export function recipes() {
    fetch("../../db/db.json")
      .then(function(response) {
        if (response.status !== 200) { // si ça c'est mal passé
        throw new Error("Le serveur n'a pas répondu correctement");
        } else {
            return response.json(); // renvoie une promesse
        }
      })
      .then(function(data) {
        const recipes = data;
        console.log(recipes);
        recipes.forEach(function(recipe){
            render(recipe);
        });
      })
}



export function render(recette) {
    const recipeList = createMarkup("section","",document.body); //temporaire
    const recipeBox= createMarkup("section","",recipeList);
    createMarkup("h3",recette.title,recipeBox);
    console.log(recette.title,recipeBox);
    createMarkup("ul","",recipeBox);
    recette.ingredients.forEach(function(ingredient){
        createMarkup("li", ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias);
        console.log(ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias);
    });
}