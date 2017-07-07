/*
 * Title: Twitch.tv JSON API (for FreeCodeCamp), July 2017
 * Author: Boško Rabrenović
 * https://github.com/boniverski/twitch-tv
 * Description: Twitch.tv App monitors the state of selected Twitch and filters their profiles based on the stream status.
 */

// Twitch users
var users = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Running code on ready state
$(document).ready(function() {

  // Iterating through "users" array
  users.forEach(function getUsers(channel){
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };

    // Checking for user's stream statuss
    $.getJSON(makeURL("streams", channel), function(data) {

      var streamInfo, status;
      var defaultAvatar = 'image/twitch-icon.png'; //If there's no user's avatar

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

      // Fetching JSON data and setting up variables
      $.getJSON(makeURL("channels", channel), function(data) {
        var avatar = data.logo != null ? data.logo : defaultAvatar,
            user = data.display_name != null ? data.display_name : channel,
            game = streamInfo ? " " + data.status : "";
            url = data.url;
            searchQuery = user.toLowerCase();

        // Setting online/fffline indicator in user's card
        var statusIndicator, addClass;
            if (status === "online") {
              statusIndicator = '<span class="user__availability user__availability--on"></span>';
              addClass = 'online';
            } else {
              statusIndicator = '<span class="user__availability user__availability--off"></span>';
              addClass = 'offline';
            }

        // Making user's card in results
        var html = '<div class="user' + ' ' + addClass + '" data-filter-item data-filter-name="' + searchQuery + '"><img class="user__avatar" src="' + avatar + '"><div class="user__card"><a href="' + url + '" target="_blank"><h4 class="user--name">' + user + '</h4></a><p class="user--stream-info">' + game + '</p></div>' + statusIndicator + '</div>';
        $(html).hide().appendTo(".main").fadeIn(300);
        $(".availability__btn--all").addClass("active-all-btn"); //Active "All" button
        $(".load-bar").hide(300); // Hiding loading bar when data is ready

        // Setting up search bar
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

  //Filtering users based on stream status
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
