<template compiler="vugel">
    <rect color="0xff00ffff" w="2000" h="2000" @click="log1">
        <rect color="0xff008000" w="1000" h="1000" @click="log2" @mousemove="log2"> </rect>
    </rect>
    <node :scale="prop">
        <rect
            v-for="(item, index) in images"
            :x="item.x"
            :w="item.w"
            :y="index * 40"
            :h="20"
            :color="0xff00ffff"
            @click="log1"
        ></rect>
    </node>
</template>

<script lang="ts">
import { ref } from "vue";

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
            log1: (e: Event) => console.log(1, e),
            log2: (e: Event) => {
                e.cancelBubble = false;
                console.log(2, e);
            },
        };
    },
};
</script>
