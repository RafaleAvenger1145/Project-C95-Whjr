//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBQyjrjTsIQsGMGcgu-cr1HjszcHi5ZWMk",
      authDomain: "testkwitter.firebaseapp.com",
      databaseURL: "https://testkwitter.firebaseio.com",
      projectId: "testkwitter",
      storageBucket: "testkwitter.appspot.com",
      messagingSenderId: "624653701634",
      appId: "1:624653701634:web:2cb9a8bd873f17d92d8d1b"
};
firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");
function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id , message_data);
l_name = message_data['name'];
like = message_data['like'];
message = message_data['message'];

name_with_tag = "<h4>"+l_name + "<img src ='tick.png' class ='user_tick'></h4>";
message_with_tag = "<h4 class = 'message_h4'>"+message+"</h4>";
like_with_tag = "<button class='btn btn-warning' id="+firebase_message_id+" value ="+like+" onclick ='updatelike(this.id)'>"
span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>LIKE"+like+"</span></button><hr>";

row = name_with_tag + message_with_tag + like_with_tag + span_with_tag ;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }

getData();

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function updatelike(message_id){
      console.log(message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes)+1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}