(function () {
  document.querySelectorAll(".dropdown").forEach((dropdownElement) => {
    dropdownElement.value = "";

    const dropdownInput = dropdownElement.querySelector("input");
    const dropdownButton = dropdownElement.querySelector("button");
    const dropdownItems = dropdownElement.querySelectorAll("li");

    dropdownInput.placeholder = dropdownInput.getAttribute("data-placeholder");

    dropdownElement.isOpen = function () {
      return dropdownElement.classList.contains("dropdown-open");
    };

    dropdownElement.open = function (from) {
      document.querySelectorAll(".dropdown").forEach((loopedDropdown) => {
        loopedDropdown.classList.remove("dropdown-open");
      });
      dropdownElement.classList.add("dropdown-open");
      dropdownElement.setAttribute("open-by", from);
    };

    dropdownElement.close = function () {
      dropdownElement.classList.remove("dropdown-open");
      dropdownElement.removeAttribute("open-by");
    };

    dropdownButton.addEventListener("click", () => {
      dropdownElement.isOpen() ? dropdownElement.close() : dropdownElement.open("button");
    });

    dropdownInput.addEventListener("keyup", (e) => {
      dropdownElement.value = e.target.value;
    });

    dropdownInput.addEventListener("focusin", (e) => {
      !dropdownElement.isOpen() && dropdownElement.open("field");
    });

    dropdownInput.addEventListener("focusout", (e) => {
      dropdownElement.getAttribute("open-by") === "field" ? dropdownElement.close() : '';
    })
  });
})();
