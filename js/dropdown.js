(function () {
  document.querySelectorAll(".dropdown").forEach((dropdownElement) => {
    const dropdownInput = dropdownElement.querySelector("input");
    const dropdownButton = dropdownElement.querySelector("button");
    const dropdownList = dropdownElement.querySelector("ul");
    const dropdownIcon = dropdownElement.querySelector("i");

    dropdownElement.value = "";
    dropdownInput.placeholder = dropdownInput.getAttribute("data-placeholder");

    const dropdownItems = dropdownElement.querySelectorAll("li");

    // Methods

    dropdownElement.isOpen = function () {
      return dropdownElement.classList.contains("dropdown-open");
    };

    dropdownElement.open = function () {
      document.querySelectorAll(".dropdown").forEach((loopedDropdown) => {
        loopedDropdown.classList.remove("dropdown-open");
      });
      dropdownElement.classList.add("dropdown-open");
    };

    dropdownElement.close = function () {
      dropdownElement.classList.remove("dropdown-open");
      dropdownInput.value = "";
    };

    dropdownElement.refresh = function (value) {
      const query = value.toLowerCase().replaceAll(" ", "_");
      dropdownItems.forEach((itemElement) => {
        const name = itemElement
          .getAttribute("data-name")
          .toLowerCase()
          .replaceAll(" ", "_");
        const display = name.includes(query);

        itemElement.style.display = display ? "block" : "none";
      });
    };

    dropdownElement.update = function () {
      dropdownList.innerHTML = "";
      const tempHolder = document.createElement("div");
      switch (dropdownElement.getAttribute("data-type")) {
        case "ingredient":
          getIngredients().forEach((ingredient) => {
            tempHolder.innerHTML = `<li data-name="${ingredient}">
            <a href="#!" class="dropdown-link">${ingredient}</a>
          </li>`;
            dropdownList.append(tempHolder.firstChild);
          });
          break;
        case "device":
          getDevices().forEach((device) => {
            tempHolder.innerHTML = `<li data-name="${device}">
            <a href="#!" class="dropdown-link">${device}</a>
          </li>`;
            dropdownList.append(tempHolder.firstChild);
          });
          break;
        case "utensil":
          getUtensils().forEach((utensil) => {
            tempHolder.innerHTML = `<li data-name="${utensil}">
            <a href="#!" class="dropdown-link">${utensil}</a>
          </li>`;
            dropdownList.append(tempHolder.firstChild);
          });
          break;
        default:
          return;
          break;
      }
    };

    // Events

    dropdownInput.addEventListener("keyup", (e) => {
      dropdownElement.value = e.target.value;
      dropdownElement.refresh(e.target.value);
    });

    dropdownInput.addEventListener("focusin", (e) => {
      !dropdownElement.isOpen() && dropdownElement.open();
    });

    dropdownElement.addEventListener("mouseout", (e) => {
      const mouseOutElement = e.target;

      let cancel = false;
      dropdownElement.querySelectorAll("*").forEach((loopedElement) => {
        if (loopedElement === mouseOutElement) {
          cancel = true;
        }
      });

      console.log(cancel);

      if (cancel) return;

      dropdownElement.close();
    });

    dropdownItems.forEach((itemElement) => {
      itemElement.addEventListener("click", (e) => {
        // Ajouter le tag en question
        addTag(
          itemElement.getAttribute("data-name"),
          dropdownElement.getAttribute("data-type")
        );
        dropdownInput.value = "";
        dropdownElement.close();
        console.log("oui");
      });
    });

    // Default exec

    dropdownElement.update();
  });
})();
