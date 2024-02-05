let ord="The instructions should be followed to sign-in:";
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function start()
{
    document.getElementById("loginEmail").addEventListener("click",click1,false);
    document.getElementById("loginName").addEventListener("click",click2,false);
    document.getElementById("loginPassword").addEventListener("click",click3,false);
    document.getElementById("loginEmail").addEventListener("blur",blur1,false);
    document.getElementById("loginName").addEventListener("blur",blur2,false);
    document.getElementById("loginPassword").addEventListener("blur",blur3,false);     
}
function click1(){
    document.getElementById("para1").innerHTML="Enter your name";
}
function click2(){
    document.getElementById("para2").innerHTML="Enter username";
}
function click3(){
    document.getElementById("para3").innerHTML="Enter your password";
}
function blur1(){
    document.getElementById("para1").innerHTML="";
}
function blur2(){
    document.getElementById("para2").innerHTML="";
}
function blur3(){
    document.getElementById("para3").innerHTML="";
}
window.addEventListener("load",start,false);
// function calculate_age(a) {
    
//     let ab =a.replace('-','/');
//     var dob=new Date(ab);
//     let currentDate = new Date();
//     let Day = currentDate.getDate();
//     let Month = currentDate.getMonth() + 1;
//     let Year = currentDate.getFullYear();
//     const dates = 1000 * 60 * 60 * 24 * 365;
//     const d1 = Date.UTC(dob.getFullYear(), dob.getMonth(), dob.getDate());
//     const d2 = Date.UTC(Year,Month,Day);
//     var age=Math.floor((d2 - d1) / dates);
//     if(age>=18){
//         return false;
//     }
//     return true;
// }
function login()
{
    var name =document.forms["logForm"]["name"].value;
    var email =document.forms["logForm"]["email"].value;
    var password=document.forms["logForm"]["password"].value;
    if (email == "") {
        window.alert("Please enter a valid e-mail address.");
        return false;
    }
    if (name == "") {
        window.alert("Please enter your name properly.");
        return false;
    }
    if (password == "") {
        window.alert("Please enter your password");
        return false;
    }
    if(password.length <=6 || password.length>=20){
        window.alert("Password should be atleast 6 character long");
        return false;
    }
    window.location.assign("https://www.google.com");
    return true;
}
function here(id,extra){
    document.getElementById(id).innerHTML = ord+extra.fontcolor("red");
    return false;
}
function remove(id){
    document.getElementById(id).innerHTML ="";
    return false;
}
function signup()
{
    var name =document.forms["RegForm"]["name"].value;
    var Usrname=document.forms["RegForm"]["Username"].value;
    var email =document.forms["RegForm"]["email"].value;
    var dob=document.forms["RegForm"]["dob"].value;
    var password=document.forms["RegForm"]["password"].value;
    var repassword=document.forms["RegForm"]["repass"].value;
    
    var upper = password.match(/[A-Z]/)
    var lower = password.match(/[a-z]/g)
    var number = password.match(/[0-9]/g)
    var specialc=password.match(/[!@#$%^&*]/g)
    if (name == "" || name.length<6) {
        window.alert("Please enter a valid name.");
        if(name == "" && name.length<6)
            return  here("show","<br>*name not should be empty<br>*atleast 6 charaters");
        if(name.length<=6)
            return  here("show","<br>*atleast 6 charaters");
    }
    remove("show");
    if (Usrname == "" || name==Usrname) {
        window.alert("Please enter a valid Username.");
        if(Usrname == "" && Usrname.length<=6)
            return  here("show1","<br>*name not should be empty<br>*atleast 6 charaters");
        if(Usrname.length<=6)
            return  here("show1","<br>*atleast 6 charaters");
        if(Usrname == name)
        return  here("show1","<br>*Username and your name should not be equal");
    }
    remove("show1");
    
    if (!(re.test(email))) {
        window.alert("Please enter a valid e-mail address.");
        return  here("show2","<br>*Please enter a valid e-mail address.");
    }
    remove("show2")
    // if(calculate_age(dob)){
    //     window.alert("under 18");
    //     return  here("show3","<br>*You should be above 18");
    // }
    // remove("show3");
    if (password.length<8 ||!(number && specialc && upper && lower)) {
        window.alert("Please enter your password");
        if(password.length<8)
            return  here("show4","<br>*atleast contain 8 characters<br>*atleast contain one Uppercase letter<br>*atleast contain one lowercase letter<br>*atleast contain one special character<br>*atleast contain one integer");
        if(!(number && specialc && upper && lower))
            return  here("show4","<br>*atleast contain one Uppercase letter<br>*atleast contain one lowercase letter<br>*atleast contain one special character<br>*atleast contain one integer");
    }
    remove("show4");
    if(password.length <=6 || password.length>=20){
        window.alert("Password should be atleast 6 character long");
        return false;
    }
    if (repassword == "") {
        window.alert("Please enter your password");
        return false;
    }
    remove("show5");
    if (repassword != password) {
        window.alert("Both password and confirm password should be same");
        return false;
    }
    return true;
}