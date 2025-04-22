
type Artwork = {
  src: string,
  sizes: string,
  type: string
};

function mediasessionsAvailable(): boolean{
  return "mediaSession" in navigator;
}

function setMetaData(title: string, artist: string, album: string, artworks: Array<Artwork>): void{
  navigator.mediaSession.metadata = new MediaMetadata({
    title: title,
    artist: artist,
    album: album,
    artwork: artworks 
  })
}

function registerActionHandler(action: MediaSessionAction, func: MediaSessionActionHandler){
  navigator.mediaSession.setActionHandler(action, func);
}

export {mediasessionsAvailable, setMetaData, registerActionHandler}
