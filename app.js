var config = {
    apiKey: "AIzaSyBhnrVc5T-Yz54JwZDMgYTTh68LmgWeOmI",
    authDomain: "trainlover99-71c38.firebaseapp.com",
    databaseURL: "https://trainlover99-71c38.firebaseio.com",
    projectId: "trainlover99-71c38",
    storageBucket: "",
    messagingSenderId: "1058084065981"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

  $("#submit").on("click", function(e){
        e.preventDefault();
      
        // This grabs all the values from the user inputs
        let userTN = $("#train-name").val().trim();
        let userDest = $("#destination").val().trim();
        let userServ = $("#1service").val().trim();
        let userFreq = $("#freq").val().trim();

        database.ref().push({
            name: userTN,
            dest: userDest,
            firstserv: userServ,
            freq: userFreq
        });
 
    });


    database.ref().on("child_added", function (childSnapshot){
        let newR = $("<tr>");
        let tname = $("<td>");
        let tdest = $("<td>");
        let tfirst = $("<td>");
        let thead = $("<td>");
        let tarrive = $("<td>");
        let tminsarv = $("<td>");

        
        let tfrequency = parseInt(childSnapshot.val().freq);
        let tstart = childSnapshot.val().firstserv;

        var firstTimeConverted = moment(tstart, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % tfrequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = tfrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nexttrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nexttrain).format("hh:mm"));
        
        
        
        $(tname).text(childSnapshot.val().name);
        $(tdest).text(childSnapshot.val().dest);
        $(tfirst).text(childSnapshot.val().firstserv);
        $(thead).text(childSnapshot.val().freq);
        $(tarrive).text(nexttrain);
        $(tminsarv).text(tMinutesTillTrain);

        newR.append(tname, tdest, tfirst, thead, tarrive, tminsarv);
        $("#timetable").append(newR);

    })