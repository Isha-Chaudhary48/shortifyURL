// for hamburger
const hamburger = document.getElementById("hamburgerIcon");
const navItems = document.getElementById("navItems");

// for generate

if (localStorage.getItem("lightMode") === "enabled") {
  document.body.classList.add("light-mode");
  document.getElementById("lightModeIcon").classList.add("fa-moon");
  document.getElementById("lightModeIcon").classList.remove("fa-sun");
}

document.getElementById("lightModeToggle").addEventListener("click", () => {
  const islightMode = document.body.classList.toggle("light-mode");

  if (islightMode) {
    localStorage.setItem("lightMode", "enabled");
    document.getElementById("lightModeIcon").classList.add("fa-moon");
    document.getElementById("lightModeIcon").classList.remove("fa-sun");
  } else {
    localStorage.setItem("lightMode", "disabled");
    document.getElementById("lightModeIcon").classList.add("fa-sun");
    document.getElementById("lightModeIcon").classList.remove("fa-moon");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navItems.classList.toggle("active");
});


