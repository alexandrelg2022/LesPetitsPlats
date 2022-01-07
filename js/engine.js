// Vars

const tagsList = document.querySelector("#tags");
const searchBar = document.querySelector("#searchbar");
const recipesList = document.querySelector("#recipes");

const ingredientsDropdown = new Dropdown(".dropdown[data-type='ingredient']");
const devicesDropdown = new Dropdown(".dropdown[data-type='device']");
const utensilsDropdown = new Dropdown(".dropdown[data-type='utensil']");

let tags = [];
let mainquery = "";
let availableRecipes = [];

// Methods

function recipeTemplate(recipe) {
  const el = document.createElement("section");
  el.className = "recipes-item";

  let ingredients = "";
  recipe.ingredients.forEach((ing) => {
    ingredients += `<li><strong>${ing.ingredient}:</strong> ${
      ing.unit ? `${ing.quantity} ${ing.unit}` : ing.quantity
    }</li>`;
  });

  el.innerHTML = `<img
  src="/assets/recipes/_empty.png"
  alt="${recipe.name}"
  class="recipes-item-banner"
/>
<div class="recipes-item-top">
  <p class="recipes-item-title">${recipe.name}</p>
  <p class="recipes-item-time">
    <span>
      <i class="far fa-clock"></i>
    </span>
    ${recipe.time} min
  </p>
</div>
<div class="recipes-item-bottom">
  <ul class="recipes-item-ingredients">
    ${ingredients}
  </ul>
  <p class="recipes-item-explanation">
    ${recipe.description.substring(0, 160)}...
  </p>
</div>`;

  return el;
}

function renderRecipes(recipesToRender) {
  recipesList.innerHTML = "";
  recipesToRender.forEach((recipe) => {
    recipesList.appendChild(recipeTemplate(recipe));
  });
}

function tagTemplate(name, type) {
  const el = document.createElement("li");
  el.className = "search-tags-item";
  el.setAttribute("data-type", type);
  el.setAttribute("data-name", name);

  el.innerHTML = `<span class="tag tag-${type}">
    ${name}
    <button class="tag-delete">
      <i class="far fa-times-circle"></i>
    </button>
  </span>`;

  el.querySelector("button").addEventListener("click", (e) => {
    removeTag(name, type);
  });

  return el;
}

function renderTags() {
  tagsList.innerHTML = "";

  tags.forEach((tag) => {
    const newTagElement = tagTemplate(tag.name, tag.type);

    tagsList.appendChild(newTagElement);
  });
}

function addTag(name, type) {
  const tagItem = {
    name: name,
    type: type,
  };

  const existsTagItem = tags.filter(function (elem) {
    const parsedTag = `${elem.name}_${elem.type}`;
    const parsedParams = `${name}_${type}`;
    return parsedTag === parsedParams;
  });

  if (existsTagItem.length > 0) return;

  tags.push(tagItem);

  switch (type) {
    case "ingredient":
      ingredientsDropdown.removeItem(name);
      break;
    case "device":
      devicesDropdown.removeItem(name);
      break;
    case "utensil":
      utensilsDropdown.removeItem(name);
      break;
    default:
      break;
  }

  renderTags();
  performAlgo();
}

function removeTag(name, type) {
  tags = tags.filter(function (elem) {
    const parsedTag = `${elem.name}_${elem.type}`;
    const parsedParams = `${name}_${type}`;
    return parsedTag !== parsedParams;
  });

  switch (type) {
    case "ingredient":
      ingredientsDropdown.addItem(name);
      break;
    case "device":
      devicesDropdown.addItem(name);
      break;
    case "utensil":
      utensilsDropdown.addItem(name);
      break;
    default:
      break;
  }

  renderTags();
  performAlgo();
}

function setQuery(query) {
  mainquery = query;
  performAlgo();
}

// Events

searchBar.addEventListener("keyup", (e) => {
  setQuery(e.target.value);
});

ingredientsDropdown.setCallback(function (name, type) {
  addTag(name, type);
});

devicesDropdown.setCallback(function (name, type) {
  addTag(name, type);
});

utensilsDropdown.setCallback(function (name, type) {
  addTag(name, type);
});

// Algo

function performAlgo() {
  availableRecipes = getRecipes();

  renderRecipes(availableRecipes);
}

// Init

(function () {
  performAlgo();
})();
