import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

let users = ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "batmaaan"];

const makeURL = (type, name) => {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
}
let ProfileTile = () => {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.avatar}</div>
        <div>{this.props.game}</div>
        <div>{this.props.url}</div>
      </div>
    )
}

class ProfileList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      avatar: 'https://raw.githubusercontent.com/boniverski/twitch-tv/v1/image/twitch-icon.png',
      online: false,
      stream: 'This account cannot be found',
      game: '',
      url: ''
    }
  }

  componentDidMount() {
    users.forEach(user => {
      $.getJSON(makeURL('streams', user), (data) => {
        //console.log(data);
        this.setState({
          online: data.stream !== null ? !this.state.online : this.state.online,
          stream: data.stream !== null ? data.stream.game : ''
        })

        $.getJSON(makeURL('channels', user)) .then((data) => {
          this.setState({
            avatar: data.logo !== null ? data.logo : this.state.avatar,
            name: data.display_name !== null ? data.display_name : user,
            game: this.state.stream ? ' ' + data.status : '',
            url: data.url
          })
        })
        .catch((e) => {
          console.log(e);
        })
      })
    })
  }

  render() {
    return (
      <div className="App">
        users.map((data, i) => {
          <ProfileTile user={data} key={i} />
        })
      </div>
    );
  }
}

class App extends Component {
  render() {
    return(
      users.map((data, i) => {
        return <ProfileList user={data} key={i} />
      })

    )
  }
}

export default App;
