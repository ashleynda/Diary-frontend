let newEntry = document.querySelector('#create-entry-part');
newEntry.addEventListener('submit', () => {
    event.preventDefault();

    clearpane();

    userName = localStorage.getItem('Username');
    title = document.getElementById('title-entry').value
    body = document.getElementById('body-entry').value

    let newEntryRequest = {
        userName: userName,
        title: title,
        body: body
    };
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
        console.log(responseObject);
        if(typeof responseObject.data !== 'string'){
            document.getElementById("create-entry-text").innerHTML = "Entry created successfully";
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

let updateEntry = document.querySelector("#update-entry-part");
updateEntry.addEventListener('submit', () => {
    event.preventDefault();

    let userName = localStorage.getItem('Username');
    let title = document.getElementById('update-title').value;
    let body = document.getElementById('update-body').value;

    let updateEntryRequest = {
        userName: userName,
        title: title,
        body: body
    };

    const updateEntryUrl = 'http://localhost:8080/Journal/updateEntry';
    fetch(updateEntryUrl, {
        method: 'PATCH',
        body: JSON.stringify(updateEntryRequest),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        console.log(responseObject)
        if(typeof responseObject.data !== 'string'){
            document.getElementById("update-entry-text").innerText = "responseObject.data.message";
        } else {
            let response = document.getElementById("update-entry-text");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })    
});

let findEntry = document.querySelector("#find-entry-part");
findEntry.addEventListener('submit', () => {
    event.preventDefault();
    clearpane();
   
    userName = localStorage.getItem('Username');
    title = document.getElementById('find-title-entry').value;

    let findEntryRequest = {
        title: title,
    };

    const findEntryUrl = `http://localhost:8080/Journal/findEntry/${userName}/${title}`;

    fetch(findEntryUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        console.log(responseObject)
        if(typeof responseObject.data !== 'string'){
            document.getElementById("find-entry-text").innerText = "Entry found successfully";
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
    clearpane();


    userName = localStorage.getItem('Username');
    title = document.getElementById('title-entry').value;

    let deleteEntryRequest = {
        userName: userName,
        title: title
    };

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
        console.log(responseObject);        
        if(typeof responseObject.data !== 'string'){
            document.getElementById("delete-entry-text").innerHTML = "Deleted successfully";
        } else {
            let response = document.getElementById("delete-entry-text");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        } 
    })       
    .catch(error => {
        console.error('Error:', error)
    })  
});

let newEntryForm = document.querySelector('#createNewEntry-button');
newEntryForm.addEventListener('click', () => {
    clearpane();
    document.getElementById('create-entry-part').style.display='flex';  
});

let updateEntryForm = document.querySelector('#updateEntry-button');
updateEntryForm.addEventListener('click', () => {
    clearpane(); 
    document.getElementById('update-entry-part').style.display='flex';
});

let findEntryForm = document.querySelector('#findEntry-button');
findEntryForm.addEventListener('click', () => {
    clearpane();
    document.getElementById('find-entry-part').style.display='flex';    
});

let deleteEntryForm = document.querySelector('#deleteEntry-button');
deleteEntryForm.addEventListener('click', () => {
    clearpane();
    document.getElementById('delete-entry-part').style.display='flex';
});


function clearpane() {
    document.getElementById('create-entry-part').style.display='none';
    document.getElementById('update-entry-part').style.display='none';
    document.getElementById('find-entry-part').style.display='none';
    document.getElementById('delete-entry-part').style.display='none';    
};

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


