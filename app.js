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

        $(tname).text(childSnapshot.val().name);
        $(tdest).text(childSnapshot.val().dest);
        $(tfirst).text(childSnapshot.val().firstserv);
        $(thead).text(childSnapshot.val().freq);

        newR.append(tname, tdest, tfirst, thead, tarrive);
        $("#timetable").append(newR);



        let tfrequency = parseInt(childSnapshot.val().freq);
        let tstart = childSnapshot.val().firstserv;
        let tstartmin = moment(tstart, "hh/mm");
        let diff = moment().diff(tstartmin, "minutes");
        let nexttrain = diff%tfrequency;

        $(tarrive).text(nexttrain);
        
        console.log(nexttrain);
    })