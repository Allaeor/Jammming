import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

export default class TrackList extends React.Component{
  render(){
    return(
      <div className="TrackList">
        this.props.tracks.map(track => <Track track={this.track} key={this.track.id} /> });
      </div>
    );
  }
}
