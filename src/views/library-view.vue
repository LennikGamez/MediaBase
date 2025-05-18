<script setup lang="ts">
import MediaComponent from "../components/media-component.vue";
import { Media } from "../types";
import { ref } from "vue";

const media = ref(Array<Media>());
const searchInput = ref("");
function fetchMedia() {
  fetch("http://192.168.178.120:8000/media")
    .then((res) => res.json())
    .then((data) => (media.value = data));
}

fetchMedia();

function stringIncludes(a: string, b: string) {
  // splits  string into array and checks if each word is included in the other string
  return a.split(" ").every((word) => b.includes(word));
}
</script>

<template>
  <div class="grid">
    <nav>
      <h1>Library</h1>
      <input
        id="searchbar"
        type="etxt"
        placeholder="Search.."
        v-model="searchInput"
      />
    </nav>
    <div id="library-container">
      <MediaComponent
        v-for="m in media.filter((m) =>
          stringIncludes(searchInput.toLowerCase(), m.name.toLowerCase()),
        )"
        :key="m.name"
        :data="m"
      />
    </div>
  </div>
</template>

<style scoped>
nav {
  z-index: 1000;
  position: fixed;
  top: 0px;
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.943);
  width: 100%;
  height: 7rem;
  background-color: var(--bg-color);
}

#library-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.7rem;
  place-items: center;
  margin: calc(7rem + 16px) 10vw;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

#library-container::-webkit-scrollbar {
  display: none;
}
</style>
