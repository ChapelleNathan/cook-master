export async function createRecipe() {
    //imports
    //
    try {
        const createMarkup = (await import("./utils/_createMarkup.js")).default;

        //declare variables
        //

        //get units
        const constant = await (await fetch("/constant")).json()



        const form = document.getElementById("recipe-form");
        const gastronomySelect = document.getElementById("gastronomy")
        const ingredientsUl = document.getElementById("ingredients-ul");
        const ingredient1UnitSelect = document.getElementById("ingredient-1-q-unit");
        const addIngredientBtn = document.getElementById("ingredient-add");
        const rmIngredientBtn = document.getElementById("ingredient-rm");
        let ingredientsNb = 1;


        //declare functions
        //

        function addIngredient(ev) {
            ev.preventDefault();
            ingredientsNb++;
            const ingredientContainer = createMarkup("li", "", ingredientsUl);

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
                { required: "required" }
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
            ingredientsUl.removeChild(ingredientsUl.lastChild)
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
                console.log(ingredient);
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
        addOptions(ingredient1UnitSelect, constant.units)
        addOptions(gastronomySelect, constant.gastronomy)
    } catch (error) {
        console.error(error)
    }

}
