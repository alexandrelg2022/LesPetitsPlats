// Vars

const tagsList = document.querySelector("#tags");
const searchBar = document.querySelector("#searchbar");

let tags = [];
let mainquery = "";

// Methods

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

  if(existsTagItem.length > 0) return;

  tags.push(tagItem);

  renderTags();
}

function removeTag(name, type) {
  tags = tags.filter(function (elem) {
    const parsedTag = `${elem.name}_${elem.type}`;
    const parsedParams = `${name}_${type}`;
    return parsedTag !== parsedParams;
  });

  renderTags();
}

function setQuery(query) {
  mainquery = query;
}

// Events

searchBar.addEventListener("keyup", (e) => {
  setQuery(e.target.value);
});
