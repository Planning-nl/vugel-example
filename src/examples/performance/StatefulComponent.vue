<template compiler="vugel">
    <rectangle :color="color" :w="width" :h="height" :x="x" :y="y"></rectangle>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
    props: {
        color: { type: Number, default: 0xffffffff },
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    },

    setup() {
        const width = ref(100 * Math.random());
        const height = ref(100 * Math.random());
        return {
            width,
            height,
        };
    },
};
</script>
