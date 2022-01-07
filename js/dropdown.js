let _registredDropdowns = [];
class Dropdown {
  constructor(querySelector, callback) {
    const dropdownDomElement = document.querySelector(querySelector);
    const dropdownDomList = dropdownDomElement.querySelector("ul");
    const dropdownDomInput = dropdownDomElement.querySelector("input");
    const dropdownButton = dropdownDomElement.querySelector("button");
    const dropdownItems = [];
    const dropdownExpandable = false;
    const dropdownType = dropdownDomElement.getAttribute("data-type");

    this.domElement = dropdownDomElement;
    this.domList = dropdownDomList;
    this.domInput = dropdownDomInput;
    this.domButton = dropdownButton;
    this.items = dropdownItems;
    this.expandable = dropdownExpandable;
    this.type = dropdownType;
    this.value = "";
    this.callback = callback;

    _registredDropdowns.push(this);

    this.registerDefault();
  }

  registerDefault() {
    this.domInput.placeholder = this.domInput.getAttribute("data-placeholder");
    this.domInput.disabled = !this.expandable;
    this.domInput.value = this.value;

    this.domInput.addEventListener("keyup", (e) => {
      this.value = e.target.value;
      this.filterDomItems();
    });

    this.domInput.addEventListener("focusin", (e) => {
      this.expandable && !this.isOpen() && this.open();
    });

    this.domButton.addEventListener("click", (e) => {
      const openCond = this.expandable && !this.isOpen();
      const closeCond = this.isOpen();

      if (openCond) this.open();
      if (closeCond) this.close();
    });

    this.render();
  }

  closeAllDropdowns() {
    _registredDropdowns.forEach((loopedDropdown) => {
      loopedDropdown.close();
    });
  }

  domItemTemplate(content) {
    const tempHolder = document.createElement("div");

    tempHolder.innerHTML = `<li data-name="${content}">
    <a href="#!" class="dropdown-link">${content}</a>
  </li>`;

    tempHolder.firstChild.addEventListener("click", (e) => {
      this.callback(content, this.type);
      this.close();
    });

    return tempHolder.firstChild;
  }

  open() {
    this.closeAllDropdowns();

    this.domElement.classList.add("dropdown-open");
    this.domInput.placeholder = this.domInput.getAttribute(
      "data-placeholder-focus"
    );
  }

  close() {
    this.domElement.classList.remove("dropdown-open");
    this.domInput.placeholder = this.domInput.getAttribute("data-placeholder");
    this.domInput.value = "";
    this.value = "";
    this.filterDomItems();
  }

  render() {
    this.domList.innerHTML = "";

    this.items.forEach((item) => {
      this.domList.appendChild(this.domItemTemplate(item));
    });
  }

  filterDomItems() {
    const searchQuery = this.value.toLowerCase();
    this.domList.childNodes.forEach((domItem) => {
      domItem.getAttribute("data-name").includes(searchQuery)
        ? (domItem.style.display = "block")
        : (domItem.style.display = "none");
    });
  }

  isOpen() {
    return this.domElement.classList.contains("dropdown-open");
  }

  filterItems() {
    this.items.sort(function (a, b) {
      return a === b ? 0 : a > b ? 1 : -1;
    });
  }

  addItem(name) {
    this.items.push(name);
    this.filterItems();

    this.render();
  }

  removeItem(name) {
    this.items = this.items.filter(function (item) {
      return item !== name;
    });
    this.filterItems();

    this.render();
  }

  setItems(items) {
    this.items = items;
    this.filterItems();

    this.render();
  }

  clearItems() {
    this.items = [];

    this.render();
  }

  setCallback(callback) {
    this.callback = callback;
  }

  setExpendable(val) {
    this.expandable = val;
    this.domInput.disabled = !this.expandable;
  }
}
