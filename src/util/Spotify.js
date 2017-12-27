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
    const acsToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response =>{
      return response.json();
    }
  ).then(jsonResponse =>{
    if(!jsonResponse.tracks){return [];};
    return jsonResponse.tracks.items.map(track =>{
      let thisTrack = {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      };
      return thisTrack;
    });
  });
},
  savePlaylist(playlistName,trackURIs){
    if(!playlistName || !trackURIs){return;};
    const acsToken = Spotify.getAccessToken();
    const headers = {headers: {Authorization: `Bearer ${accessToken}`}};
    let userId = '';
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
  ).then(response => response.json()
  ).then(jsonResponse =>{
    userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
      });
  });
}
}

export default Spotify;
