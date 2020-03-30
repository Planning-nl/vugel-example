<template compiler="vugel">
    <node :scale="prop">
        <!--        <rect v-for="(item,index) in images" :x="item.x" :w="item.w" :y="index * 40" :h="20" :color="0xff00ffff">-->
        <!--        </rect>-->
        <image src="./src/logo.png"></image>
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
        return { images };
    },
};
</script>
