export default class SubtitleManager{

    public static async getSubtitlesForMovie(movieID: number){
        const resp = await fetch("http://localhost:8000/subtitles-movie/"+movieID);
        const data = await resp.json();
        return data; 
    }

    public static async getSubtitlesForEpisode(episodeID: number){
        const resp = await fetch("http://localhost:8000/subtitles-episode/"+episodeID);
        const data = await resp.json();
        return data; 
    }

    public static loadBasedOnTypeAndID(type: string, movieID: number | null, episodeID: number | null){
        switch (type){
            case "0":
                return SubtitleManager.getSubtitlesForMovie(movieID as number);
            case "1":
                return SubtitleManager.getSubtitlesForEpisode(episodeID as number);
        }
    }
}