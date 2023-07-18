import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    // variable
    const section = document.getElementById('recipes');
    const gastronomySelect = document.getElementById('filter-gastronomy');
    const ingredientSelect = document.getElementById('filter-ingredient');
    let recipesJSON = await ((await fetch('/api/recipes')).json());
    const urlSearchParams = new URLSearchParams(location.search)

    //function
    async function fillGastronomySelect() {
        const gastronomy = Object.values((await ((await fetch('/constant')).json())).gastronomy);
        gastronomy.forEach(option => {
            createMarkup("option", option.alias, gastronomySelect, [{ value: option.name }])
        })
    }

    async function fillIngredientsSelect() {
        const ingredients = (await ((await fetch('/ingredients')).json())).ingredients
        ingredients.forEach(option => {
            createMarkup("option", option, ingredientSelect, [{ value: option }])
        })
    }

    async function filterGastronomy(ev) {
        if (ev.target.value == "") {
            urlSearchParams.delete("gastronomy")
        } else {
            urlSearchParams.set("gastronomy", ev.target.value)
        }
        recipesJSON = await ((await fetch(`/api/recipes?${urlSearchParams.toString()}`)).json());
        renderRecipe();
    }

    async function filterIngredient(ev) {
        if (ev.target.value == "") {
            urlSearchParams.delete("ingredient")
        } else {
            urlSearchParams.set("ingredient", ev.target.value)
        }
        recipesJSON = await ((await fetch(`/api/recipes?${urlSearchParams.toString()}`)).json());
        renderRecipe();

    }

    function renderRecipe() {
        while (section.hasChildNodes()) {
            section.removeChild(section.lastChild)
        }
        recipesJSON.forEach(country => {
            let recipes = country.recipes;
            recipes.forEach(recipe => {
                const article = createMarkup('article', '', section)
                createMarkup('a', `${recipe.title}`, article, [{ href: `/recipe?id=${recipe.id}` }, { class: 'fs-4' }]);
            })
        })
    }


    // main
    urlSearchParams.delete("gastronomy");
    urlSearchParams.delete("ingredient");
    fillGastronomySelect();
    gastronomySelect.addEventListener("change", filterGastronomy);

    fillIngredientsSelect();
    ingredientSelect.addEventListener("change", filterIngredient)

    renderRecipe()

}


export async function recipe(id) {
    const recipeInfo = createMarkup("section", "", document.body);
    let recipe = await ((await fetch(`/api/recipe?id=${id}`)).json());
    console.log(recipe);
    createMarkup("h3", recipe.title, recipeInfo);
    createMarkup("ul", "", recipeInfo);
    recipe.ingredients.forEach(function (ingredient) {
        createMarkup("li", ingredient.quantity + " " + ingredient.name + " " + ingredient.unit.alias, recipeInfo);
    });
}