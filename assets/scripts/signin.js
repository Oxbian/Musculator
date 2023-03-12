//Function to check if email address is valid
function is_email(email) 
{
    //Checking thanks to regex
    return (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) ? true : false;
}

//Function to check if we have all the information to signin
function lookup()
{
    if (is_email(floatingInput.value) == true) {
        if (floatingPassword.value.length > 3) {
            return true;
        } else {
            error.textContent = "Something wrong! Password not long enough! ";
        }
    } else {
        error.textContent = "Something wrong! Email not formatted correctly! ";
    }
    return false;
}

function main()
{
    signin.classList.add("disabled");
    checkboxe.addEventListener("change",function(){
        if (this.checked == true) {
            floatingPassword.type = "text";
        } else {
            floatingPassword.type = "password";
        }
    });

    floatingInput.addEventListener("change",function() {
        if (lookup() == true) {
            signin.classList.remove("disabled");
            error.classList.add("text-muted");
        } else {
            signin.classList.add("disabled");
            error.classList.remove("text-muted");
        }
    });

    floatingPassword.addEventListener("change",function() {
        if (lookup() == true) {
            signin.classList.remove("disabled");
            error.classList.add("text-muted");
        } else {
            signin.classList.add("disabled");
            error.classList.remove("text-muted");
        }
    });
}

main();
