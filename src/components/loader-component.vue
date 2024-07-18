<script setup lang="ts">
    import { ref } from 'vue';

    const loader = ref<HTMLDivElement | null>(null);
    function hide(){
        if(!loader.value) return;
        loader.value.classList.add('hide');
    }

    function show(){
        if (!loader.value) return;
        loader.value.classList.remove('hide');
    }

    defineExpose({hide, show});
</script>

<template>
    <div class="loader hide" ref="loader"></div>
</template>

<style scoped>

.hide{
    display: none;
}

.loader:not(.hide) {
    animation: rotate 1s linear infinite

}

.loader:not(.hide)::after, .loader:not(.hide)::before{
    animation: prixClipFix 2s linear infinite ;
}

.loader{
    z-index: 1002;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
}
.loader::before , .loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #FFF;
}
.loader::after{
    inset: 8px;
    transform: rotate3d(90, 90, 0, 180deg );
    border-color: #FF3D00;
}

@keyframes rotate {
    0%   {transform: rotate(0deg)}
    100%   {transform: rotate(360deg)}
}

@keyframes prixClipFix {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
}
</style>