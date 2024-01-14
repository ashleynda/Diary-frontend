let newEntry = document.querySelector('#create-entry-part');
newEntry.addEventListener('submit', () => {
    event.preventDefault();

    // clearpane();

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
    let title = document.getElementById('old-title').value;
    let newTitle = document.getElementById('new-title').value;
    let body = document.getElementById('new-body').value;

    let updateEntryRequest = {
        userName: userName,
        title: title,
        newTitle: newTitle,
        body: body
    };
    console.log(updateEntryRequest);

    const updateEntryUrl = 'http://localhost:8080/Journal/update-entry';
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
        // if(typeof responseObject.data !== 'string'){
            document.getElementById("update-entry-text").innerText = responseObject.data.message;
        // } else {
        //     let response = document.getElementById("update-entry-text");
        //     response.innerHTML = responseObject.data;
        //     response.style.color = 'red';
        // }
    })
    .catch(error => {
        console.error('Error:', error);
    })    
});

let findEntry = document.querySelector("#find-entry-part");
findEntry.addEventListener('submit', () => {
    event.preventDefault();
   
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
        const {title, body } = responseObject.data;

        const newParagraph = document.createElement('p');

        newParagraph.textContent = `${title}: ${body}`;
        const returnResponse = document.querySelector("#find-entry-text");
        returnResponse.appendChild(newParagraph);

        // const entryName = document.getElementById("entry-name");
        const dashboardTitleElement = document.getElementById("dashboard-title");
        const dashboardBodyElement = document.getElementById("dashboard-body");

        // entryName.textContent = `Username: ${userName}`;
        dashboardTitleElement.textContent = `Title: ${title}`;
        dashboardBodyElement.textContent = `Body: ${body}`;
        console.log(newParagraph)

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

// let deleteEntry = document.querySelector("#delete-entry-part");
// deleteEntry.addEventListener('submit', () => {
//     event.preventDefault();
//     // clearpane();


//     userName = localStorage.getItem('Username');
//     title = document.getElementById('delete-entry-diary').value;

//     let deleteEntryRequest = {
//         userName: userName,
//         title: title
//     };

//     const deleteEntryUrl = 'http://localhost:8080/Journal/delete-entry';

//     fetch(deleteEntryUrl, {
//         method: 'DELETE',
//         body: JSON.stringify(deleteEntryRequest),
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8'
//         },
//     })
//     console.log("i got here")
//     .then(response => response.json())
//     .then(responseObject => {
//         console.log(responseObject); 
//         document.getElementById("delete-entry-text").innerText = responseObject.data.message;       
//     })       
//     .catch(error => {
//         console.error('Error:', error)
//     })  
// });
// Wait for the DOM to load before querying elements
document.addEventListener('DOMContentLoaded', () => {
    let deleteEntry = document.querySelector("#delete-entry-part");

    if (deleteEntry) {
        deleteEntry.addEventListener('submit', async (event) => {
            event.preventDefault();

            try {
                let userName = localStorage.getItem('Username');
                let title = document.getElementById('delete-entry-diary').value;

                let deleteEntryRequest = {
                    userName: userName,
                    title: title
                };

                const deleteEntryUrl = 'http://localhost:8080/Journal/delete-entry';

                const response = await fetch(deleteEntryUrl, {
                    method: 'DELETE',
                    body: JSON.stringify(deleteEntryRequest),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Inside your fetch response handling
                const responseObject = await response.json();
                if (responseObject.data && responseObject.data.message === 'No value present') {
                    // Handle the case where no value is present or the entry doesn't exist
                    document.getElementById("delete-entry-text").innerText = "The entry doesn't exist or has already been deleted.";
                } else {
                    // Handle other responses or successful deletion
                    console.log(responseObject);
                    document.getElementById("delete-entry-text").innerText = "Entry deleted successfully.";
                }
            } catch (error) {
                console.error('Error:', error);
            }            
        });
    }
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


