document.addEventListener('click', function(){
    let strId = event.target.dataset["id"];
    
    switch (strId) {
        case "showDropdownMenu":
            showDropdownMenu();
            break;
    
        default:
            break;
    }
});


function showDropdownMenu(){
    let elm = document.getElementById('containerNavbarDropdown');
    

    if (elm.classList.contains("show")){
        elm.classList.remove('d-none');
        // elm.classList.add('d-block');
    } else {
        // elm.classList.remove('d-block');
        elm.classList.add('show');
    }
}