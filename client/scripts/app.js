// YOUR CODE HERE:
var app = {};

$(document).ready(function() {
  app.init = function() {
    $('.username').on('click', app.handleUsernameClick);
    $('#send').submit(function(event) {
      event.preventDefault();
      app.handleSubmit();
    });
  };

  app.send = function(param) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(param)
    });
  };

  app.fetch = function(param) {
    $.ajax({
      type: 'GET',
      data: JSON.stringify(param)
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

  app.renderRoom = function (room) {
    if (!document.getElementById('roomSelect')) {
      $('body').append('<div id="roomSelect"></div>');
    }
    $('#roomSelect').append('<div>' + room + '</div>');
  };

  app.handleUsernameClick = function() {};
  app.handleSubmit = function() {
    var $message = $('textarea').val();
    app.renderMessage($message);

  };

  app.init();

});

// $('form').submit(function(event) {
//   console.log('meow');
//   event.preventDefault();
//   app.handleSubmit();
// });