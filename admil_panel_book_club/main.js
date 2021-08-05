db.collection('pending').orderBy('time').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === 'added'){
            // showData(change.doc);
            console.log(change.doc.id);
        } else if(change.type === 'removed'){
            // let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
            // txtul.removeChild(li);
        }
    })
});