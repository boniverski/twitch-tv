import React, {Component} from 'react';
import User from './User';
import $ from 'jquery';

const makeURL = (type, name) => {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
}

class List extends Component {
  static defaultProps = {
    users: ["MedryBW", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "batmaaan"]
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      avatar: 'https://raw.githubusercontent.com/boniverski/twitch-tv/v1/image/twitch-icon.png',
      online: false,
      stream: 'This account cannot be found',
      game: '',
      url: ''
    }
  }

  componentDidMount() {
    this.props.users.map(user => {
      $.getJSON(makeURL('streams', user), (data) => {
        //console.log(data);
        this.setState({
          online: data.stream !== null ? !this.state.online : this.state.online,
          stream: data.stream !== null ? data.stream.game : ''
        })

        $.getJSON(makeURL('channels', user))
         .then((data) => {
          this.setState({
            avatar: data.logo !== null ? data.logo : this.state.avatar,
            username: data.display_name !== null ? data.display_name : user,
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
      <div>
        <User name={this.state.username} avatar={this.state.avatar} streamInfo={this.state.game} />
      </div>
    )
  }
}

export default List;
