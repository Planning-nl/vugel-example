<template compiler="vugel">
    <container>
        <!-- create a wrapper that listen to clicks, even when the text is invisible -->
        <text
            :color="0xff000000"
            :font-size="30"
            :font-weight="900"
            font-style="italic"
            font-face="Serif"
            :visible="currentVisible"
        >
            hello world
        </text>
        <text :color="0xff000000" :font-size="14" :y="40" @click="changeVisible">click here to toggle visibility</text>

        <picture src="./assets/logo.png" :alpha="currentAlpha" :y="100" @mousemove="changeAlpha" />
        <text :color="0xff000000" :font-size="14" :y="200">mouse mouse from left to right over the picture to change alpha</text>
    </container>
</template>

<script lang="ts">
import { ref } from "vue";
import { VugelMouseEvent } from "vugel";

export default {
    setup() {
        const currentVisible = ref(true);
        const currentAlpha = ref(1);
        return {
            currentVisible,
            currentAlpha,
            changeVisible: () => {
                currentVisible.value = !currentVisible.value;
            },
            changeAlpha: (e: VugelMouseEvent) => {
                const amount = e.elementOffsetX / e.target!.el.renderWidth;
                currentAlpha.value = amount;
            },
        };
    },
};
</script>
