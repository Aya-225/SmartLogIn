var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')


var signUpArray = [];
if ( localStorage.getItem("users") != null ){
    signUpArray = JSON.parse(localStorage.getItem ("users"));
}

function signUp(){
    if(signupName.value ==="" || signupEmail.value ==="" || signupPassword.value ==="" ){
        document.getElementById("incorrect").innerHTML = '<span class="text-danger">All inputs are required</span>';
        return;
    }
    var emailInput = document.getElementById("signupEmail");
   var regex = /^[a-zA-Z0-9]{3,20}@[a-zA-Z]+\.[a-z]{2,}$/;
   if(!regex.test(emailInput.value)){
     document.getElementById("incorrect").innerHTML = '<span class="text-danger">Please enter a valid email</span>';
     return;
   }
    var passInput = document.getElementById("signupPassword");
   var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\\|-]).{8,}$/;
   if(!regex.test(passInput.value)){
     document.getElementById("incorrect").innerHTML = '<span class="text-danger">Password must be at least 8 characters and include at least 1 capital letter, 1 number, and 1 special character.</span>';
     return;
   }

  for( var i=0 ; i < signUpArray.length ; i++ ){
  if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()){
        document.getElementById("incorrect").innerHTML = '<span class="text-danger">Email already exists</span>';
        return;
    }
  }
  var user = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value

  };

  signUpArray.push(user);
  localStorage.setItem("users" , JSON.stringify(signUpArray));
  document.getElementById("incorrect").innerHTML = '<span class="text-success">Success</span>';
}
function login(){
    if( signinEmail.value ==="" || signinPassword.value ===""){
        document.getElementById("incorrect").innerHTML = '<span class="text-danger">All inputs are required </span>';
        return;
    }
    var email = signinEmail.value.toLowerCase();
    var password =signinPassword.value;
     
    for(var i=0 ; i < signUpArray.length ; i++){
        if(signUpArray[i].email.toLowerCase() === email && signUpArray[i].password === password){
            localStorage.setItem("loginUsername" , signUpArray[i].name);
            window.location.href = "home.html";
            return;
        }
    }
    document.getElementById("incorrect").innerHTML = '<span class="text-danger">Incorrect email or password </span>';
}
  var username = localStorage.getItem("loginUsername");
        if(username != null){
            document.getElementById("username").innerHTML = "Welcome " + username;
        }
        function logout(){
            localStorage.removeItem("loginUsername");
            location.href = "index.html";
        }