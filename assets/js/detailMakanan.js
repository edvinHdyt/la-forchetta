const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sept", "Oct", "Nov", "Des"];
const params = new URLSearchParams(window.location.search);
const idMakanan = parseInt(params.get("id"));

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
    setNameCommentUser(userLogin);
    initializeContent();
    // set data comments to localstorage
    let isDataCommentAvailable = localStorage.getItem(commentKeyStorage) == null ? false : true;
    
    if(!isDataCommentAvailable){
        let res = await fetch("https://dummyjson.com/c/fd5d-2881-4a4c-bc72");
        let data = await res.json();
        localStorage.setItem(commentKeyStorage, JSON.stringify(data["comments"]));
    }

    const users = await fetch("https://dummyjson.com/c/8c8f-0b56-48f0-8ed4");
    let userData = await users.json();
    userData = userData["users"];

    const commentSection = document.getElementById("commentSection");

    let dataComments = localStorage.getItem(commentKeyStorage);
    dataComments = JSON.parse(dataComments);

    let newdataComments = dataComments.map(e => e).filter((data) => data["id_makanan"] == idMakanan);

    Array.from(newdataComments).forEach((val, i) => {
        let user = userData.filter((user) => {
            return user["id"] == val["id_user"];
        });

        user = user[0];

        // dataComments = val["comment"];
        let date = createDateFormat(val["created_at"]);
        let profile;

        if (user.profile_pict == ""){
            profile = 
            '<div class="profile-border profile-comment">' + 
                '<i class="bi bi-person-fill"></i>' +
            '</div>';
        } else {
            profile = 
            `<img src="${user.profile_pict}" class="comment-profile-img" alt="${user.nama}">`;
        }

        let elm =
        profile + 
        '<div class="detail-comment ms-3">'+
            '<div class="detail-comment-header d-flex">'+
                '<p class="username text-bold">'+user.nama+'</p>'+
                '<p class="ms-2"> - '+date+'</p>'+
            '</div>'+
            '<div class="detail-comment-body d-flex flex-column">'+
                '<p>Rating: <span>'+val["rating"]+'</span></p>'+
                '<p class="flex-wrap comment">'+val["komen"]+'</p>'+
            '</div>'+
        '</div>';

        let div = createCardComment(elm);
        commentSection.prepend(div);
    });

    calculationgRating(newdataComments);
}

const setNameCommentUser = (user) => {
    const elm = document.getElementById("nama");

    if (user == null){
        elm.value = "Guest";
    } else {
        elm.value = user.nama;
    }
}

