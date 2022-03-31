function loadMenu(){
    document.getElementById("navBar").classList.toggle("hidden");
    console.log("Menu Clicked")
}

document.getElementById("menuButton").addEventListener('click', loadMenu);

