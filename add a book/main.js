const form = document.getElementById("form");
const imgFile = document.getElementById("bookImage");
const prevImg = document.getElementById("prevImg");
const imgplchldr = document.getElementById("prevImgPlaceholder");

prevImg.style.display = "none";

imgFile.addEventListener("change", function () {
    var file = this.files[0];

    if (file != undefined) {
        var reader = new FileReader();

        reader.onload = function () {
            prevImg.setAttribute("src", reader.result);
            prevImg.style.display = "block";
            imgplchldr.style.display = "none";
        }
        reader.readAsDataURL(file);

    } else {
        prevImg.style.display = "none";
        imgplchldr.style.display = "block";
        prevImg.setAttribute("src", "");

        this.files[0] = null
    }
});

// firebase codes

// db.collection('users').orderBy('creditAt').onSnapshot(snapshot =>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         if(change.type === 'added'){
//             showData(change.doc);
//         } else if(change.type === 'removed'){
//             let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
//             txtul.removeChild(li);
//         }
//     })
// });

const username = $("#username");
const bookname = $("#bookname");
const phnumber = $("#number");
const bookimg = document.getElementById("bookImage");
const condition = $("#condition");
const writter = $("#writernam");
const idlink = $("#idlink");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    var file = bookimg.files[0];
    var filename = file.name;
    let bookimgdownlink;

    storage.child(filename).put(file)
        .then(ss => ss.ref.getDownloadURL())
        .then(url => {
            bookimgdownlink = url;
            db.collection("pending").add({
                username: username.val(),
                bookname: bookname.val(),
                phnumber: phnumber.val(),
                bookimglink: bookimgdownlink,
                condition: condition.val(),
                writter: writter.val(),
                idlink: idlink.val()
            })

            console.log(bookimgdownlink);
            $("input").val("");
            alert("Sent");
        })

})