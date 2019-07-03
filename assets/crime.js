//When the page loads start
window.onload = function(){

    //Vars for the location:
    var state = "PA";                       //State (2 Letter format)
    var city = "Philadelphia"               //City
    var location = city+"+"+state;
    console.log("Loc: "+ location);
    
    //Configure the first API (Crime data)
    var crimeDataKey = "tKe8k0TE88uhuF5co5j1Msaj8K6IoDeZIVncWvQe";
    //API Url for the Crime Data
    var crimeURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key="+ crimeDataKey +"&location="+ location;

    $.ajax({
        url: crimeURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}