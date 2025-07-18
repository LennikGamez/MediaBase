
export default class APIConnector {
  public static IP_ADDRESS: string = "http://192.168.178.194:3000";

  private static async fetchEndpoint(endpoint: string){
    const response = await fetch(
      this.IP_ADDRESS + endpoint 
    );
    return await response.json();
  }
  public static getEndpointURL(endpoint: string){
    return this.IP_ADDRESS + endpoint;
  }

  // general
  public static getPosterPathByPosterPath(posterPath: string){
    return this.IP_ADDRESS + `/poster?file=${posterPath}`
  }
  
  // library view
  public static async getLibraryData(){
    return await this.fetchEndpoint("/library");
  } 

  // detail view
  public static async getDetailOf(entryID: string, type: string){
    return await this.fetchEndpoint(`/detail/${entryID}/${type}`);
  }
  public static async getAvailableLanguagesByEntryID(entryID: number){
    return await this.fetchEndpoint(`/available-languages/${entryID}`);
  }
  public static async getAvailableLanguagesByEpisodeID(entryID: number, episodeID: number){
    return await this.fetchEndpoint(`/available-languages/${entryID}/${episodeID}`);
  }

  // audio view
  public static getAudioStreamEndpoint(){
    return this.IP_ADDRESS + "/stream-audio";
  }


  // video player component
  public static getStreamEndpoint(entryID: string, language: string){
    return this.getEndpointURL(`/stream/${entryID}/${language}`)
  }
  public static getStreamEndpointForEpisode(entryID: string, episodeID: string, language: string){
    return this.getEndpointURL(`/stream/show/${entryID}/episode/${episodeID}/${language}`)
  }

  // subitile manager
  public static async getSubtitlesForMovie(movieID: number){
    return await this.fetchEndpoint("/subtitles-movie/"+movieID)
  }
  public static async getSubtitlesForEpisode(episodeID: number){
    return await this.fetchEndpoint("/subtitles-episode/"+episodeID);
  }
}
