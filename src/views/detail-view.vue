<script lang="ts" setup>
import VideoPlayer from "../components/video-player.vue";
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
import {
  Episode,
  Language,
  MovieDetails,
  SeriesDetails,
  Subtitle,
} from "../types";
import APIConnector from "../helper/APIConnector";
import episodeComponent from "../components/episode-component.vue";

var data: Ref<MovieDetails | SeriesDetails | null> = ref(null);
const route = useRoute();
const name = route.params.name as string;
const type = route.params.type as string;
const videoPlayer = ref<typeof VideoPlayer | null>(null);
const group = (route.query.group as string) || "";
// load all information about the selected entry

APIConnector.getDetailOf(name, type, group).then((detail) => {
  data.value = detail;
});

/**
 * calls play function in the videoplayer component
 * @param entryID
 * @param episodeID
 */
async function play(languages: Language[], subtitles: Subtitle[]) {
  if (!videoPlayer.value) return;
  console.log(languages, subtitles);
  videoPlayer.value.play(languages, subtitles);
}

/**
 * when the big play button is clicked
 * it plays the first episode of the first season
 * or
 * it plays the movie
 */
function onMainPlayButton() {
  if (!data.value) return;
  switch (type) {
    case "0": // movie
      const movieData = data.value as MovieDetails;
      play(movieData.languages, movieData.subtitles);
      break;
    case "1": // show
      const showData = data.value as SeriesDetails;
      const seasons = Object.values(showData.seasons);
      const firstEpisodePath = seasons[0].episodes[0];
      playEpisode(firstEpisodePath);
      break;
  }
}

function playEpisode(episode: Episode) {
  APIConnector.getEpisode(episode.path).then((episodeData: MovieDetails) => {
    if (!videoPlayer.value) return;
    play(episodeData.languages, episodeData.subtitles);
    videoPlayer.value.setCurrentEpisodeName(episode.name);
  });
}

function onEpisodeStart(path: string, name: string) {
  if (!data.value) return;
  playEpisode({ path, name });
}

function onVideoEnd(
  event: Event & { type: number; currentEpisodeName: string },
) {
  if (!videoPlayer.value) return;
  if (event.type == 0) return; // movie ended
  // episode ended
  playNextEpisode(event.currentEpisodeName);
}

function playNextEpisode(currentEpisodeName: string) {
  if (!data.value) return;
  for (const season in (data.value as SeriesDetails).seasons) {
    const episodes = (data.value as SeriesDetails).seasons[season].episodes;
    for (const episode of episodes) {
      if (episode.name == currentEpisodeName) {
        const nextEpisode = episodes[episodes.indexOf(episode) + 1];
        if (nextEpisode) {
          playEpisode(nextEpisode);
          return;
        }
      }
    }
  }
}
</script>

<template>
  <div id="wrapper">
    <VideoPlayer ref="videoPlayer" id="video" @endVideo="onVideoEnd" />
    <div id="details">
      <div id="header">
        <h1 id="title" :class="route.params.name">{{ route.params.name }}</h1>
        <!-- <p id="duration">1:30h</p> -->
        <!-- <p id="description">{{ data?.detail.description }}</p> -->
      </div>
      <div></div>
      <button
        id="play-btn"
        class="btn focusable"
        tabindex="0"
        @click="onMainPlayButton"
      >
        Play
      </button>
      <div v-if="route.params.type == '1'" id="seasons">
        <div
          v-if="data"
          class="season"
          v-for="(item, index) in (data as SeriesDetails).seasons"
          :key="index"
        >
          <h4 class="season-index">{{ item.seasonNum }}</h4>
          <episodeComponent
            v-for="(episode, index) in item.episodes"
            :key="index"
            :name="episode.name"
            :episodePath="episode.path"
            @startEpisode="onEpisodeStart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* TITLE CLASSES */
.Barbie {
  color: hsl(326, 79%, 55%);
}
/* HUGE  */
@media only screen and (min-width: 1100px) {
  #wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: 100%;
  }

  #details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    max-height: 100%;
  }

  #video {
    flex: 1;
  }

  #seasons {
    overflow-y: scroll;
    height: 100%;
  }
}

/* SMOL */
@media not screen and (min-width: 1100px) {
  #wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    place-items: center;
    column-gap: 10px;
  }

  #details {
    width: 100%;
    padding-top: 20px;
    display: grid;
    place-items: center;
  }
}

#title {
  margin: 5px;
  margin-top: 15px;
  font-weight: 1000;
  font-size: clamp(2.5rem, 2.5vw, 100vw);
}

#description {
  font-size: clamp(1.5rem, 1.5vw, 100vw);
  font-weight: 400;
  color: hsl(0, 0%, 78%);
}

#details {
  text-align: center;
}
#seasons::-webkit-scrollbar {
  width: 5px;
}
#seasons::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 5px;
}

#seasons {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  overflow-y: scroll;

  margin-top: 8px;
}

.season {
  width: 75%;

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.season-index {
  align-self: start;
}

#play-btn {
  background-color: white;
  color: black;

  width: clamp(200px, 10vw, 100vw);
  border-style: none;
  border-radius: 5px;
  padding: 5px;

  font-size: clamp(18px, 1.5vw, 100vw);
  font-weight: 900;
}
</style>
