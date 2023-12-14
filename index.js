
let form = document.getElementById("signup");
form.addEventListener('submit', () => {
    event.preventDefault();
    
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");

    let signupRequest = {
        userName: email.value,
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
            console.log(responseObject);
            document.getElementById("signup-response").innerHTML = "Sign up Successful"
        } else{
            console.log(responseObject);
            let response = document.getElementById("signup-response");
            response.innerHTML = responseObject.data;
            response.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
});

let already = document.getElementById("get_login");
already.addEventListener("click", () => {
    clearpane();
    document.getElementById('registered').style.display = 'flex';
})




//login part
let loginForm = document.getElementById("login_form");
loginForm.addEventListener('submit', () => {
    event.preventDefault();
    

    let signinEmail = document.querySelector('#email-login');
    let signinPassword = document.querySelector('#password-login');

    let signinRequest = {
        userName: signinEmail.value,
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
            console.log(responseObject);
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
    clearpane()
    document.getElementById('register').style.display = 'flex';
});

let signinForm = document.querySelector('#log');
signinForm.addEventListener('click', () => {
    clearpane()
    document.getElementById('registered').style.display = 'flex';
   
});


function clearpane() {
    document.getElementById('register').style.display='none';
    document.getElementById('registered').style.display='none';
}


