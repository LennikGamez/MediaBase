export type LibraryFilter = {
  group: string,
  groupType: number
}

export default class APIConnector {
  public static IP_ADDRESS: string = "http://192.168.178.83:3000";

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
  public static getPosterURL(name: string, type: string | number, group: string | undefined){
    if (group){
      return this.getEndpointURL(`/poster/${name}/${type}?group=${group}`);
    }
    return this.getEndpointURL(`/poster/${name}/${type}`)
  }
  
  // library view
  public static async getLibraryData(options?: LibraryFilter){
    if(options && options.group && options.groupType >= 0){
      return await this.fetchEndpoint(`/library?group=${options.group}&grouptype=${options.groupType}`)
    }
    return await this.fetchEndpoint("/library");
  } 

  // detail view
  public static async getDetailOf(name: string, type: string, group: string = ""){
    const path = group + "/" + name;
    switch(type){
      case "0":
        return await this.fetchEndpoint(`/movie/${path}`);
      case "1":
        return await this.fetchEndpoint(`/series/${path}`);
      case "2":
        return await this.fetchEndpoint(`/audio/${path}`);
      default:
        break
    }
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
  public static getStreamEndpoint(filePath: string){
    return this.getEndpointURL(`/stream?file=${filePath}`)
  }

  // subitile manager
  public static async getSubtitle(path: string){
    return await this.fetchEndpoint("/subtitle?file="+path)
  }
  public static async getSubtitlesForEpisode(episodeID: number){
    return await this.fetchEndpoint("/subtitles-episode/"+episodeID);
  }


  public static async getEpisode(episodePath: string){
    return await this.fetchEndpoint("/episode?dir=" + episodePath);
  }
}
