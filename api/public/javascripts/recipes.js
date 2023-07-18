import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    const section = document.getElementById('recipes');
    let recipesJSON = await ((await fetch('/api/recipes')).json());
    recipesJSON.forEach(country => {
        let recipes = country.recipes;
        recipes.forEach(recipe => {
            const article = createMarkup('article', '', section, [{class: 'd-flex justify-content-between mb-2'}])
            createMarkup('a', `${recipe.title}`, article, [{ href: `/recipe?id=${recipe.id}` }, { class: 'fs-4' }]);
            const suppLink = createMarkup('a','Supprimer', article, [{class: 'btn btn-danger btn-sm'}]);

            suppLink.addEventListener('click', (event) => {
                event.preventDefault();
            })
        })
    })
}


export async function recipe(id) {
    const recipeInfo = document.getElementById('recipeDetail');
    const recipe = await ((await fetch(`/api/recipe?id=${id}`)).json());
    const units = await ((await fetch('/api/units')).json());
    createMarkup("h3", recipe.title, recipeInfo);
    const list = createMarkup("ul", "", recipeInfo);
    recipe.ingredients.forEach(function (ingredient) {
        const unit = units.find(unit => unit.name == ingredient.unit);
        createMarkup('li', `${ingredient.quantity} ${unit.alias} de ${ingredient.name}`, list)
    });
}