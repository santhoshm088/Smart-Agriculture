let ord="The instructions should be followed to sign-in:";
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

window.addEventListener("load",start,false);
function verify()
{
 
var email =document.forms["RegForm"]["email"].value;

var password=document.forms["RegForm"]["pass"].value;
var repassword=document.forms["RegForm"]["repass"].value;

var upper = password.match(/[A-Z]/)
var lower = password.match(/[a-z]/g)
var number = password.match(/[0-9]/g)
var specialc=password.match(/[!@#$%^&*]/g)



if (!(re.test(email))) {
    window.alert("Please enter a valid e-mail address.");
    return false;
}




if (password.length<8 ||!(number && specialc && upper && lower)) {
    window.alert("Please enter your password");
    if(password.length<8)
    {
        window.alert("Password should above 8 characters");
        return  false;
    }
    if(!(number && specialc && upper && lower))
    {
    window.alert("Password is not Strong.Use a strong password");
        return  false;
    }
}


if (repassword == "") {
    window.alert("Please enter your password");
    return false;
}

if (repassword != password) {
    window.alert("Both password and confirm password should be same");
    return false;
}
return true;
}