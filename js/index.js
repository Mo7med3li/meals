async function getMeal() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  const data = await response.json();
  //   console.log(data.meals);
  displayMeals(data.meals);
}
getMeal();
$(".menu ul li ").on("click", function () {
  hideSideBar();
  $(".container-search").addClass("d-none");
});
function showSideBar() {
  $(".icons-menu").hide();
  $(".icon-close").show();
  $(".side-bar-container").show(500);
}
function hideSideBar() {
  $(".icon-close").hide();
  $(".icons-menu").show();
  $(".side-bar-container").hide(500);
}
$(".icons-menu").on("click", function () {
  showSideBar();
});

$(".icon-close").on("click", function () {
  hideSideBar();
});

function displayMeals(arr) {
  let box = "";
  for (i = 0; i < arr.length; i++) {
    box += ` <div class="col-md-3 details" onclick="details(${arr[i].idMeal})">
            <div class="inner position-relative overflow-hidden">
              <div class="meal-img">
                <img
                  src="${arr[i].strMealThumb}"
                  class="w-100 rounded rounded-2"
                  alt=""
                />
              </div>
              <div class="meal-layer  d-flex align-items-center">
                <h2 >${arr[i].strMeal}</h2>
              </div>
            </div>
          </div>`;
  }
  $(".meals").html(box);
}

async function details(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();
  console.log(data.meals[0]);
  displayDetails(data.meals);
}

function displayDetails(arr) {
  let box = `   <div class="col-md-4">
            <div class="meal-info">
              <img src="${arr[0].strMealThumb}" alt="" class="w-100" />
              <h2 class="text-white">${arr[0].strMeal}</h2>
            </div>
          </div>
          <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>
            ${arr[0].strInstructions}
       
            </p>
            <p class="h2">Area<span>${arr[0].strArea}</span></p>
            <p class="h2">Category<span>${arr[0].Category}</span></p>
            <div class="recipes">
              <h2>Recipes</h2>
              <div class="row g-2 gy-3">
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure1} ${arr[0].strIngredient1} </p>
                  </div>
                </div>
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure2} ${arr[0].strIngredient2}</p>
                  </div>
                </div>
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure3} ${arr[0].strIngredient3}</p>
                  </div>
                </div>
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure4} ${arr[0].strIngredient4}</p>
                  </div>
                </div>
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure5} ${arr[0].strIngredient5}</p>
                  </div>
                </div>
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure6} ${arr[0].strIngredient6}</p>
                  </div>
                </div>
                <div class="col-md-2 text-center">
                  <div class="meal-grid">
                    <p class="m-0 small text-dark py-2">${arr[0].strMeasure7} ${arr[0].strIngredient7}</p>
                  </div>
                </div>
              </div>
              <div class="tags">
                <h2>Tags:</h2>
                <div class="tags-btns">
                  <a href="${arr[0].strSource}" target="_blank" role="button" class="btn btn-success">Source</a>
                  <a href="${arr[0].strYoutube}" target="_blank" role="button" class="btn btn-danger">Youtube</a>
                </div>
              </div>
            </div>
          </div>`;

  $(".meals").html(box);
}

$(".search").on("click", function () {
  $(".meals").html("");
  $(".container-search").removeClass("d-none");
});

async function getMealBySearch(method, name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?${method}=${name}`
  );

  const data = await response.json();

  displayMeals(data.meals);
}

$(".search-name").on("input", function () {
  getMealBySearch("s", $(".search-name").val());
});

$(".search-letter").on("input", function () {
  getMealBySearch("f", $(".search-letter").val());
  if ($(".search-letter").val() == "") {
    getMealBySearch("f", "a");
  }
});

async function getCategory() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const data = await response.json();

  displayCategories(data.categories);
}

function displayCategories(arr) {
  let box = "";
  for (i = 0; i < arr.length; i++) {
    box += `  <div class="col-md-3 category-filter">
            <div class="inner position-relative overflow-hidden" onclick="getCategoryMeals(${arr[i].strCategory})">
              <div class="meal-img">
                <img
                  src="${arr[i].strCategoryThumb}"
                  class="w-100 rounded rounded-2"
                  alt=""
                />
              </div>
              <div
                class="meal-layer d-flex align-items-center flex-column text-center"
              >
                <h2>${arr[i].strCategory}</h2>
                <p>
                  ${arr[i].strCategoryDescription} </p>
              </div>
            </div>
          </div>`;
  }
  $(".meals").html(box);
}

$(".categories").on("click", function () {
  getCategory();
});

// function displayCategoryMeals() {
//   getCategoryMeals();
// }

async function getCategoryMeals(cat) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
  );

  const data = await response.json();
  console.log(data.meals);

  displayCategories(data.meals);
}
