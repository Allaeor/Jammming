import React from 'react';
import './Track.css';

export default class Track extends React.Component{
  renderAction(){
    if(this.props.isRemoval){
      return <a className='Track-action'>-</a>;
    }else{
      return <a className='Track-action'>+</a>;
    }
  }
  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        this.renderAction();
      </div>
    );
  }
}
