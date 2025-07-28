<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import chapterComponent from "../components/chapter-component.vue";
import { AudioDetails } from "../types";
import APIConnector from "../helper/APIConnector";

const posterPath = ref("");
const audioSrc = ref("");
const audioElement = ref<HTMLAudioElement | null>(null);
const route = useRoute();
const group = (route.query.group as string) || "";

const data: Ref<AudioDetails> = ref({ audioFiles: [] });

async function playNextChapter() {
  if (!audioElement.value) return;
  const currentIndex = data.value.audioFiles.findIndex((str: string) =>
    audioSrc.value.includes(str),
  );
  if (currentIndex >= data.value.audioFiles.length) {
    return;
  }
  streamAudio(data.value.audioFiles[currentIndex + 1]);

  await audioElement.value.load();
  await audioElement.value.play();
}

async function loadChapter(path: string) {
  streamAudio(path);

  await audioElement.value?.pause();
  await audioElement.value?.load();
  await audioElement.value?.play();
}

function fetchData() {
  APIConnector.getDetailOf(route.params.name as string, "2", group)
    .then((d) => (data.value = d)) // set data
    .then(() => streamAudio(data.value.audioFiles[0])); // set first chapter
}

function streamAudio(audioPath: string) {
  audioSrc.value = APIConnector.getStreamEndpoint(audioPath);
}

fetchData();

onMounted(() => {
  const name = route.params.name as string;
  posterPath.value = APIConnector.getPosterURL(name, 2, group);
});
</script>

<template>
  <div class="wrapper">
    <img id="album-art" :src="posterPath" />
    <h1>{{ route.params.name }}</h1>
    <audio
      :src="audioSrc"
      controls
      @ended="playNextChapter"
      ref="audioElement"
    ></audio>
  </div>

  <div class="chapters">
    <chapterComponent
      v-for="(item, index) in (data as AudioDetails).audioFiles"
      :key="index"
      :num="index"
      :name="item"
      :path="item"
      @startChapter="loadChapter"
    />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

#album-art {
  width: 300px;
  border-radius: 16px;
}
</style>
