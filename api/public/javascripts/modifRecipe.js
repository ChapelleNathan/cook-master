export async function modifRecipe() {
    //imports
    //
    try {
        const createMarkup = (await import("./utils/_createMarkup.js")).default;

        //declare variables
        //

        //get units
        const constant = await (await fetch("/api/recipe")).json();
        console.log(constant);


        const form = createMarkup("form", "", document.body);
        const gastronomySelect = createMarkup("select", "Gastronomie:", form);
        const ingredientsList = createMarkup("ul", "Liste des Ingrédients", form);
        const ingredientUnitSelect = createMarkup("select", "Choisissez une unité", form);
        const addIngredientBtn = createMarkup("button", "+", form, {onclick: "addIngredient()"});
        const rmIngredientBtn = createMarkup("button", "-", form, {onclick: "removeIngredient()"});


        //declare functions
        //

        function addIngredient(ev) {
            ev.preventDefault();
            ingredientsNb++;
            const ingredientContainer = createMarkup("li", "", ingredientsList);

            const ingredientFs = createMarkup("fieldset", "", ingredientContainer);
            createMarkup("legend", `Ingrédient ${ingredientsNb}`, ingredientFs);

            const nameLabel = createMarkup("label", "nom :", ingredientFs);
            createMarkup("input", "", nameLabel, [
                { type: "text" },
                { name: `ingredient-${ingredientsNb}-name` },
                { id: `ingredient-${ingredientsNb}-name` },
                { required: "required" }
            ]);

            const quantityContainer = createMarkup("div", "", ingredientFs)
            const quantityLabel = createMarkup("label", "quantité :", quantityContainer)
            createMarkup("input", "", quantityLabel, [
                { type: "number" },
                { name: `ingredient-${ingredientsNb}-quantity` },
                { id: `ingredient-${ingredientsNb}-quantity` },
                { required: "required" },
                { min: "0"}
            ]);

            const unitSelect = createMarkup("select", "", quantityContainer, [
                { name: `ingredient-${ingredientsNb}-q-unit` },
                { id: `ingredient-${ingredientsNb}-q-unit` },
                { required: "required" }
            ]);
            createMarkup("option", "Choisissez une unité", unitSelect, [{ value: "" }]);

            addOptions(unitSelect, constant.units);

            rmIngredientBtn.removeAttribute("disabled")
        }

        function removeIngredient(ev) {
            ev.preventDefault()
            ingredientsNb--
            ingredientsList.removeChild(ingredientsList.lastChild)
            if (ingredientsNb < 2) {
                rmIngredientBtn.setAttribute("disabled", "true")
            }
        }

        /**
         * format the formData into a recipe object and send it to the server
         * @param {*} ev 
         */
        function submitRecipe(ev) {
            ev.preventDefault()
            const formData = new FormData(ev.target).entries()
            const category = formData.next().value[1]
            const recipe = {}
            recipe.title = formData.next().value[1]

            recipe.ingredients = []
            let iter = 0
            while (iter < ingredientsNb) {
                const ingredient = {}
                ingredient.name = formData.next().value[1];
                ingredient.quantity = formData.next().value[1];
                ingredient.unit = formData.next().value[1];
                recipe.ingredients.push(JSON.stringify(ingredient))
                iter++
            }
            fetch(`/recipes?gastronomy=${category}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(recipe)
            }).catch(err => console.log(err))

        }

        function addOptions(selectElement, optionData) {
            optionData.forEach(option => {
                createMarkup("option", option.alias, selectElement, [{ value: option.id }])
            })
        }

        //EventListener
        //
        form.addEventListener("submit", submitRecipe);
        addIngredientBtn.addEventListener("click", addIngredient);
        rmIngredientBtn.addEventListener("click", removeIngredient);

        //main

        rmIngredientBtn.setAttribute("disabled", "true")
        addOptions(ingredientUnitSelect, constant.units)
        addOptions(gastronomySelect, constant.gastronomy)
    } catch (error) {
        console.error(error)
    }

}
