<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import { Media } from '../types';
    import { ref } from 'vue';
    import APIConnector from '../helper/APIConnector'; 

    const router = useRouter();
    const props = defineProps({
        data: {
            type: Object as () => Media,
            required: true
        }
    });

    const posterLink = ref(APIConnector.getPosterPathByPosterPath(props.data.poster));

    const wrapper = ref(HTMLDivElement)

    function rerouteToDetails(){
        console.log("reroute to details of " + props.data.name);
        switch (props.data.type) {
            case 0:
            case 1:
                router.push({path: "/detail/" + props.data.name+ "/" + props.data.type});
                break;
            case 2:
                router.push({path: "/audio/" + props.data.name});
                break;

        }
    }

</script>

<template>
  <div class="media" ref="wrapper" @click="rerouteToDetails">
    <img :src="posterLink" loading="lazy" class="skeleton" />
    <h4 class="title">{{ props.data.name }}</h4>
  </div>
</template>

<style scoped>
.media {
  --hover-shadow: 0%;
  --default-shadow: 60%;
  --border-radius: 8px;
  --hover-speed: 0.7s;

  max-width: 400px;
  width: 100%;
  padding-bottom: min(
    150%,
    600px
  ); /* aspect-ratio is not supported on webOS TV :C */
  position: relative;
  overflow-wrap: word;
  z-index: 100;
  transition:
    transform var(--hover-speed),
    -webkit-box-shadow var(--hover-speed) ease-in-out;
}

img {
  display: block;
  border-radius: var(--border-radius);
  object-fit: cover;
  opacity: 1;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* also aspect-ratio replacement */
}

.title {
  position: absolute;
  bottom: 0;
  max-width: 100%;

  color: white;
  position: absolute;
  bottom: 0;
  padding: 5px;
  margin: 10px;
  font-size: 1.5rem;
  pointer-events: none;

  z-index: 501;
}

@media (hover: hover) {
  /* only on devices without touchscreen */
  .media:hover {
    --shadow-color: rgba(121, 9, 74, 1);
    transform: scale(1.3);
    z-index: 101;

    box-shadow: 0px 10px 44px 16px var(--shadow-color);
    -moz-box-shadow: 0px 10px 44px 16px var(--shadow-color);
    -webkit-box-shadow: 0px 10px 44px 16px var(--shadow-color);
    border-radius: var(--border-radius);
  }
}

.media::before {
  content: "";
  border-radius: var(--border-radius);
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  z-index: 500;

  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0) var(--default-shadow),
    rgba(0, 0, 0, 1) 100%
  );
  background: linear-gradient(
    top,
    rgba(255, 255, 255, 0) var(--default-shadow),
    rgba(0, 0, 0, 1) 10%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) var(--default-shadow),
    rgba(0, 0, 0, 1) 100%
  );
  opacity: 0.8;

  transition: opacity 0.5s;
}

.media:hover::before {
  opacity: 1;
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0) var(--hover-shadow),
    rgba(0, 0, 0, 1) 100%
  );
  background: linear-gradient(
    top,
    rgba(255, 255, 255, 0) var(--hover-shadow),
    rgba(0, 0, 0, 1) 10%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) var(--hover-shadow),
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
