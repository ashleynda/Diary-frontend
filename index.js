
let form = document.getElementById("signup");
form.addEventListener('submit', () => {
    event.preventDefault();
    clearpane();
    document.getElementById('register').style.display = 'none';

    
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let username = document.getElementById('#user-username');

    // localStorage.setItem("Username", username.value);

    let signupRequest = {
        username: email.value,
        password: password.value
    };

    console.log(signupRequest);
    const url = 'http://localhost:8080/Journal/register';

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(signupRequest),
        headers: {
            'Content-Type': 'application/json; charset:UTF-8',
        },
    })
    .then(response => response.json())
    .then(responseObject => {
        if(typeof responseObject.data !== 'string'){
            document.getElementById("signup-response").innerHTML = "Sign up Successful"
        } else{
            let response = document.getElementById("signup-response");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
});

let already = document.getElementsByClassName("already1");



//login part
let form1 = document.getElementById("login");
form1.addEventListener('submit', () => {
    event.preventDefault();
    
    clearpane();
    document.getElementById('registered').style.display = 'none';

    let signinEmail = document.querySelector('#email-login');
    let signinPassword = document.querySelector('#password-login');

    let signinRequest = {
        email: signinEmail.value,
        password: signinPassword.value
    };

    console.log(signinRequest);
    const loginUrl = 'http://localhost:8080/Journal/unlock';

    fetch(loginUrl, {
        method: 'PATCH',
        body: JSON.stringify(signinRequest),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(responseObject => {

        if(typeof responseObject.data !== 'string'){
            document.getElementById("login-response").innerHTML = "Sign in Successful";
            localStorage.setItem('Username', signinEmail.value);
            window.location = './dashboard.html';
        } else{
            let response = document.getElementById("login-response");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
});

let signupForm = document.querySelector('#sign');
signupForm.addEventListener('click', () => {
    document.getElementById('register').style.display = 'flex';
});

let signinForm = document.querySelector('#log');
signinForm.addEventListener('click', () => {
    document.getElementById('registered').style.display = 'flex';
   
});


function clearpane() {
    document.getElementById('register').style.display='none';
    document.getElementById('registered').style.display='none';
}


