// Login Inputs.
var userEmailInput = document.querySelector("#userEmail");
var userPassInput = document.querySelector("#userPass");
var loginBtn = document.querySelector(".loginbtn");
// Sign up Inputs.
var newNameInpute = document.querySelector('#newName');
var newEmailInpute = document.querySelector('#newEmail');
var newPassInpute = document.querySelector('#newPass');
var signUpBtn = document.querySelector(".signupBtn");
// Login Messages
var errorLoginMessage = document.getElementById('errorMessage');
var successLoginMessage = document.getElementById('successMessage');
var requiredLoginMessage = document.querySelector("#requiredError");
// SignUp Messages
var existMessage = document.querySelector("#esistError");
var requiredsignupMessage = document.querySelector("#requeredSignupError");
var errorSignupMessage = document.getElementById('errorMessageSignup')
var successSignupMessage = document.getElementById('successSignupMessage');
// Logout Button
var logoutBtn = document.querySelector(".logoutBtn");
var arrIndex;
var dataList = [];

if(localStorage.getItem('user data') !== null){
    dataList = JSON.parse(localStorage.getItem('user data'));
}



function getData(){
    if(
        validateUserData('name' , newNameInpute.value)&&
        validateUserData('email' , newEmailInpute.value)&&
        validateUserData('password' , newPassInpute.value)
       
    ){
        hideAllSignUpMessages();
        successSignupMessage.classList.remove('d-none');
        var data = {
            name : newNameInpute.value,
            email : newEmailInpute.value,
            password : newPassInpute.value
        }
        
        dataList.push(data);
        localStorage.setItem('user data' , JSON.stringify(dataList));  
    }else{
       hideAllSignUpMessages();
       errorSignupMessage.classList.remove('d-none');
    }
}
 


function checkLogin(){
    if (!userEmailInput.value || !userPassInput.value) {
        hideAllLoginMessages();
        requiredLoginMessage.classList.remove("d-none"); // Show required message
        return;
    }
    // Validate email and password format.
    if (
        validateUserData("email", userEmailInput.value) &&
        validateUserData("password", userPassInput.value)
    )
    {
        if(checkStorage(userEmailInput.value, userPassInput.value)){
            if(arrIndex !== undefined){
                hideAllLoginMessages();
                successLoginMessage.classList.remove("d-none"); // Show success message
                console.log("Login successful! Redirect to main page...");
                localStorage.setItem("userName", dataList[arrIndex].name);
                window.open("file:///D:/Full%20Stack/Frontend/Session%2015/Assignment%2011/main.html" , '_self');     
            }else{
                console.error("arrIndex is undefined despite successful login.");
            }
        }else{
            hideAllLoginMessages();
            errorLoginMessage.classList.remove("d-none"); // Show invalid credentials message
       }
    } else {
        hideAllLoginMessages();
        errorLoginMessage.classList.remove("d-none"); // Show invalid credentials message
    }
}



function checkAccount(email){

   for(var i = 0 ; i < dataList.length ; i++){

        if( email == dataList[i].email){ 
            return true // Emial Exist.        
        }
   }

   return false; // Email Not Exist.
}


function display(){
    var loggedUserName = localStorage.getItem('userName');
  
    document.getElementById('welcomeBox').innerHTML = `<h1>Welcome ${loggedUserName}</h1>`;

}

document.addEventListener("DOMContentLoaded", display);




if (signUpBtn) {
    signUpBtn.addEventListener('click' , function(){
        if (!newNameInpute.value || !newEmailInpute.value || !newPassInpute.value) {
            requiredsignupMessage.classList.remove("d-none"); 
        }else{
    
            if(checkAccount(newEmailInpute.value) == false){
                getData();
                console.log("sign up");
            }else{
                hideAllSignUpMessages();
                existMessage.classList.remove('d-none');
            }
        }
        
    })
} else {
    console.log("Sign Up button not found");
}

// Add event listener for Login button
if (loginBtn) {
    loginBtn.addEventListener('click' , function(){
      checkLogin();
    });
} else {
    console.log("Login button not found");
}
if (logoutBtn) {
    logoutBtn.addEventListener('click' , function(){
        window.open("file:///D:/Full%20Stack/Frontend/Session%2015/Assignment%2011/index.html" , '_self');
    })
} else {
    console.log("Logout button not found");
}


function checkStorage(email , pass){

    var isValid = false;

   for(var i = 0 ; i < dataList.length ; i++){
        if(email == dataList[i].email && pass == dataList[i].password){
            console.log("OK");   
            isValid = true;
            arrIndex = i;
            break;
            // Go To Main Page
        }

   }
  
   return isValid;
}

function validateUserData(type , value){

    var regex = {
        name : /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    }
    if(regex[type].test(value)){
        console.log("match");
        return true;
    }else{
        console.log("Not Match");
        return false;
    }
    
}


function hideAllSignUpMessages() {

    existMessage.classList.add("d-none");
    requiredsignupMessage.classList.add("d-none");
    errorSignupMessage.classList.add("d-none");
    successSignupMessage.classList.add("d-none");
    
}
function hideAllLoginMessages() {

    errorLoginMessage.classList.add("d-none");
    successLoginMessage.classList.add("d-none");
    requiredLoginMessage.classList.add("d-none");
    
}