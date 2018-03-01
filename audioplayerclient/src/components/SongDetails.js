import React, { Component } from 'react';

class SongDetails extends Component {
  render() {
    let songList = this.props.songs
    let match = this.props.match.params
    let songJSX = songList.map((song, i) => {
      if (match.songId === song.title)
        return (
          <div key={i}>
            <h3>{match.songId}</h3>
            <p>{song.description}</p>
            <button type="button" onClick={
                () => { this.props.playSong(i) }
              }>Play</button>
          </div>
        )
    })

    return (
      <div className="col col-sm-6 col-xs-12">
        {songJSX}
      </div>
    )
  }
}

export default SongDetails;