export async function modifRecipe(id, renderRecipe) {
    //imports
    //
    try {
        const createMarkup = (await import("./utils/_createMarkup.js")).default;
        //declare variables
        //

        //get units
        const constant = await (await fetch("/constant")).json();
        const recipe = await ((await fetch(`/api/recipe?id=${id}`)).json());


        document.getElementById('recipeDetail').innerHTML="";
        const form = createMarkup("form", "", document.getElementById('recipeDetail'));
        createMarkup("label", "Gastronomie:", form);
        const gastronomySelect = createMarkup("select", "", form, [{name: "gastronomy"}]);
        createMarkup("label", "Nom:", form);
        const title = createMarkup("input", "", form, [{value: recipe.title}, {name: "name"}]);
        const ingredientsList = createMarkup("ul", "Liste des Ingrédients", form);
        const rmIngredientBtn = createMarkup("button", "-", form);
        const addIngredientBtn = createMarkup("button", "+", form);
        const cancelBtn = createMarkup("button", "Annuler", form);
        const submitBtn = createMarkup("button", "Envoyer", form, [{type:"submit"}]);
        let ingredientsNb = 0;


        //declare functions
        //

        function addIngredient() {
            ingredientsNb++;
            const ingredientContainer = createMarkup("li", "", ingredientsList);

            const ingredientFs = createMarkup("fieldset", "", ingredientContainer);
            createMarkup("legend", `Ingrédient ${ingredientsNb}`, ingredientFs);

            const nameLabel = createMarkup("label", "nom :", ingredientFs);
            const name = createMarkup("input", "", nameLabel, [
                { type: "text" },
                { name: `ingredient-${ingredientsNb}-name` },
                { id: `ingredient-${ingredientsNb}-name` },
                { required: "required" }
            ]);

            const quantityContainer = createMarkup("div", "", ingredientFs)
            const quantityLabel = createMarkup("label", "quantité :", quantityContainer)
            const quantity = createMarkup("input", "", quantityLabel, [
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
                rmIngredientBtn.setAttribute("disabled", "true");
            }
        }

        /**
         * format the formData into a recipe object and send it to the server
         * @param {*} ev 
         */
        function submitRecipe(ev) {
            ev.preventDefault()
            const formData = new FormData(ev.target).entries()
            const recipe = {}
            recipe.gastronomy = formData.next().value[1]
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
            fetch(`/recipes/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify(recipe)
            })
            .then(renderRecipe(id))
            .catch(err => {
                throw new Error(err);
            })

        }


        function addOptions(selectElement, optionData, defaultSelect) {
            optionData.forEach(option => {
                const optionElt=createMarkup("option", option.alias, selectElement, [{ value: option.id }])
                if(defaultSelect == option.name ){
                    optionElt.setAttribute("selected","selected")
                }
            })
        }

        function setDefault(){
            
            recipe.ingredients.forEach(ingredient => {
                ingredientsNb++;
                const ingredientContainer = createMarkup("li", "", ingredientsList);

                const ingredientFs = createMarkup("fieldset", "", ingredientContainer);
                createMarkup("legend", `Ingrédient ${ingredientsNb}`, ingredientFs);

                const nameLabel = createMarkup("label", "nom :", ingredientFs);
                const name = createMarkup("input", "", nameLabel, [
                    { type: "text" },
                    { name: `ingredient-${ingredientsNb}-name` },
                    { id: `ingredient-${ingredientsNb}-name` },
                    { value: ingredient.name },
                    { required: "required" }
                ]);

                const quantityContainer = createMarkup("div", "", ingredientFs)
                const quantityLabel = createMarkup("label", "quantité :", quantityContainer)
                const quantity = createMarkup("input", "", quantityLabel, [
                    { type: "number" },
                    { name: `ingredient-${ingredientsNb}-quantity` },
                    { id: `ingredient-${ingredientsNb}-quantity` },
                    { value: ingredient.quantity },
                    { required: "required" },
                    { min: "0"}
                ]);

                const unitSelect = createMarkup("select", "", quantityContainer, [
                    { name: `ingredient-${ingredientsNb}-q-unit` },
                    { id: `ingredient-${ingredientsNb}-q-unit` },
                    { required: "required" }
                ]);
                const unit = createMarkup("option", "Choisissez une unité", unitSelect, [{ value: "" }]);
                addOptions(unitSelect, constant.units,recipe.ingredients[ingredientsNb-1].unit);
                
            })
            if (ingredientsNb < 2) {
                rmIngredientBtn.setAttribute("disabled", "true");
            }
        }

        function resetForm(){
            renderRecipe(id);
        }

        //EventListener
        //
        form.addEventListener("submit", submitRecipe);
        addIngredientBtn.addEventListener("click", (ev) => {ev.preventDefault(); addIngredient()});
        rmIngredientBtn.addEventListener("click", removeIngredient);
        cancelBtn.addEventListener("click", resetForm);

        //main
        
        addOptions(gastronomySelect, constant.gastronomy,recipe.gastronomy)
        setDefault();
    } catch (error) {
        console.error(error)
    }

}
