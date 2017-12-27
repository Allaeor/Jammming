import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{}],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    let isTrackInPlaylist = false;
    this.state.playlistTracks.map(currentTrack =>{
      if(currentTrack.id === track.id){isTrackInPlaylist = true;};
    });
    if(isTrackInPlaylist === false){
      this.state.playlistTracks.push(track);
    };
  }
  removeTrack(track){
    let playlistUpdate = [];
    playlistUpdate = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: playlistUpdate});
  }
  updatePlaylistName(name){
    this.state.playlistName = name;
  }
  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.forEach(track =>{
      trackURIs.push(track.URI);
    });
    Spotify.savePlaylist(this.state.playlistName,trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
  }
  search(term){
    this.setState({searchResults: Spotify.search(term)});
  }
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
