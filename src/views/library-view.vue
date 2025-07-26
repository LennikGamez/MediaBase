<script setup lang="ts">
import MediaComponent from "../components/media-component.vue";
import { Media } from "../types";
import { computed, ref, watch } from "vue";
import APIConnector from "../helper/APIConnector";
import { useRoute } from "vue-router";

const route = useRoute();
const media = ref(Array<Media>());
const searchInput = ref("");


function fetchMedia() {
  const group = route.query.group as string;
  const groupType = parseInt(route.query.grouptype as string);
  // group url parsing
  if (group && groupType >= 0) {
    APIConnector.getLibraryData({ group, groupType }).then(
      (data) => (media.value = data),
    );
    return;
  }
  // library without any groups specified
  APIConnector.getLibraryData().then((data) => (media.value = data));
}

watch(() => route.query, fetchMedia);
fetchMedia();

function stringIncludes(a: string, b: string) {
  // splits  string into array and checks if each word is included in the other string
  return a.split(" ").every((word) => b.includes(word));
}

const filteredMediaItems = computed(() => {
  return media.value.filter((m) =>
    stringIncludes(searchInput.value.toLowerCase(), m.name.toLowerCase()),
  );
});
</script>

<template>
  <div class="grid">
    <nav>
      <h1>MediaBase</h1>
      <input
        id="searchbar"
        type="etxt"
        placeholder="Search.."
        v-model="searchInput"
      />
    </nav>
    <div id="library-container">
      <h4 v-if="filteredMediaItems.length == 0">Nothing here...</h4>
      <MediaComponent v-for="m in filteredMediaItems" :key="m.name" :data="m" />
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

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
}

#searchbar {
  outline: none;
  border: none;

  padding: 8px 16px;
  border-radius: 8px;
  width: 200px;

  transition: width 1s;
}

#searchbar:focus {
  width: 500px;
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
