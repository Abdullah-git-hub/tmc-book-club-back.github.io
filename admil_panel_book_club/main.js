const box_con = document.getElementById("boxcon");

db.collection('pending').orderBy('time').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added') {
            showData(change.doc);
            // console.log(change.doc.id);
        } else if (change.type === 'removed') {
            // let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
            // txtul.removeChild(li);
            removeData(change.doc);
        }
    })
});

function showData(doc) {
    let id_num = doc.id;

    let user_name = doc.data().username;
    let book_name = doc.data().bookname;
    let ph_num = doc.data().phnumber;
    let bookimg_link = doc.data().bookimglink;
    let book_ref = doc.data().bookref;
    let condition = doc.data().condition;
    let writter_name = doc.data().writter;
    let id_link = doc.data().idlink;

    // console.log(user_name);
    // console.log(book_name);
    // console.log(ph_num);
    // console.log(bookimg_link);
    // console.log(condition);
    // console.log(writter_name);
    // console.log(id_link);

    let infoBox = document.createElement("div");
    infoBox.classList.add("reqBooksBox");

    infoBox.setAttribute("data-ap", id_num);

    infoBox.innerHTML = `
    <div class="bookImg">
                    <img src="${bookimg_link}" alt="">
                </div>
                <div class="detailsTxt">
                    <fieldset>
                        <legend>Book Details</legend>
                        <table>
                            <tr>
                                <td>Book Name:</td>
                                <td class="bookName">${book_name}</td>
                            </tr>
                            <tr>
                                <td>Writer Name:</td>
                                <td class="writerName">${writter_name}</td>
                            </tr>
                            <tr>
                                <td>Book Condition:</td>
                                <td><span class="bookCondition">${condition}</span>&nbsp;years old</td>
                            </tr>
                        </table>
                    </fieldset>

                    <fieldset>
                        <legend>User Details</legend>
                        <table>
                            <tr>
                                <td>User Name:</td>
                                <td class="userName">${user_name}</td>
                            </tr>
                            <tr>
                                <td>Contact number:</td>
                                <td><a href="tel:${ph_num}" class="userContactNum">${ph_num}</a></td>
                            </tr>
                            <tr>
                                <td>Social Media link:</td>
                                <td><a href="${id_link}" class="userSocialLink" target="_blank">Link</a></td>
                            </tr>
                        </table>
                    </fieldset>
                </div>
    `
    // <div class="btns">
    //     <button class="acceptBtn" onclick="accept(${id_num})" data-kl="${id_num}">Accept</button>
    //     <button class="rejectBtn" onclick="remove(${id_num})" data-kl="${id_num}">Reject</button>
    // </div>

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("btns");

    let acceptBtn = document.createElement("button");
    let rejectBtn = document.createElement("button");

    acceptBtn.classList.add("acceptBtn");
    rejectBtn.classList.add("rejectBtn");

    acceptBtn.textContent = "Accept";
    rejectBtn.textContent = "Reject";

    acceptBtn.setAttribute("data-kl", id_num);
    rejectBtn.setAttribute("data-kl", id_num);

    // acceptBtn.setAttribute("data-pp", book_ref);
    rejectBtn.setAttribute("data-pp", book_ref);

    // acceptBtn.addEventListener("click", (id_num)=> console.log(id_num));
    // rejectBtn.addEventListener("click", (id_num)=> console.log(id_num));
    acceptBtn.addEventListener("click", (e) => {
        let docid = e.target.getAttribute("data-kl");
        accept(docid);
    });
    rejectBtn.addEventListener("click", (e) => {
        let docid = e.target.getAttribute("data-kl");
        let bookref = e.target.getAttribute("data-pp");
        // let bookref = book_ref;
        reject(docid, bookref);
    });

    btnDiv.append(acceptBtn);
    btnDiv.append(rejectBtn);

    infoBox.append(btnDiv);
    box_con.append(infoBox);
}

function removeData(docid){
    let removed = box_con.querySelector(`[data-ap="${docid.id}"]`);
    box_con.removeChild(removed);
}

function accept(docid) {
    db.collection("pending").doc(docid).get().then(snap => {
        console.log(snap.data());
    })
}

function reject(docid, bookref) {
    console.log(bookref);
    storage.child(bookref).delete().then(()=>{
        db.collection("pending").doc(docid).delete();
        alert("Deleted")
    })

    // db.collection("pending").doc(docid).delete();
    // alert("Deleted");
    
}