const settingsButton = document.querySelector("#settings-button"),
    settingsDropdown = document.querySelector("#settings-dropdown");

function handleClickSettings(event) {
    settingsDropdown.classList.toggle("hidden");
}

function loadSettings() {
    settingsButton.addEventListener("click",handleClickSettings);
}


function init() {
    loadSettings()
}
init();