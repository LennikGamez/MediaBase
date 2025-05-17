
type Artwork = {
  src: string,
  sizes: string,
  type: string
};

function mediasessionsAvailable(): boolean{
  return "mediaSession" in navigator;
}

function setMetaData(title: string, artist: string, album: string, artworks: Array<Artwork>){
  navigator.mediaSession.metadata = new MediaMetadata({
    title: title,
    artist: artist,
    album: album,
    artwork: artworks 
  })
}

function setPositionState(duration: number, currentTime: number, playbackRate: number){
  navigator.mediaSession.setPositionState({
     duration,
     playbackRate,
     position: currentTime
  })
}

function registerActionHandler(action: MediaSessionAction, func: MediaSessionActionHandler){
  navigator.mediaSession.setActionHandler(action, func);
}

export {mediasessionsAvailable, setMetaData, registerActionHandler, setPositionState}
