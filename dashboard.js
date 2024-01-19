let newEntry = document.querySelector('#create-entry-part');
newEntry.addEventListener('submit', () => {
    event.preventDefault();

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

    setTimeout(() => {
        clearpane();
    }, 1000);

    setTimeout(() => {
        newNewEntry();
    }, 2000);
 
});

function newNewEntry(){
    document.getElementById('create-entry-part').style.display='flex';
    document.getElementById('title-entry').value = '';
    document.getElementById('body-entry').value = '';
    document.getElementById("create-entry-text").innerHTML='';
}


let updateEntry = document.querySelector("#update-entry-part");
updateEntry.addEventListener('submit', () => {
    event.preventDefault();

    let userName = localStorage.getItem('Username');
    let title = document.getElementById('old-title').value;
    let newTitle = document.getElementById('new-title').value;
    let body = document.getElementById('new-body').value;

    const updateEntryRequest = {
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
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        console.log(responseObject);
        if(typeof responseObject.data !== 'string'){
            document.getElementById("update-entry-text").innerText = responseObject.data.message;
        } else {
            let response = document.getElementById("update-entry-text");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    setTimeout(() => {
        clearpane();
    }, 1000);

    setTimeout(() => {
        updateNewEntry();
    }, 2000);
 
});
function updateNewEntry(){
    document.getElementById('update-entry-part').style.display='flex';
    document.getElementById('old-title').value = '';
    document.getElementById('new-title').value = '';
    document.getElementById('new-body').value = '';
    document.getElementById('update-entry-text').innerText='';
}





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
        if(title){
            const newParagraph = document.createElement('p');
            newParagraph.textContent = `${title}: ${body}`;

            const returnResponse = document.querySelector("#find-entry-text");
            returnResponse.appendChild(newParagraph);
        
            const dashboardTitleElement = document.getElementById("dashboard-title");
            const dashboardBodyElement = document.getElementById("dashboard-body");

            
            dashboardTitleElement.textContent = `Title: ${title}`;
            dashboardBodyElement.textContent = `Body: ${body}`;
            console.log(newParagraph);

        }        

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
    setTimeout(() => {
        clearpane();
    }, 1000);
    setTimeout(() => {
        findNewEntry();
    }, 2000);
});
function findNewEntry(){
    document.getElementById('find-entry-part').style.display='flex';
    document.getElementById('find-title-entry').value = '';
    document.getElementById("find-entry-text").innerText='';     
    document.getElementById("dashboard-title").textContent='';
    document.getElementById("dashboard-body").textContent='';
  
   
   
}
  
    






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
            setTimeout(() => {
                clearpane();
            }, 1000);
        
            setTimeout(() => {
                deleteNewEntry();
            }, 2000);
         
        });
        function deleteNewEntry(){
            document.getElementById('delete-entry-part').style.display='flex';
            document.getElementById('delete-entry-diary').value = '';
            document.getElementById('delete-entry-text').innerText='';
            // document.getElementById("delete-entry-text").style.display='flex';
        }        
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









// .then(responseObject => {
//             data: [
//                 { title: 'Entry 1', body: 'Body 1' },
//                 { title: 'Entry 2', body: 'Body 2' },
//                 // ... more entries
//             ]
        

//         // Function to update the dashboard content
//         function updateDashboard(data) {
//             const dashboardElement = document.getElementById('dashboard');
            
//             // Clear existing content
//             dashboardElement.innerHTML = '';

//             // Iterate through the entries and create HTML elements
//             data.forEach(entry => {
//                 const entryParagraph = document.createElement('p');
//                 entryParagraph.textContent = `${entry.title}: ${entry.body}`;
//                 dashboardElement.appendChild(entryParagraph);
//             });
//         }

//         // Call the function with the data from responseObject
//         updateDashboard(responseObject.data);
//         // const entries = responseObject.data;

//         if (Array.isArray(entries)) {
//             entries.forEach(entry => {
//                 const { title, body } = entry;
//                 const newParagraph = document.createElement('p');
//                 newParagraph.textContent = `${title}: ${body}`;

//                 const returnResponse = document.querySelector("#find-entry-text");
//                 returnResponse.appendChild(newParagraph);
//                 console.log(newParagraph)
//             });
//         } else {
//             // Handle the case where responseObject.data is not an array
//             console.error('Invalid data format');
//         }

//         if (entries.length > 0) {
//             document.getElementById("find-entry-text").innerText = "Entries found successfully";
//         } else {
//             let response = document.getElementById("find-entry-text");
//             response.innerHTML = "No entries found";
//             response.style.color = 'red';
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


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