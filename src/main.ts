import LibraryView from "./views/library-view.vue";
import DetailView from "./views/detail-view.vue";
import audioView from "./views/audio-view.vue";

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: "/", component: LibraryView },
    { path: "/audio/:entryID", component: audioView },
    { path: "/detail/:entryID/:type", component: DetailView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
