
export type Media = {
    name: string,
    type: number
}


export type Language = {
    language: string,
    path: string
}
export type Subtitle = Language;

export type MovieDetails = {
    languages: Language[],
    subtitles: Language[],
    posterPath: string
}

export type Season ={
    seasonNum: number,
    episodes: Episode[]
}
export type Episode = {
    name: string,
    path: string
}
export type SeriesDetails = {
    seasons: Season[]    
}

export type AudioDetails = {
    audioFiles: string[]
}
