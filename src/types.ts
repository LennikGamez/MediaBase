
export type Media = {
    name: string,
    entryID: number,
    type: number
}

export type Detail = {
    detail: {
        name: string,
        entryID: number,
        description: string,
        posterPath: string,
        type: number // 0 = movie, 1 = show
    }
}

export type MovieDetail = Detail & {
    movieID: number
}

export type Episode = {
    episodeID: number,
    name: string
    description: string
    season: number
}

export type DetailShow = Detail & {
    seasons: {
        [key: number]: Episode[]
    }
}

export type DetailMovie = MovieDetail & {
    movieData: {
        videoID: number,
        videoPath: string,
        language: string,
        movieID: number,
        episodeID: number | null
    }
}