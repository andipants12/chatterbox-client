// YOUR CODE HERE:
var app = {};

var fetchData;

$(document).ready(function() {
  app.init = function() {
    app.fetch();
    $('.username').on('click', app.handleUsernameClick);
    $('#send').submit(function(event) {
      event.preventDefault();
      app.handleSubmit();
      app.send();
    });
    $('#addroom').submit(function(event) {
      event.preventDefault();
      app.renderRoom();
    });

  };

  app.send = function() {
    var param = {};
    param.username = "andi";
    param.text = $('#message').val();
    param.roomname = $('#roomSelect').val();
    console.log(param, "param object");
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
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      data: {order: '-createdApp'},
      //success is a "promise method", return value of the sucess function is "data"
      success: function(data) {
        fetchData = data;
        var userInfo = {};
        var rooms = [];
        var textResults = data.results.forEach(function(obj) {
          $('#chats').append('<div class="chat"><span class="user">' + obj.username + '</span>' + ' ' + obj.text + '</div>');  
          if (!userInfo.hasOwnProperty([obj.username])) {
            userInfo[obj.username] = [];
            userInfo[obj.username].push({text: obj.text, room: obj.roomname});
          } else {
            userInfo[obj.username].push({text: obj.text, room: obj.roomname});
          }
        });
        for (var item in userInfo) {
          $('#usernames').append('<option>' + item + '</option>');
          for (var i = 0; i < userInfo[item].length; i++) {
            if (!rooms.includes(userInfo[item][i].room)) {
              rooms.push(userInfo[item][i].room);
              $('#roomSelect').append('<option>' + userInfo[item][i].room + '</option>');
            }
          }
        }
      }
    });
  };

  app.clearMessages = function() {
    return $('#chats').remove();
  };

  app.renderMessage = function(message) {
    if (!document.getElementById('chats')) {
      $('body').append('<div id="chats"> </div>');
    }
    $('#chats').append('<div>' + message + '</div>');
    //mvp this passes the test, may need to append in a different funcion
    $('#main').append('<div class="username"></div>');
  };

  app.renderRoom = function () {
    var $room = $('.addroom').val();
    if (!document.getElementById('roomSelect')) {
      $('body').append('<div id="roomSelect"></div>');
    }
    $('#roomSelect').append('<option>' + $room + '</option>');
  };

  app.handleUsernameClick = function() {};
  app.handleSubmit = function() {
    var $message = $('textarea').val();
    // console.log($message);
    app.renderMessage($message);
    app.fetch();

  };

  app.init();

});

// $('form').submit(function(event) {
//   console.log('meow');
//   event.preventDefault();
//   app.handleSubmit();
// });