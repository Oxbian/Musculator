//Function to check if email address is valid
function is_email(email) 
{
    //Checking thanks to regex
    return (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) ? true : false;
}

//Function to check if we have all the information to signin
function lookup()
{
    if (is_email(floatingInput.value) == true && floatingPassword.value.length > 3 && floatingPassword.value == floatingPasswordConfirmation.value)
        return true; 
    return false;
}

function main()
{
    register.classList.add("disabled");
    checkboxe.addEventListener("change",function() {
        if (this.checked == true) {
            floatingPassword.type = "text";
            floatingPasswordConfirmation.type = "text";
        } else {
            floatingPassword.type = "password";
            floatingPasswordConfirmation.type = "password";
        }
    });

    floatingInput.addEventListener("change",function() {
        if (lookup() == true) {
            register.classList.remove("disabled");
        } else {
            register.classList.add("disabled");
            error.textContent = "Something wrong! Email not formatted correctly or password not long enough! ";
            error.classList.remove("text-muted");
        }
    });

    floatingPassword.addEventListener("change",function() {
        if (lookup() == true) {
            register.classList.remove("disabled");
            error.classList.add("text-muted");
        } else {
            register.classList.add("disabled");
            error.textContent = "Something wrong! Email not formatted correctly or password not long enough or password not matches !";
            error.classList.remove("text-muted");
        }
    });

    floatingPasswordConfirmation.addEventListener("change",function() {
        if (lookup() == true) {
            register.classList.remove("disabled");
            error.classList.add("text-muted");
        } else {
            register.classList.add("disabled");
            error.textContent = "Something wrong! Email not formatted correctly or password not long enough or password not matches !";
            error.classList.remove("text-muted");
        }
    });
}

main();
