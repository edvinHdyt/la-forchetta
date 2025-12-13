const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sept", "Oct", "Nov", "Des"];

document.addEventListener("click", function(){
    let strId = event.target.dataset['id'];

    switch (strId) {
        case "addComment":
            addComment();
            break;
    
        default:
            break;
    }
});


const initial = async () => {
    let res = await fetch("https://dummyjson.com/c/0f83-ce76-49dd-8d68");
    let data = await res.json();

    Array.from(data).forEach((val, i) => {
       if (val["food_id"] == 1){
            let comments = val["comments"];

            // comments.forEach(comm => {
            //     let elm = 
            //     '<div class="profile-border profile-comment">' + 
            //         '<i class="bi bi-person-fill"></i>' +
            //     '</div>'+
            //     '<div class="detail-comment ms-3">'+
            //         '<div class="detail-comment-header d-flex">'+
            //             '<p class="username text-bold">'+comm["name"]+'</p>'+
            //             '<p class="ms-2"> - '+date+'</p>'+
            //         '</div>'+
            //         '<div class="detail-comment-body d-flex flex-column">'+
            //             '<p>Rating: <span>'+rating.value+'</span></p>'+
            //             '<p class="flex-wrap comment">'+comment.value+'</p>'+
            //         '</div>'+
            //     '</div>';
            // })
       }
    })
}


initial();

const createDateFormat = (dateNow) => {
    const d = new Date(dateNow);
    let day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
    let date =  day + " " + month[d.getMonth()] +" "+d.getFullYear(); 
 
    return date;
}

function addComment(){
    const commentSection = document.getElementById("commentSection");
    const div = document.createElement('div');
    let rating = document.getElementById("rating");
    let comment = document.getElementById("comment");
    let nama = document.getElementById("nama").value;
    let ratingFeedback = document.getElementById("ratingFeedback");
    ratingFeedback.innerText = "Rating harus diisi";


    if(rating.value == ""){
        rating.classList.add("is-invalid");
    }else {
        rating.classList.remove("is-invalid");
    }

    if(comment.value == ""){
        comment.classList.add("is-invalid");
    }else {
        comment.classList.remove("is-invalid");
    }

    const d = new Date();

    let date = createDateFormat(d.getDate());

    if ((rating.value != "" && comment.value != "") && (rating.value >= 0 && rating.value <= 5)){
        let elm = 
            '<div class="profile-border profile-comment">' + 
                '<i class="bi bi-person-fill"></i>' +
            '</div>'+
            '<div class="detail-comment ms-3">'+
                '<div class="detail-comment-header d-flex">'+
                    '<p class="username text-bold">'+nama+'</p>'+
                    '<p class="ms-2"> - '+date+'</p>'+
                '</div>'+
                '<div class="detail-comment-body d-flex flex-column">'+
                    '<p>Rating: <span>'+rating.value+'</span></p>'+
                    '<p class="flex-wrap comment">'+comment.value+'</p>'+
                '</div>'+
            '</div>';
    
        div.classList.add("card");
        div.classList.add("px-2");
        div.classList.add('py-3');
        div.classList.add("d-flex");
        div.classList.add("flex-row");
        div.classList.add("mb-3");
        div.innerHTML = elm;
    
        commentSection.prepend(div);

        rating.value = "";
        comment.value = "";
    }
}

const rating = document.getElementById("rating");
const ratingFeedback = document.getElementById("ratingFeedback");

rating.addEventListener("keyup", function(){
    if (rating.value > 5 || rating.value < 0){
        rating.classList.add("is-invalid");
        ratingFeedback.innerText = "Rating tidak valid";
    } else {
        rating.classList.remove("is-invalid");
    }
})

const commnet = document.getElementById("comment");
const countText = document.getElementById("countText");
const commentFeedback = document.getElementById("commentFeedback");
comment.addEventListener("keyup", function(){
    let txtLength = this.value.length;

        
    if(txtLength <= 255){
        countText.innerHTML = txtLength;
        if(this.classList.contains("is-invalid")){
            this.classList.remove('is-invalid');
        }

    }else {
        let txt = this.value;
        let newStr = txt.substring(0, 255);
        this.value = newStr;

        if(!this.classList.contains("is-invalid")){
            this.classList.add('is-invalid');
        }

        commentFeedback.innerText="Melebihi batas karater!";

    }

})