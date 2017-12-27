import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {term: null};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  search(){
    this.props.onSearch(this.state.term);
  }
  handleTermChange(e){
    this.setState({term: e.target.value});
  }
  handleKeyPress(e){
    if(e.charCode==13){
      this.search();
    }
  }
  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}
