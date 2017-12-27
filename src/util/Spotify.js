const clientID = '54e09490460b4a06b3027a05c80cd678';
const redirectURI = 'http://localhost:3000/';

let accessToken = null;

let Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    };
    if(window.location.href.match(/expires_in=([^&]*)/) && window.location.href.match(/access_token=([^&]*)/)){
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      let expiresIn = Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    if(!accessToken && !window.location.href.match(/access_token=([^&]*)/))/*I'm aware that this code is redundant*/{
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term){
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response =>{
      if(response.ok){
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse =>{
    if(!jsonResponse.tracks){return [];};
    return jsonResponse.tracks.items.map(track =>{
      let thisTrack = {
        id: track.id,
        name: track.name,
        artist: track.artist[0].name,
        album: track.album.name,
        uri: track.uri
      };
      return thisTrack;
    });
  });
  }
};

export default Spotify;
