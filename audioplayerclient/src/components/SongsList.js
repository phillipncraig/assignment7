import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SongsList extends Component {

  render() {
    let songList = this.props.songs

    let songListJSX = songList.map((song, i) => {
      return (
        <li key={i}>
          <button type="button" onClick={() => { this.props.playSong(i) }}>
            Play
          </button>
          {i + 1}: <Link to={song.title}>{song.title}</Link>  
        </li>
      )
    })

    return (
      <div className="col col-sm-6 col-xs-12">
        <h3>Song List:</h3>
        <ul>
          {songListJSX}
        </ul>
      </div>
    )

  }
}

export default SongsList;