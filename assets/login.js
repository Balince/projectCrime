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
var localDB = []
var getObject;

$("#searchB").hide();

$(document).ready(function () {

    // if you already login, skip the login screen and proceed straight to the search bar
    var storeName = localStorage.getItem("storeName");
    if (localStorage.getItem("storeName") && localStorage.getItem("storePW")) {
        console.log("check")
        $("storeName").text($("#spUname"))
        $("storePW").text($("#spPass"))
        $("#loginForm").click()
        $("#hideBar").hide()
        $('#user').text(storeName.replace(/"/g, ''))
        $("#searchB").show();

    };


    // hide register new account text on register button click and login dropdown

    $(".hide2").click(function () {
        $(".hideText").hide()
        $(".hideLog").hide()
        $(".hideReg").show()
    });

    // show login dropdown and hide register dropdown
    $(".hide1").click(function () {
        $(".hideLog").show()
        $(".hideReg").hide()
    });

    // // show register dropdown    
    // $(".hide2").click(function() {
    //     $(".hideReg").show()
    // });   

    // account creation
    $("#addUser").on("click", function (e) {
        e.preventDefault();

        var userName = $("#name").val().trim();
        var userPW = $("#pw").val().trim();

        var newUser = {
            name: userName,
            password: userPW

        };

        db.ref().push(newUser);

        $(".hideReg").hide();
        $(".hideLog").show();


    });

    // storing user info in database
    db.ref().on("child_added", function (newUserSnapshot) {


        dbUserName = newUserSnapshot.val().name;
        dbUserPW = newUserSnapshot.val().password;
        localDB.push(newUserSnapshot.val());

    });


    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        for (var i = 0; i < localDB.length; i++) {
            var userInfo = localDB[i]
            console.log(dbUserName)

            //storing login info on users local storage for auto login
            if (userInfo.name === $("#spUname").val() && userInfo.password === $("#spPass").val()) {
                localStorage.setItem("storeName", JSON.stringify(userInfo.name));
                localStorage.setItem("storePW", JSON.stringify(userInfo.password));
                console.log('found', userInfo)

                //hiding login screen and showing search screen
                $("#loginForm")[0].reset();
                $("#hideBar").hide();
                $("#user").text(userInfo.name);
                $("#searchB").show();

            }

        }
    });

    // basic search functionality along with resetting all search info on submit click
    $("#searchForm").on("submit", function (e) {
        e.preventDefault();

        $("#searchForm")[0].reset();
        $("#hideBar").hide();
        $("#searchB").show();

    });
});