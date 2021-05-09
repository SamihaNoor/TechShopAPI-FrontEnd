function registrationValidation() {
    var fullName = document.forms["customerRegistrationForm"]["fullName"].value;
    var userName = document.forms["customerRegistrationForm"]["userName"].value;
    var email = document.forms["customerRegistrationForm"]["email"].value;
    var password = document.forms["customerRegistrationForm"]["password"].value;
    var confirmPassword = document.forms["customerRegistrationForm"]["confirmPassword"].value;
    var phone = document.forms["customerRegistrationForm"]["phone"].value;
    var address = document.forms["customerRegistrationForm"]["address"].value;

    if (fullName == "" || fullName.length < 1) {
        document.getElementById('msg').innerHTML = "*Company Name can not be empty!";
        return false;
    } else if (phone == "" || phone.length < 1) {
        document.getElementById('msg').innerHTML = "*Phone can not be empty!";
        return false;
    }
    else if (address == "" || address.length < 1) {
        document.getElementById('msg').innerHTML = "*Address can not be empty!";
        return false;
    }
    else if (password == "" || password.length < 1) {
        document.getElementById('msg').innerHTML = "*Password can not be empty!";
        return false;
    }
    else if (confirmPassword == "" || confirmPassword.length < 1) {
        document.getElementById('msg').innerHTML = "*Confirm Password can not be empty!";
        return false;
    }
    else if (password !== confirmPassword) {
        document.getElementById('msg').innerHTML = "*Passwords did not match!";
        return false;
    }
    else if (password == "" || password.length < 1) {
        document.getElementById('msg').innerHTML = "*Password can not be empty!";
        return false;
    }
    else if (userName == "" || userName.length < 1) {
        document.getElementById('msg').innerHTML = "*User Name can not be empty!";
        return false;
    }
    else if (email == "" || email.length < 1) {
        document.getElementById('msg').innerHTML = "*Email can not be empty!";
        return false;
    }
}

function validateLogin() {
    var email = document.forms["loginForm"]["email"].value;
    var password = document.forms["loginForm"]["password"].value;

    if (email.length < 1 || email == "") {
        document.getElementById('msg').innerHTML = "*Email can not be empty!";
        return false;
    }
    if (password.length < 1 || password == "") {
        document.getElementById('msg').innerHTML = "*Password can not be empty!";
        return false;
    }
    if (email.length > 50 || email.length < 5) {
        document.getElementById('msg').innerHTML = "*Invalid email length!";
        return false;
    }
    if (password.length > 20 || password.length < 8) {
        document.getElementById('msg').innerHTML = "*Invalid password length!";
        return false;
    }

}