import createMarkup from "./utils/_createMarkup.js";

export async function recipes() {
    const section = document.getElementById('recipes');
    let recipes = await((await fetch('/api/recipes')).json());
    recipes.forEach(recipe => {
        const article = createMarkup('article','', section)
        createMarkup('a',`${recipe.title}`, article, [{href: `/recipe?id=${recipe.id}`}, {class: 'fs-4'}]);
    });
}