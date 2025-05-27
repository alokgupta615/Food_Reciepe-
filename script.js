const SearchBox = document.querySelector('.SearchBox');
const SearchButton = document.querySelector('.SearchButton');
const recipe_container = document.querySelector('.recipe_container');
const recipeDetailContent = document.querySelector('.recipe-detail-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


//function to get recipe
const fetch_recipe=async (query) => {
    recipe_container.innerHTML ="<h2>fetching Recipes...</h2>";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipe_container.innerHTML ="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><sapan>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            
            `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding Event Listerner to recipe buttton
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })

        recipe_container.appendChild(recipeDiv);
    });
    }
     catch (error) {
        recipe_container.innerHTML =`<div class="error-msg"><h2 class="error-msg-text">Error in Fetching Recipes..</h2>
        <img src =https://tse1.mm.bing.net/th?id=OIP.yYBFzWZ0R970KK2bJhwO9AHaEi&pid=Api&P=0&h=180 alt="404 error"></div>`;
        
}
    // console.log(response.meals[0]);
   
}

//function to fetch ingredient and measurement
const fetchIngredients =(meal)=>{
    console.log(meal);
    let ingredientList ="";
    for( let i = 1; i<=20 ; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li> ${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;

}

const openRecipePopup = (meal)=>{
    recipeDetailContent.innerHTML =`
        <h2 class ="recipeName">${meal.strMeal}</h>
        <h3>Ingredients: </h3>
        <ul class ="ingrdientList">${fetchIngredients(meal)}</ul>
        <div class ="recipeInstruction">
            <h3>Instruction</h3>
            <p >${meal.strInstructions}</p>
        </div>
        `


    recipeDetailContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display 
    ="none";
});

SearchButton.addEventListener("click",(e) => {
    e.preventDefault();
    const SearchInput = SearchBox.value.trim();
    if(!SearchInput){
        recipe_container.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetch_recipe(SearchInput);
    // console.log("Cicked")
   
});