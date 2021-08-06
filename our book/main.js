let btn = document.querySelector('.btn');
let form = document.querySelector('.form');

btn.addEventListener("click",()=>{
    form.classList.add('block');
});



const img = $("#bookImage");
const disImg = $("#upload-img");

img.on("change", function () {
    imgFile = this.files[0];
    // previewImgCon.style.display = "block";
    // previewBack.style.display = "block";

    if (imgFile != undefined) {
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            // previewImg.setAttribute("src", this.result);
            disImg.attr("src", this.result);
            console.log(this.result)
        });

        reader.readAsDataURL(imgFile);

    } else if (imgFile == undefined) {
        photoInpt.files[0] = null;
        disImg.attr("src", "");
    }
});