const initializeContent = async () => {
    const foodImage = document.getElementById("foodImage");
    const provinsi = document.getElementById("provinsi");
    const category = document.getElementById("category");
    const foodName = document.getElementById("foodName");
    const foodNameResponsive = document.getElementById("foodNameResponsive");
    const foodDesc = document.getElementById("foodDesc");
    const resep = document.getElementById("resep");
    const stepByStep = document.getElementById("stepByStep");
    const containerDetailMakanan = document.getElementById("containerDetailMakanan");
    const detailMakanan404 = document.getElementById("containerDetailMakanan404");


    const makanan = await fetch("https://dummyjson.com/c/a9df-4a0d-4043-9ef8");
    let dataMakanan = await makanan.json();
    let newDataMakanan;

    Array.from(dataMakanan["makanan"]).forEach(elm => {
        if (elm["id_makanan"] == idMakanan){
            newDataMakanan = elm;
            return;
        }
    });

    if (newDataMakanan != undefined){
        containerDetailMakanan.classList.remove("d-none");
        detailMakanan404.classList.add("d-none");

        let res = await fetch("https://dummyjson.com/c/c6c4-7d86-4194-b36c");  
    
        let dataProvinsi = await res.json();
        
        dataProvinsi = dataProvinsi["provinsi"].filter((data) => {
            return data.id == newDataMakanan["id_provinsi"];
        });
    
        res = await fetch("https://dummyjson.com/c/53e3-a999-43a5-8a70");
        let dataCategory = await res.json();
    
        dataCategory = dataCategory["categories"].filter((data) => {
            return data.id == newDataMakanan["id_kategori"];
        });


    
        foodImage.src = `./assets/image/foodImage/${newDataMakanan["foto_makanan"]}`;
        provinsi.innerText = dataProvinsi[0].nama;
        category.innerText = dataCategory[0].category;
        foodName.innerText = newDataMakanan["nama_makanan"];
        foodNameResponsive.innerText = newDataMakanan["nama_makanan"];
        foodDesc.innerText = newDataMakanan["deskripsi_makanan"];
        
    
        let ul = document.createElement("ul");
    
        newDataMakanan["resep"].forEach(elm => {
            const li = document.createElement("li");
            const p = document.createElement("p");
    
            p.innerText = elm;
    
            li.append(p);
            ul.append(li);
        });
    
        resep.appendChild(ul);
    
    
        ul = document.createElement("ul");
        newDataMakanan["step_by_step"].forEach(elm => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            const p = document.createElement("p");
    
            p.innerText = elm;
    
            li.append(p);
            ul.append(li);
        });
    
        stepByStep.appendChild(ul);
    }else {
        containerDetailMakanan.classList.add("d-none");
        detailMakanan404.classList.remove("d-none");
    }

}

const calculationgRating = (comments) => {
    const progRating5 = document.getElementById("progressRating5");
    const progRating4 = document.getElementById("progressRating4");
    const progRating3 = document.getElementById("progressRating3");
    const progRating2 = document.getElementById("progressRating2");
    const progRating1 = document.getElementById("progressRating1");
    const ratingLabel = document.getElementById("ratingLabel");
    const ratingCategory = document.getElementById("ratingCategory");
    
    let totalRating5 = 0;
    let totalRating4 = 0;
    let totalRating3 = 0;
    let totalRating2 = 0;
    let totalRating1 = 0;
        
    let totalAllRating =  0;

    Array.from(comments).forEach(elm => {
        totalAllRating += elm["rating"];

        switch (elm["rating"]) {
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

    let dataRating = JSON.parse(localStorage.getItem(STORAGE_KEY_RATING));
    
    let rating = dataRating.filter((data) => {
        return data["id_makanan"] == idMakanan;
    });


    ratingAverage = ratingAverage.toLocaleString('en', {maximumSignificantDigits : 2});

    if (ratingAverage > 5){
        ratingAverage = 5.0;
    }

    rating[0]["total_rating"] = ratingAverage;

    let indexRatingMakanan = dataRating.map(e => e.id_makanan).indexOf(parseInt(idMakanan));
    dataRating[indexRatingMakanan] = rating[0];
    
    localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(dataRating));

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
    if(userLogin == null){
        let url = window.location.href;
        url = url.split("/");
        const currUrl = `${url[0]}//${url[2]}/`;
        window.location.href = currUrl + "login-page.html";

        return;
    }


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
    const objDate =  `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    let date = createDateFormat(d);

    if ((rating.value != "" && comment.value != "") && (rating.value >= 0 && rating.value <= 5)){
        let dataComments = JSON.parse(localStorage.getItem(commentKeyStorage));
        
        // pengisian data
        let obj = {
            id : dataComments.length,
            id_makanan: idMakanan, //ubah id makanan yg sesuai,
            id_user: 1, //ubah id user yg sesuai,
            rating: parseInt(rating.value),
            komen: comment.value,
            created_at: objDate
        }

        dataComments.push(obj);
        
        localStorage.setItem(commentKeyStorage, JSON.stringify(dataComments));

        let newdataComments = dataComments.map(e => e).filter((data) => data["id_makanan"] == idMakanan);

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

        calculationgRating(newdataComments);
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


initialize();
