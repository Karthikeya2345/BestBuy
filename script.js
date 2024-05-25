const details = JSON.parse(localStorage.getItem("users")) || [];
function checkPasswordComplexity(details) {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const pass = [];

    for (let i = 0; i < password.length; i++) {
        pass[i] = password[i];
    }

    const check = [0, 0, 0, 0];
    for (let i = 0; i < pass.length; i++) {
        let charCode = pass[i].charCodeAt(0);

        if (charCode >= 65 && charCode <= 90) {
            check[0]++;
        } else if (charCode >= 97 && charCode <= 122) {
            check[1]++;
        } else if (charCode >= 48 && charCode <= 57) {
            check[2]++;
        } else {
            check[3]++;
        }
    }

    if (check[0] != 0 && check[1] != 0 && check[2] != 0 && check[3] != 0) {
        let index = -1;

        for (let x in details) {
            if (email == details[x].emailid) {
                index = x;
                break;
            }
        }

        if (index !== -1) {
            if (password == details[index].passwordid && email == details[index].emailid) {
                window.location.href = "homepage.html";
            } 
            else {
                if (email == details[index].emailid) {
                    alert("Incorrect Password");
                } else {
                    alert("Incorrect Mail");
                }
            }
        } else {
            alert("Email not found");
        }
    } else {
        alert("The password must contain uppercase, lowercase, number & special characters");
    }
}

function addNewuser(details) {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let conform = document.getElementById("conform").value;

    const pass = [];

    for (let i = 0; i < password.length; i++) {
        pass[i] = password[i];
    }

    const check = [0, 0, 0, 0];
    for (let i = 0; i < pass.length; i++) {
        let charCode = pass[i].charCodeAt(0);

        if (charCode >= 65 && charCode <= 90) {
            check[0]++;
        } else if (charCode >= 97 && charCode <= 122) {
            check[1]++;
        } else if (charCode >= 48 && charCode <= 57) {
            check[2]++;
        } else {
            check[3]++;
        }
    }

    if (check[0] != 0 && check[1] != 0 && check[2] != 0 && check[3] != 0) {
        if (password != conform) {
            alert("Password is different");
        } 
        else {
            let emailExists = details.some(user => user.emailid === email);
            if (emailExists) {
                alert("User already exists.");
            } else {
                const newuser = {emailid: email, usernameid: username, passwordid: password};
                details.push(newuser);
                localStorage.setItem("users", JSON.stringify(details));
                alert("User registered successfully!");
                window.location.href = "login.html";
            }
        }
    } else {
        alert("The password must contain uppercase, lowercase, number & special characters");
    }
}


document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            addNewuser(details); 
        });
    } 
    else {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            checkPasswordComplexity(details); 
        });
     }
});
