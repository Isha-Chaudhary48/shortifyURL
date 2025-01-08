document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerIcon");
  const navItems = document.getElementById("navItems");
  const copyButton = document.getElementById("copyButton");
  const short = document.getElementById("short");
  const lightModeToggle = document.getElementById("lightModeToggle");
  const lightModeIcon = document.getElementById("lightModeIcon");

  // for copy content
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      const copyText = short;
      if (copyText) {
        navigator.clipboard
          .writeText(copyText.textContent)
          .then(() => {
            alert("copied to clipboard", +copyText.textContent);
          })
          .catch((err) => {
            console.error("Failed to copy", err);
          });
      }
    });
  }

  // for theme

  if (localStorage.getItem("lightMode") === "enabled") {
    document.body.classList.add("light-mode");
    lightModeIcon.classList.add("fa-moon");
    lightModeIcon.classList.remove("fa-sun");
  }

  lightModeToggle.addEventListener("click", () => {
    const islightMode = document.body.classList.toggle("light-mode");

    if (islightMode) {
      localStorage.setItem("lightMode", "enabled");
      lightModeIcon.classList.add("fa-moon");
      lightModeIcon.classList.remove("fa-sun");
    } else {
      localStorage.setItem("lightMode", "disabled");
      lightModeIcon.classList.add("fa-sun");
      lightModeIcon.classList.remove("fa-moon");
    }
  });

  // for hamburger

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navItems.classList.toggle("active");
  });
});
