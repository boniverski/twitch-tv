const usernames = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "batmaaan"];
let apiUrls = [];

$(document).ready(function() {
  // Get API URLs for each Twitch user
  function makeURL(type, name) {
    return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`;
  }

  usernames.forEach(user => {
    $.getJSON(makeURL('streams', user), (data) => {

      let streamInfo = data.stream === null ? '' : data.stream.game,
          status     = data.stream === null ? 'Offline' : 'Online',
          defaultAvatar = 'https://raw.githubusercontent.com/boniverski/twitch-tv/v1/image/twitch-icon.png';

      $.getJSON(makeURL('channels', user), (data) => {
        const userObj = {

          name: (data.display_name === null || data.error) ? user : data.display_name,
          avatar: (data.logo === null || data.error) ? defaultAvatar : data.logo,
          onlineStatus: status ? status : !status,
          streamInfo: (function() {
            if(!data.error) {
              if(streamInfo) {return data.status;}
              else {return '';}
            }
            return 'This user does not exist';
          })()
        }

        const user = `
                        <div class='user-tab'>
                          <h2>${userObj.name}</h2>
                          <p>${userObj.onlineStatus}</p>

                          <div class='info-collapse'>
                            <p>${userObj.streamInfo}</p>
                            <img src="${userObj.avatar}" alt="avatar" />
                          </div>
                        </div>
                        `
      $('.app_users').append(user);
      });
    });
  })
});
