<script setup lang="ts">
import { inject, Ref, ref } from 'vue';


const availableLanguages = defineProps({
    availableLangs: Array<String>
});


const popover = ref<HTMLDivElement | null>(null);
const option = ref<HTMLDivElement[]>([]);
const preferredWatchLanguage = inject('preferredWatchLanguage') as Ref;

function toggleVisibility(){    
    if (!popover.value) return;
    popover.value.classList.toggle('hidden');
}

function changeLanguage(lang: String){    
    if (!popover.value) return;
    popover.value.classList.add('hidden');
    preferredWatchLanguage.value = lang;
    emit('changeLanguage', lang);
}
const emit = defineEmits(['changeLanguage']);
defineExpose({toggleVisibility});
</script>

<template>
    <div class="language-popover hidden" ref="popover">
        <div v-if="availableLangs?.length == 0" class="option">No languages available</div>
        <div class="option" v-for="(item, index) in availableLangs" :key="index" @click="changeLanguage(item)">{{ item }}</div>
    </div>
</template>


<style lang="css" scoped>
    .language-popover{
        z-index: 101;
        position: absolute;
        bottom: 100%;
        right: 0;
        width: fit-content;
        height: fit-content;

        border-radius: 8px;
        padding: 0;
        background-color: hsl(0, 0%, 90%);
        color: black;    
    }

    .hidden{
        display: none;
    }

    .option{
        border-radius: 8px;
        padding-block: 8px;
        padding-inline: 16px;
        &:hover{
            background-color: hsl(0, 0%, 80%);
            cursor: pointer;
        }
    }
</style>