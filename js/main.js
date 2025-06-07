const emailInputLogin = document.getElementById("emailInputLogin");
const passwordInputLogin = document.getElementById("passwordInputLogin");

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
  return emailInputLogin.value.match(regexEmail);
}

emailInputLogin.addEventListener("input", validEmail);

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
  return passwordInputLogin.value.match(regexPassword);
}

passwordInputLogin.addEventListener("input", validPassword);

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
  document.querySelector("picture").classList.toggle("position-absolute");
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

function validUserNameSignUp(){
  if(userNameSignUp.value.trim() === "") {
    userNameSignUp.classList.remove("is-valid");
    userNameSignUp.classList.add("is-invalid");
    return false;
  } else {
    userNameSignUp.classList.remove("is-invalid");
    userNameSignUp.classList.add("is-valid");
    return true;
  }
}
userNameSignUp.addEventListener("input", validUserNameSignUp);


function validSignUpForm() {
  if( validEmailSignUp() && validPasswordSignUp() && validUserNameSignUp()) {
    let email = {
      userName: userNameSignUp.value,
      email: emailSignUp.value,
      password: passwordSignUp.value
    }
    if(!checkNewUser(email)) {
      alert("This email is already registered.");
      return;
    }
    emails.push(email);
    userNameSignUp.value = null;
    emailSignUp.value = null;
    passwordSignUp.value = null;
    localStorage.setItem("emails", JSON.stringify(emails));
    localStorage.setItem("currentUser", JSON.stringify(email));
    window.location.href = "Home.html";
  }
}

passwordSignUp.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    validSignUpForm();
  }
});


signUpBtn.addEventListener("click",validSignUpForm);

function validLogInForm() {
    let emailInput = emailInputLogin.value;
    let passwordInput = passwordInputLogin.value;

    for(let i = 0; i < emails.length; i++) {
      if(emails[i].email === emailInput && emails[i].password === passwordInput) {
        localStorage.setItem("currentUser", JSON.stringify(emails[i]));
        window.location.href = "Home.html";
        return;
      }
    }
    alert("Invalid email or password.");
}

logInBtn.addEventListener("click", validLogInForm);

passwordInputLogin.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    validLogInForm();
  }
});

function checkNewUser(newUser){
  for(let i = 0; i < emails.length; i++) {
    if(emails[i].email === newUser.email) {
      return false;
    }
  }
  return true;
}