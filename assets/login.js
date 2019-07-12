var config = {
    apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    authDomain: "firstproject-da938.firebaseio.com",
    databaseURL: "https://firstproject-da938.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
};

firebase.initializeApp(config);

var db = firebase.database();
var dbUserName
var dbUserPW
var dbEmail
var localDB = []

$(document).ready(function () {

    // var storeName = localStorage.getItem("storeName");
    // var storePW = localStorage.getItem("storePW");
    
    // // if you already logged in, hide the login and register dropdown and put the users name there

    //     if (storeName && storePW) {
    //     $(".username").text(storeName)
    //     $(".password").text(storePW)
    //     $(".dropdown-toggle").hide(); 
    //     $(".login-submit").click();
    //     $('.userDisplay').text(storeName.replace(/"/g, ''))
    

    // };

    // account creation
    $(".register-submit").on("click", function (e) {
        e.preventDefault();
        console.log("checking")
        var userName = $(".username").val().trim();
        var userPW = $(".password").val().trim();
        var userEmail = $(".email").val().trim();

        var newUser = {
            name: userName,
            password: userPW,
            email: userEmail 

        };

        db.ref().push(newUser);


    });

    // storing user info in database
    db.ref().on("child_added", function (newUserSnapshot) {


        dbUserName = newUserSnapshot.val().name;
        dbUserPW = newUserSnapshot.val().password;
        dbEmail = newUserSnapshot.val().email;
        localDB.push(newUserSnapshot.val());

    });


    $(".login-submit").on("submit", function (e) {
        e.preventDefault();
        for (var i = 0; i < localDB.length; i++) {
            var userInfo = localDB[i]
            console.log(dbUserName)

            localStorage.setItem("storeName", JSON.stringify(userInfo.name));
            localStorage.setItem("storePW", JSON.stringify(userInfo.password));

            //storing login info on users local storage for auto login
            if (userInfo.name === $(".username").val() && userInfo.password === $(".password").val()) {
               
                console.log("check")
                $(".username").text(userInfo.name)
                $(".password").text(userInfo.password)
               

                



            }


        }
    });
});