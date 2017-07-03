var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getUser() {
  users.forEach(function(channel){
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };

  //$(document).ready(function() {

    $.getJSON(makeURL("streams", channel), function(data) {
      var streamInfo;
      if (data.stream === null) {
        // user = data.stream.channel.display_name;
        streamInfo = "";
      } else if (data.stream === undefined) {
        // user = data.stream.channel.display_name;
        streamInfo = "Account Closed";
      } else {
        // user = data.stream.channel.display_name;
        streamInfo = data.stream.game;
      };
      $.getJSON(makeURL("channels", channel), function(data) {
        var avatar = data.logo != null ? data.logo : "http://tarch.in/img/placeholder/blogpost-placeholder-100x100.png",
            user = data.display_name != null ? data.display_name : channel,
            game = streamInfo ? ' ' + data.status : "";

            html = '<div class="user"><img class="user__avatar" src="' + avatar + '" alt="' + user + '"><div class="user__card"><h4 class="user--name">' + user + '</h4><p class="user--stream-info">' + game + '</p></div></div>'


            $(".main").append(html);
            console.log(data);
      });
    });
  })
}

getUser();
