(function () {
  document.querySelectorAll(".dropdown").forEach((dropdownElement) => {
    const dropdownInput = dropdownElement.querySelector("input");
    const dropdownButton = dropdownElement.querySelector("button");
    const dropdownItems = dropdownElement.querySelectorAll("li");

    dropdownElement.value = "";
    dropdownInput.placeholder = dropdownInput.getAttribute("data-placeholder");

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

    // Events

    dropdownButton.addEventListener("click", () => {
      dropdownElement.isOpen()
        ? dropdownElement.close()
        : dropdownElement.open();
    });

    dropdownInput.addEventListener("keyup", (e) => {
      dropdownElement.value = e.target.value;
      dropdownElement.refresh(e.target.value);
    });

    dropdownInput.addEventListener("focusin", (e) => {
      !dropdownElement.isOpen() && dropdownElement.open();
    });

    /*dropdownInput.addEventListener("focusout", (e) => {
      if (dropdownInput.value.length > 0) return;

      dropdownElement.getAttribute("open-by") === "field"
        ? dropdownElement.close()
        : "";
    });*/

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
  });
})();
