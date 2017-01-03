// YOUR CODE HERE:
var app = {};

app.init = function() {
  $('.username').on('click', app.handleUsernameClick);
  $('.submit').on('submit', app.handleSubmit);
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
  $('#chats').append('<div>' + message.text + '</div>');
  //mvp this passes the test, may need to append in a different funcion
  $('#main').append('<div class="username"></div>');
};

app.renderRoom = function (room) {
  if (!document.getElementById('roomSelect')) {
    $('body').append('<div id="roomSelect"> </div>');
  }
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.handleUsernameClick = function() {};
app.handleSubmit = function() {};

