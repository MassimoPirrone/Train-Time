// 1. configures firebase 
var firebaseConfig = {
    apiKey: "AIzaSyDCKVeaqTESJEVnnTWECfm7BwSxbu2OZ68",
    authDomain: "train-time-7bbee.firebaseapp.com",
    databaseURL: "https://train-time-7bbee.firebaseio.com",
    projectId: "train-time-7bbee",
    storageBucket: "",
    messagingSenderId: "983888532861",
    appId: "1:983888532861:web:a3d6957eee38a3a0"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

 // Add Employee Button
$("#addTrain").on('click', function(event) {
event.preventDefault(); 

// Gets user data inputs
    var tName = $('#trainName').val().trim();
    var tDestination = $('#trainDestination').val().trim();
    var tTime = $('#trainTime').val();
    var tFrequency = $('#trainFrequency').val();

 // creates local temporary object for storing user data
    var newTrain = {
        name: tName,
        destination: tDestination,
        time: tTime,
        frequency: tFrequency,
    }
// Upload to Firebase
    database.ref().push(newTrain);

    alert("New Train added successfully!!");
    $('#trainName').val("");
    $('#trainDestination').val("");
    $('#trainTime').val("");
    $('#trainFrequency').val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trnName = childSnapshot.val().name;
    var trnDestination= childSnapshot.val().destination;
    var trnTime = childSnapshot.val().time;
    var trnFrequency = childSnapshot.val().frequency;

    // console logs info
    console.log(trnName);
    console.log(trnDestination);
    console.log(trnTime);
    console.log(trnFrequency);

    // calculates next arrival
    var arrival = (trnTime.val() + trnFrequency.val());
    console.log(arrival);

    // calculates minuets away

    // creates new row
    var newRow = $("<tr>").append(
        $("<td>").text(trnName),
        $("<td>").text(trnDestination),
        $("<td>").text(trnFrequency)
    );
    // append new row to the table
        $("#trainTable  > trbody").append(newRow)
});
