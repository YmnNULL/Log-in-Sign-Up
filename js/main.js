const email = document.getElementById("emailInputLogin");
const password = document.getElementById("passwordInputLogin");

const userNameSignUp = document.getElementById("userNameInput");
const emailSignUp = document.getElementById("emailInputSignUp");
const passwordSignUp = document.getElementById("passwordInputSignUp");

const regexEmail = /^(\w)+@(\w){1,}\.\w+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const logInBtn = document.getElementById("logInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signUpLink = document.getElementById("signUpLink");

let emails = [];
if(localStorage.getItem("emails") === null) {
  localStorage.setItem("emails", JSON.stringify(emails));
}else{
  emails = JSON.parse(localStorage.getItem("emails"));
}

function validEmail(){
    if (email.value.match(regexEmail)) {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        return true;
    } else {
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
        return false;
    }
}

function displayAlertEmail(flag){
  if(flag){
    email.nextElementSibling.classList.add("d-none");
  } else {
    email.nextElementSibling.classList.remove("d-none");
  }
}

email.addEventListener("input", validEmail);
email.addEventListener("blur", function(){
  displayAlertEmail(validEmail());
});


function validEmailSignUp(){
    if (emailSignUp.value.match(regexEmail)) {
        emailSignUp.classList.remove("is-invalid");
        emailSignUp.classList.add("is-valid");
        return true;
    } else {
        emailSignUp.classList.remove("is-valid");
        emailSignUp.classList.add("is-invalid");
        return false;
    }
}

function displayAlertEmailSignUp(flag){
  if(flag){
    emailSignUp.nextElementSibling.classList.add("d-none");
  } else {
    emailSignUp.nextElementSibling.classList.remove("d-none");
  }
}

emailSignUp.addEventListener("input", validEmailSignUp);
emailSignUp.addEventListener("blur", function(){
  displayAlertEmailSignUp(validEmailSignUp());
});



function validPassword(){
    if (password.value.match(regexPassword)) {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
        return true;
    } else {
        password.classList.remove("is-valid");
        password.classList.add("is-invalid");
        return false;
    }
}

function displayAlertPassword(flag){
  if(flag){
    password.nextElementSibling.classList.add("d-none");
  } else {
    password.nextElementSibling.classList.remove("d-none");
  }
}

password.addEventListener("input", validPassword);
password.addEventListener("blur", function(){
  displayAlertPassword(validPassword());
});


function validPasswordSignUp(){
    if (passwordSignUp.value.match(regexPassword)) {
        passwordSignUp.classList.remove("is-invalid");
        passwordSignUp.classList.add("is-valid");
        return true;
    } else {
        passwordSignUp.classList.remove("is-valid");
        passwordSignUp.classList.add("is-invalid");
        return false;
    }
}

function displayAlertPasswordSignUp(flag){
  if(flag){
    passwordSignUp.nextElementSibling.classList.add("d-none");
  } else {
    passwordSignUp.nextElementSibling.classList.remove("d-none");
  }
}

passwordSignUp.addEventListener("input", validPasswordSignUp);
passwordSignUp.addEventListener("blur", function(){
  displayAlertPasswordSignUp(validPasswordSignUp());
});


signUpLink.addEventListener("click", function(event){
  event.preventDefault();
  document.querySelector("picture").classList.toggle("slider");
  document.querySelector(".logIn").classList.toggle("opacity-0");

  setTimeout(function() {
    document.querySelector(".logIn").classList.toggle("d-none");
  }, 600);


  document.querySelector(".signUp").classList.toggle("opacity-0");

  setTimeout(function() {
    document.querySelector(".signUp").classList.toggle("d-none");
  }, 600);

});


function validSignUpForm() {
  if( validEmailSignUp() && validPasswordSignUp() ) {
    let email = {
      userName: userNameSignUp.value,
      email: emailSignUp.value,
      password: passwordSignUp.value
    }
    emails.push(email);
    localStorage.setItem("emails", JSON.stringify(emails));
    window.location.href = "Home.html";
  }
}

signUpBtn.addEventListener("click",validSignUpForm);

function validLogInForm() {
  if( validEmail() && validPassword() ) {
    let emailInput = email.value;
    let passwordInput = password.value;

    for(let i = 0; i < emails.length; i++) {
      if(emails[i].email === emailInput && emails[i].password === passwordInput) {
        window.location.href = "Home.html";
      }
    }
  }else{
    alert("Invalid email or password.");
  }
}

logInBtn.addEventListener("click", validLogInForm);