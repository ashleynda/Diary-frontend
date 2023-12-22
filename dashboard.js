let newEntry = document.querySelector('#create-entry-part');
newEntry.addEventListener('submit', () => {
    event.preventDefault();

    let userName = localStorage.getItem('Username');
    let title = document.getElementById('title-entry').value
    let body = document.getElementById('body-entry').value

    let newEntryRequest = {
        userId: userName,
        title: title,
        body: body
    };

    console.log(newEntryRequest);
    const newEntryUrl = 'http://localhost:8080/Journal/createNewEntry';

    fetch(newEntryUrl, {
        method: 'POST',
        body: JSON.stringify(newEntryRequest),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        if(typeof responseObject.data !== 'string'){
            document.getElementById("create-entry-text").innerHTML = "Entry created successfully";
            // document.getElementById("create-entry-text").innerHTML = responseObject.data.message;
            // window.location = './dashboard.html';
        } else {
            let response = document.getElementById("create-entry-text");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }        
    })
    .catch(error => {
        console.error('Error:', error)
    })
});

let findEntry = document.querySelector("#find-entry-part");
findEntry.addEventListener('submit', () => {
    event.preventDefault();
   
    // document.getElementById('find-entry-part').style.display='flex';
    // clearpane()
    username = localStorage.getItem('Username');
    title = document.getElementById('find-title-entry').value;

    let findEntryRequest = {
        usernameId: username,
        title: title,
    };

    console.log(findEntryRequest);
    const findEntryUrl = 'http://localhost:8080/Journal/findEntry/{userName}/{title}';

    fetch(findEntryUrl, {
        method: 'GET',
        // body: JSON.stringify(findEntryRequest),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        // document.getElementById("find-entry-text").innerText = responseObject.data.message;
        if(typeof responseObject.data !== 'string'){
            document.getElementById("find-entry-text").innerText = responseObject.data.message;
        } else {
            let response = document.getElementById("find-entry-text");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
});

let deleteEntry = document.querySelector("#delete-entry-part");
deleteEntry.addEventListener('submit', () => {
    event.preventDefault();

    deleteValue = document.getElementById('delete-entry-diary').value;

    let deleteEntryRequest = {
        delete: deleteValue
    };

    console.log(deleteEntryRequest);
    const deleteEntryUrl = 'http://localhost:8080/Journal/delete';

    fetch(deleteEntryUrl, {
        method: 'DELETE',
        body: JSON.stringify(deleteEntryRequest),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        document.getElementById("delete-entry-text").innerText = responseObject.data;          
    })
    .catch(error => {
        console.error('Error:', error)
    })  
});






let newEntryForm = document.querySelector('#createNewEntry-button');
newEntryForm.addEventListener('click', () => {
    clearpane();
    document.getElementById('create-entry-part').style.display='flex';
    // document.getElementById('create-entry-new').style.display='flex';
   
});

// let newEntryForm = document.querySelector('#createNewEntry-button');
// newEntry.addEventListener('click', () {
//  
//     document.getElementById('create-entry-new').style.display='flex';
// });

let findEntryForm = document.querySelector('#findEntry-button');
findEntryForm.addEventListener('click', () => {
    clearpane();
    document.getElementById('find-entry-part').style.display='flex';    
    // document.getElementById('find-entry').style.display='flex';
    
});

let deleteEntryForm = document.querySelector('#deleteEntry-button');
deleteEntryForm.addEventListener('click', () => {
    clearpane();
    document.getElementById('delete-entry-part').style.display='flex';
});


function clearpane() {
    document.getElementById('create-entry-part').style.display='none';
    document.getElementById('find-entry-part').style.display='none';
    document.getElementById('delete-entry-part').style.display='none';
    
}



let logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    username = localStorage.getItem('Username');
    
    let logoutRequest = {
        accountOwner: username
    };

    console.log(logoutRequest);
    const logoutUrl = 'http://localhost:8080/Journal/lock';

    fetch(logoutUrl, {
        method: 'PATCH',
        body: JSON.stringify(logoutRequest),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.text())
    .then(responseText => {
        window.location = "./index.html"
    })
    .catch(error => {
        console.error('Error:', error)
    })
});


