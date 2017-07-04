var users = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function getUser() {

  $(".availability__btn--all").addClass("active-all-btn");

  users.forEach(function(channel){
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };


    $.getJSON(makeURL("streams", channel), function(data) {
      var streamInfo, status;
      if (data.stream === null) {
        // user = data.stream.channel.display_name;
        streamInfo = "";
        status = "offline"
      } else if (data.stream === undefined) {
        // user = data.stream.channel.display_name;
        streamInfo = "Account Closed";
        status = "offline"
      } else {
        // user = data.stream.channel.display_name;
        streamInfo = data.stream.game;
        status = "online"
      };
      $.getJSON(makeURL("channels", channel), function(data) {
        var avatar = data.logo != null ? data.logo : "http://4playernetwork.com/static/images/buttons/twitch-icon-lt.png",
            user = data.display_name != null ? data.display_name : channel,
            game = streamInfo ? ' ' + data.status : "";

        var statusIndicator, addClass;
            if (status === "online") {
              statusIndicator = '<span class="user__availability user__availability--on"></span>';
              addClass = 'online';
            } else {
              statusIndicator = '<span class="user__availability user__availability--off"></span>';
              addClass = 'offline';
            }

        var html = '<div class="user' + ' ' + addClass + '"><img class="user__avatar" src="' + avatar + '" alt="' + user + '"><div class="user__card"><h4 class="user--name">' + user + '</h4><p class="user--stream-info">' + game + '</p></div>' + statusIndicator + '</div>';
            $(".main").append(html);

      });
    });
  })
});
$(document).ready(function(){
  $(".availability__btn").click(function() {
      // $(".availability__btn--all").removeClass("active-all-btn");
      // $(this).addClass("active-all-btn");
    var status = $(this).attr('id');
    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
      $(".availability__btn--all").addClass("active-all-btn");
      $(".availability__btn--on").removeClass("active-on-btn");
      $(".availability__btn--off").removeClass("active-off-btn");
    } else if (status === "on") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
      $(".availability__btn--on").addClass("active-on-btn");
      $(".availability__btn--off").removeClass("active-off-btn");
      $(".availability__btn--all").removeClass("active-all-btn");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
      $(".availability__btn--off").addClass("active-off-btn");
      $(".availability__btn--on").removeClass("active-on-btn");
      $(".availability__btn--all").removeClass("active-all-btn");
    }
  })
})
