var users = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function() {
  $(".availability__btn--all").addClass("active-all-btn");

  users.forEach(function getUsers(channel){
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };


    $.getJSON(makeURL("streams", channel), function(data) {

      var streamInfo, status;
      var defaultAvatar = '../image/twitch-icon.png'

      if (data.stream === null) {
        streamInfo = "";
        status = "offline"
      } else if (data.stream === undefined) {
        streamInfo = "Account Closed";
        status = "offline"
      } else {
        streamInfo = data.stream.game;
        status = "online"
      };
      $.getJSON(makeURL("channels", channel), function(data) {
        var avatar = data.logo != null ? data.logo : defaultAvatar,
            user = data.display_name != null ? data.display_name : channel,
            game = streamInfo ? ' ' + data.status : "";
            url = data.url;
            searchQuery = user.toLowerCase();

        var statusIndicator, addClass;
            if (status === "online") {
              statusIndicator = '<span class="user__availability user__availability--on"></span>';
              addClass = 'online';
            } else {
              statusIndicator = '<span class="user__availability user__availability--off"></span>';
              addClass = 'offline';
            }

        var html = '<div class="user' + ' ' + addClass + '" data-filter-item data-filter-name="' + searchQuery + '"><img class="user__avatar" src="' + avatar + '" alt="' + user + '"><div class="user__card"><a href="' + url + '" target="_blank"><h4 class="user--name">' + user + '</h4></a><p class="user--stream-info">' + game + '</p></div>' + statusIndicator + '</div>';
        $(html).hide().appendTo(".main").fadeIn(300);
        $(".load-bar").hide(300);

        $("[data-search]").on("keyup", function() {
        	var searchVal = $(this).val();
        	var filterItems = $("[data-filter-item]");
        	if (searchVal != "") {
        		filterItems.addClass("hidden");
        		$('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass("hidden");
        	} else {
        		filterItems.removeClass("hidden");
        	}
        });
      });
    });
  })
  $(".availability__btn").click(function() {
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
});
