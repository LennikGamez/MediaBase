<script setup lang="ts">

    const props = defineProps({
        languages: Array<String>
    });

    const emit = defineEmits(['setSubtitle']);

    function setSubtitle(lang: String, button: HTMLButtonElement){       
        emit('setSubtitle', lang);
        button.blur();
    }
</script>


<template>
    <div class="subtitle-popover">
        <button class="option" v-if="props.languages" v-for="(item, index) in props.languages" :key="index" @click="setSubtitle(item,  ($event.target as HTMLButtonElement))">
            {{ item }} [SUB]
        </button>
    </div>
</template>


<style scoped>

    .subtitle-popover{
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