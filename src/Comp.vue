<template compiler="vugel">
    <rectangle color="0xff00ffff" w="2000" h="2000">
        <rectangle color="0xff008000" w="1000" h="1000" @mousedown="log2" @mouseup="log2" @mousemove="log2"> </rectangle>
    </rectangle>
    <container :scale="prop">
        <rectangle
            v-for="(item, index) in images"
            :x="item.x"
            :w="item.w"
            :y="index * 40"
            :h="20"
            :color="0xff00ffff"
            @click="log1"
        ></rectangle>
    </container>
</template>

<script lang="ts">
import { ref } from "vue";
import { VugelMouseEvent } from "vugel";

export default {
    props: {
        prop: { type: Number, default: 1 },
    },
    setup: (props: any) => {
        const images = ref([
            { x: 0, w: 400 },
            { x: 0, w: 800 },
            { x: 0, w: 400 },
        ]);
        return {
            images,
            log1: (e: VugelMouseEvent) => console.log(1, e),
            log2: (e: VugelMouseEvent) => {
                e.cancelBubble = false;
                console.log(2, e);
            },
        };
    },
};
</script>
