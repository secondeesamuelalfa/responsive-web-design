const button = document.getElementById("themeBtn");

button.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️ Enable Light Mode";
    } else {
        button.textContent = "🌙 Enable Dark Mode";
    }

});