// YOUR CODE HERE:
var app = {};

app.friends = [];

app.server = 'https://api.parse.com/1/classes/messages?order=-createdAt&limit=500';

var fetchData;

$(document).ready(function() {
  app.init = function() {
    app.fetch();


    $('#chats').on('click', '.chat a', function(event) { 
      var user = this.innerHTML;
      event.preventDefault();
      app.handleUsernameClick(user);
    });


    $('#send').submit(function(event) {
      event.preventDefault();
      app.handleSubmit();
      app.send();
    });
    $('#addroom').submit(function(event) {
      event.preventDefault();
      app.renderRoom();
    });
    $('select[name="rooms"]').change(function() {

      var selectedRoom = $(this).val();
      var room = fetchData.results.filter(function(obj){
        return obj.roomname === selectedRoom;
      });
      $('#chats').html('');
      room.forEach(function(obj){
        $('#chats').append('<div class="chat"><a href="#" class="user">' + DOMPurify.sanitize(obj.username) + '</a>' + ' ' + DOMPurify.sanitize(obj.text) + '</div>'); 
      });
    });

  };

  app.send = function(param = {}) {
    var length = window.location.search.length;
    param.username = window.location.search.slice(10, length);
    param.text = $('#message').val();
    param.roomname = $('#roomSelect').val();
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(param),
      contentType: 'application/json',
      success: function (data) {
        app.fetch();
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };


  app.fetch = function() {
    $.ajax({
      //? ==> query, & seperates unique query
      url: 'https://api.parse.com/1/classes/messages?order=-createdAt&limit=100',
      type: 'GET',
            //success is a "promise method", return value of the sucess function is "data"
      success: function(data) {
        fetchData = data;
        console.log(fetchData);
        var userInfo = {};
        var rooms = [];
        var textResults = data.results.forEach(function(obj) {

          $('#chats').append('<div class="chat"><a href="#" class="user">' + DOMPurify.sanitize(obj.username) + '</a>' + ' ' + DOMPurify.sanitize(obj.text) + '</div>');  
          if (!userInfo.hasOwnProperty([obj.username])) {
            userInfo[obj.username] = [];
            userInfo[obj.username].push({text: obj.text, room: obj.roomname});
          } else {
            userInfo[obj.username].push({text: obj.text, room: obj.roomname});
          }
        });
        for (var item in userInfo) {
          // $('#usernames').append('<option>' + DOMPurify.sanitize(item) + '</option>');
          for (var i = 0; i < userInfo[item].length; i++) {
            if (!rooms.includes(userInfo[item][i].room)) {
              rooms.push(userInfo[item][i].room);
              $('#roomSelect').append('<option>' + DOMPurify.sanitize(userInfo[item][i].room) + '</option>');
            }
          }
        }
      }
    });
  };

  app.clearMessages = function() {
    return $('#chats').remove();
  };

  app.renderMessage = function(obj) {
    if (!document.getElementById('chats')) {
      $('body').append('<div id="chats"> </div>');
    }
    $('#chats').append('<div class="chat"><a href="#" class="user">' + DOMPurify.sanitize(obj.username) + '</a>' + ' ' + DOMPurify.sanitize(obj.text) + '</div>');
    //mvp this passes the test, may need to append in a different funcion
  };

  app.renderRoom = function () {
    var $room = $('.addroom').val();
    if (!document.getElementById('roomSelect')) {
      $('body').append('<div id="roomSelect"></div>');
    }
    $('#roomSelect').append('<option>' + DOMPurify.sanitize($room) + '</option>');
  };

  app.handleUsernameClick = function(input) {
    if (!this.friends.includes(input)) {
      this.friends.push(input);
    }
    console.log(this.friends);
  };
  app.handleSubmit = function() {
    var $message = $('textarea').val();
    // console.log($message);
    // app.renderMessage($message);
    app.fetch();

  };

  app.init();

});

// $('form').submit(function(event) {
//   console.log('meow');
//   event.preventDefault();
//   app.handleSubmit();
// });