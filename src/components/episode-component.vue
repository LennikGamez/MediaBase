<script setup lang="ts">
import { onMounted, ref } from "vue";
import APIConnector from "../helper/APIConnector";

const props = defineProps({
  episodePath: String,
  name: String,
});
const emit = defineEmits(["startEpisode"]);

const description = ref("");
onMounted(() => {
  APIConnector.getEpisodeDescription(props.episodePath as string).then(
    (data) => {
      console.log(data);
      description.value = data;
    },
  );
});

function startEpisode() {
  emit("startEpisode", props.episodePath, props.name);
}
</script>

<template>
  <div id="wrapper" @click="startEpisode">
    <span id="name">{{ props.name }}</span>
    <span id="description">{{ description }}</span>
  </div>
</template>

<style scoped>
#wrapper {
  width: 75%;
  color: black;
  display: grid;
  place-items: center;
  text-align: center;
  grid-template-columns: 0.1fr 1fr;
  grid-template-rows: 1fr 1fr;

  background-color: gray;
  border-radius: 8px;
  width: 75%;
  padding: 10px;
}
</style>
