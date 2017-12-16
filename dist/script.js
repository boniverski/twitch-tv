const usernames = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "batmaaan"];
let apiUrls = [];

$(document).ready(function() {
  // Get API URLs for each Twitch user
  function makeURL(type, name) {
    return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`;
  }

  usernames.forEach(user => {
    const username = user;

    $.getJSON(makeURL('streams', user), (data) => {

      let streamInfo = data.stream === null ? '' : data.stream.game,
          status     = data.stream === null ? 'Offline' : 'Online',
          defaultAvatar = 'https://raw.githubusercontent.com/boniverski/twitch-tv/v1/image/twitch-icon.png';

      $.getJSON(makeURL('channels', username), (data) => {
        console.log(data)
        const userObj = {

          name: (data.display_name === null || data.error) ? username : data.display_name,
          avatar: (data.logo === null || data.error) ? defaultAvatar : data.logo,
          url: (data.display_name === null || data.error) ? '' : `href='${data.url}' targe='_blank'`,
          followers: (data.display_name === null || data.error) ? '' :  `Followers: ${data.followers}`,

          onlineStatus: (function () {
            if(!data.error) {
              if(status) {return status;}
              else {return !status;}
            }
            return '';
          })(),

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
                        <div class='avatar'>
                          <img src='${userObj.avatar}' alt="avatar" />
                        </div>
                        <div>
                          <a ${userObj.url}>
                            <h2>${userObj.name}</h2>
                          </a>
                          <p>${userObj.streamInfo}</p>
                        </div>
                        <div>
                          <p>${userObj.onlineStatus}<p>
                          <p>${userObj.followers}</p>
                        </div>
                      </div>
                      `
        $('.app_users').append(user);
      });
    });
  });
});
