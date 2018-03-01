import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      currentSong: 0,
      playing: false
    }
  }

  componentDidMount() {
    let promise = axios.get(`http://localhost:8080/`)
    promise.then((response) => {
      this.setState({
        songs: response.data
      })
    })
  }

  changeSong = (index) => {
    this.setState({
      currentSong: this.state.currentSong + index
    }, () => {
      this.audioPlayer.load()
      if (this.state.playing) {
        this.audioPlayer.play()
        this.setState({
          playing: true
        })
      } else {
        this.audioPlayer.pause()
        this.setState({
          playing: false
        })
      }
    })
  }


  play = () => {
    this.audioPlayer.play()
    this.setState({
      playing: true
    })
  }

  pause = () => {
    this.audioPlayer.pause()
    this.setState({
      playing: false
    })
  }

  playSong = (i) => {
    this.setState({
      currentSong: i,
      playing: true
    }, () => {
      this.audioPlayer.load()
      this.audioPlayer.play()
    })
  }

  render() {
    return (
        // The below is basically stopping the return until the songs list is mounted, otherwise it breaks. WELCUM TO ASYNC PROGRAMMING BOI
        this.state.songs.length > 0 && (
        <div className="App">
        <audio /* controls} */ ref={(self) => { this.audioPlayer = self }}>
          <source src={this.state.songs[this.state.currentSong].source} />
        </audio>
         
        
        <button type="button" onClick={() => { this.play() }}>Play Song</button>
        <button type="button" onClick={() => { this.pause() }}>Pause Song</button> <br />
        <button type="button" disabled={(this.state.currentSong === 0) ? true : false} onClick={() => { this.changeSong(-1) }}>Previous</button>
        <button type="button" disabled={(this.state.currentSong >= this.state.songs.length - 1) ? true : false} onClick={() => { this.changeSong(+1) }}>Next</button><br />

        <h4>Currently playing: {this.state.songs[this.state.currentSong].title}</h4>
        <hr />

        <Route exact path="/" render={(state) => <SongsList songs={this.state.songs} {...state} playSong={this.playSong} />} />
        <Route path='/:songId' render={(state) => <SongDetails songs={this.state.songs} {...state} playSong={this.playSong} />} />

      </div>
        )
    );
  }
}

export default App;
