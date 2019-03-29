// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQLDMqy8sc_dgWMnZoab8VqOosDNruHpA",
    authDomain: "train-game-18741.firebaseapp.com",
    databaseURL: "https://train-game-18741.firebaseio.com",
    projectId: "train-game-18741",
    storageBucket: "train-game-18741.appspot.com",
    messagingSenderId: "893524305045"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on('click', function () {
    var trainName = $('#trainNameInput').val().trim();
    var destination = $('#destinationInput').val().trim();
    var firstTrain = moment($('#firstTrainInput').val().trim(), "HH:mm").subtract(10, 'years').format('x');
    var frequency = $('#frequencyInput').val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert('Your Train Has Been Added!');

    $('#trainNameInput').val("");
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");

    console.log(firstTrain);
    return false;

})

trainData.ref().on('child_added', function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, 'm').format("hh:mm A");

    $('#trainTable > tBody').append("<tr><td>" + name + "</td><td>"+destination+"</td><td>"+frequency+"</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
})