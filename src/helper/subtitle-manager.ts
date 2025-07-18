import { Subtitle } from "../types";
import APIConnector from "./APIConnector";
export default class SubtitleManager{

    public static async loadSubtitles(subs: Subtitle[]){
        const subPromises = subs.map(async (sub)=>{
            return await APIConnector.getSubtitle(sub.path);
        })

        const subtitles = await Promise.all(subPromises);
        return subtitles;
    }
}
