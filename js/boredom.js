function windowLoaded(){
    let selectedElement = null;

    const allDragables = document.querySelectorAll('.draggable');

    for(let i=0; i<allDragables.length; i++){
        allDragables[i].addEventListener('mousedown', (e) => {
            console.log("button clicked");
            selectedElement = e.target;
        });
    }
    document.addEventListener('mousemove',(e) => {
        if (selectedElement){
            console.log(selectedElement);
            selectedElement.style.top=`${e.clientY}px`;
            selectedElement.style.left=`${e.clientX}px`;
        }
    });

    document.addEventListener('mouseup',(e) => {
        console.log('placed down');
        selectedElement = null;
    });
}

window.onload = windowLoaded;