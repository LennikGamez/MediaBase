import APIConnector from "./APIConnector";
export default class SubtitleManager{

    public static loadBasedOnTypeAndID(type: string, movieID: number | null, episodeID: number | null){
        switch (type){
            case "0":
                return APIConnector.getSubtitlesForMovie(movieID as number);
            case "1":
                return APIConnector.getSubtitlesForEpisode(episodeID as number);
        }
    }
}
