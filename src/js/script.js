const usernames = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "batmaaan"];
let apiUrls = [];

$(document).ready(function() {
  // Get API URLs for each Twitch user
  function makeURL(type, name) {
    return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`;
  }

  usernames.forEach(user => {
    const username = user;

    $.getJSON(makeURL('streams', username), (data) => {
      let streamInfo = data.stream === null ? '' : data.stream.game,
          status     = data.stream === null ? 'Offline' : 'Online',
          defaultAvatar = 'https://raw.githubusercontent.com/boniverski/twitch-tv/v1/image/twitch-icon.png';

      $.getJSON(makeURL('channels', username), (data) => {
        const user = {
          name: (data.display_name === null || data.error) ? username : data.display_name,
          avatar: (data.logo === null || data.error) ? defaultAvatar : data.logo,
          url: (data.display_name === null || data.error) ? '' : `href='${data.url}'`,
          followers: (data.display_name === null || data.error) ? '' :  `Followers: ${data.followers}`,
          onlineStatus: status,
          searchQuery: username.toLowerCase(),
          streamInfo: (function() {
            if(!data.error) {
              if(streamInfo) { return data.status; }
              else { return ''; }
            }
            return 'This user does not exist';
          })()
        }

        const userTile = `
                      <div class='user-tab border-radius' data-filter-item data-filter-name="${user.searchQuery}" data-filter="${user.onlineStatus}">
                        <div class='user-avatar'>
                          <a ${user.url} target='_blank'>
                            <img src='${user.avatar}' alt="avatar" />
                          </a>
                        </div>
                        <div class='user-main-info'>
                          <a ${user.url} target='_blank'>
                            <h2>${user.name}</h2>
                          </a>
                          <p>${user.streamInfo}</p>
                        </div>
                        <div class='user-availability'>
                          <p>${user.onlineStatus}</p>
                          <p>${user.followers}</p>
                        </div>
                      </div>
                      `

        $(userTile).hide().appendTo('.app_users').fadeIn('300');

        $('input').on('keyup', () => {
          let $query = $('input').val().toLowerCase();
          let $filteredUser = $('[data-filter-item]');

          if ($query != '') {
            $filteredUser.addClass('hidden');
            $(`.user-tab[data-filter-name*="${$query}"]`).removeClass('hidden'); }
          else { $filteredUser.removeClass('hidden'); }

        });
      });
    });
  });

  $('.button').click(function() {

    let $status = $(this).attr('id');
    const $offUsers = $('.user-tab').filter('[data-filter="Offline"]');
    const $onUsers = $('.user-tab').filter('[data-filter="Online"]');

    if($status === 'on') {
      $offUsers.css('display', 'none');
      $onUsers.css('display', 'flex');
    } else if ($status === 'off') {
      $offUsers.css('display', 'flex');
      $onUsers.css('display', 'none');
    } else if ($status === 'all') {
      $('.user-tab').filter($offUsers, $onUsers).css('display', 'flex');
    }

  });

});
