const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sept", "Oct", "Nov", "Des"];
let dataComments;


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


let initialize = async () => {
    let res = await fetch("https://dummyjson.com/c/a9a4-9ad5-4288-9f36");
    let data = await res.json();
    const commentSection = document.getElementById("commentSection");
    
    Array.from(data).forEach((val, i) => {
        if (val["food_id"] == 1){
            dataComments = val["comment"];
            calculationgRating(dataComments);
            dataComments.forEach(comm => {
                let date = createDateFormat(comm["created_at"]);
                let profile;

                if (comm["profil_pict"] == ""){
                    profile = 
                    '<div class="profile-border profile-comment">' + 
                        '<i class="bi bi-person-fill"></i>' +
                    '</div>';
                } else {
                    profile = 
                    '<img src="'+comm["profil_pict"]+'" class="comment-profile-img">'
                }

                let elm =
                profile + 
                '<div class="detail-comment ms-3">'+
                    '<div class="detail-comment-header d-flex">'+
                        '<p class="username text-bold">'+comm["name"]+'</p>'+
                        '<p class="ms-2"> - '+date+'</p>'+
                    '</div>'+
                    '<div class="detail-comment-body d-flex flex-column">'+
                        '<p>Rating: <span>'+comm["rating"]+'</span></p>'+
                        '<p class="flex-wrap comment">'+comm["comment"]+'</p>'+
                    '</div>'+
                '</div>';

                let div = createCardComment(elm);
                commentSection.prepend(div);
            })
       }
    });
}


initialize();

const calculationgRating = (comments, parseRating) => {
    let progRating5 = document.getElementById("progressRating5");
    let progRating4 = document.getElementById("progressRating4");
    let progRating3 = document.getElementById("progressRating3");
    let progRating2 = document.getElementById("progressRating2");
    let progRating1 = document.getElementById("progressRating1");
    let ratingLabel = document.getElementById("ratingLabel");
    let ratingCategory = document.getElementById("ratingCategory");
    
    let totalRating5 = parseRating == 5 ? 1 : 0;
    let totalRating4 = parseRating == 4 ? 1 : 0;
    let totalRating3 = parseRating == 3 ? 1 : 0;
    let totalRating2 = parseRating == 2 ? 1 : 0;
    let totalRating1 = parseRating == 1 ? 1 : 0;
    
    let totalAllRating = parseRating != undefined ? parseRating : 0;
    Array.from(comments).forEach(val => {
        totalAllRating += val["rating"];

        switch (val["rating"]) {
            case 5:
                 totalRating5 += 1;
                
                break;
            case 4:
                 totalRating4 += 1;
                
                break;
            case 3:
                 totalRating3 += 1;
                
                break;
            case 2:
                 totalRating2 += 1;
                
                break;
            case 1:
                 totalRating1 += 1;
                
                break;
        }
    });
    
    let ratingAverage = parseFloat(totalAllRating / comments.length);

    if (ratingAverage > 5){
        ratingAverage = 5.0;
    }

    totalRating5 = (totalRating5 / comments.length) * 100;
    totalRating4 = (totalRating4 / comments.length) * 100;
    totalRating3 = (totalRating3 / comments.length) * 100;
    totalRating2 = (totalRating2 / comments.length) * 100;
    totalRating1 = (totalRating1 / comments.length) * 100;
    
    totalRating5 = totalRating5 > 100 ? 100 : totalRating5;
    totalRating4 = totalRating4 > 100 ? 100 : totalRating4;
    totalRating3 = totalRating3 > 100 ? 100 : totalRating3;
    totalRating2 = totalRating2 > 100 ? 100 : totalRating2;
    totalRating1 = totalRating1 > 100 ? 100 : totalRating1;

    progRating5.style.width = totalRating5 + "%";
    progRating4.style.width = totalRating4 + "%";
    progRating3.style.width = totalRating3 + "%";
    progRating2.style.width = totalRating2 + "%";
    progRating1.style.width = totalRating1 + "%";

    ratingLabel.innerText = ratingAverage;
    ratingCategory.innerText = ratingAverage;

}
 
const createDateFormat = (dateNow) => {
    const d = new Date(dateNow);
    let day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
    let date =  day + " " + month[d.getMonth()] +" "+d.getFullYear(); 
 
    return date;
}

const createCardComment = (elm) => {
    const div = document.createElement('div');
    div.classList.add("card");
    div.classList.add("px-2");
    div.classList.add('py-3');
    div.classList.add("d-flex");
    div.classList.add("flex-row");
    div.classList.add("mb-3");
    div.innerHTML = elm;

    return div;
}

function addComment(){
    const commentSection = document.getElementById("commentSection");
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

    let date = createDateFormat(d);

    if ((rating.value != "" && comment.value != "") && (rating.value >= 0 && rating.value <= 5)){
        calculationgRating(dataComments, parseInt(rating.value));
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
    
        let div = createCardComment(elm);
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