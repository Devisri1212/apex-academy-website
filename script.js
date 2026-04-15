   
//for signup page
const signupForm = document.getElementById("signup-form");
if(signupForm){
const signupMessage = document.getElementById("signup-message");

signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;  

    if(name ==="" || email === "" || password === ""){
        signupMessage.textContent = "Please fill in all fields.";
        signupMessage.style.color = "red";
        return;
    }
    // get all existing users
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Checking if email already exists
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            signupMessage.textContent = "User already exists. Please login!";
            signupMessage.style.color = "red";
            return;
        }
     const userData = { name, email, password };
        users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));
   
    signupMessage.textContent = "Signup successful! You can now login.";
    signupMessage.style.color = "green";
     setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    signupForm.reset();

});
}


//for login page
const loginForm = document.getElementById("login-form");
if(loginForm){
const loginMsg = document.getElementById("login-message");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
            user => user.email.toLowerCase() === email && user.password === password
        );

        if (!matchedUser) {
            loginMsg.textContent = "Invalid email or password!";
            loginMsg.style.color = "red";
            return;
        }

        loginMsg.textContent = "Login successful!";
        loginMsg.style.color = "green";

        // store logged in user (for welcome message later)
        localStorage.setItem("loggedInUser", matchedUser.name);

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}