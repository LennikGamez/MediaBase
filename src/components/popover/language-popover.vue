<script setup lang="ts">
import { inject, Ref, ref } from 'vue';


const props = defineProps({
    availableLangs: Array<String>
});
const emit = defineEmits(['changeLanguage']);

const popover = ref<HTMLDivElement | null>(null);
const preferredWatchLanguage = inject('preferredWatchLanguage') as Ref;



function changeLanguage(lang: String, button: HTMLButtonElement){    
    if (!popover.value) return;
    popover.value.classList.add('hidden');
    preferredWatchLanguage.value = lang;
    emit('changeLanguage', lang);
    button.blur();
}

</script>

<template>
    <div class="language-popover" ref="popover">
        <div v-if="props.availableLangs?.length == 0" class="option">No languages available</div>
        <button class="option" v-for="(item, index) in props.availableLangs" :key="index" @click="changeLanguage(item, $event.target as HTMLButtonElement)">{{ item }}</button>
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
    }

    .option{
        color: black;    
        border-radius: 8px;
        padding-block: 8px;
        padding-inline: 16px;
        background-color: transparent;
        outline: none;
        border: none;
        &:hover{
            background-color: hsl(0, 0%, 80%);
            cursor: pointer;
        }
    }

    .option:not(:last-child){
        border-bottom: 1px solid hsl(0, 0%, 80%);
    }
</style>