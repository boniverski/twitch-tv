const usernames = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "batmaaan"];
let apiUrls = [];
let users = []

$(document).ready(function() {

  // Get API URLs for each Twitch user
  function makeURL(type, name) {
    return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`;
  }

  let getData = new Promise((resolve, reject) => {
    usernames.forEach(user => {
      $.getJSON(makeURL('streams', user), (data) => {

        let streamInfo = data.stream === null ? '' : data.stream.game,
            status     = data.stream === null ? 'Offline' : 'Online',
            defaultAvatar = 'https://raw.githubusercontent.com/boniverski/twitch-tv/master/image/twitch-icon.png';

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
          users.push(userObj);
        })
      });
    });
  });
});

console.log(users);
