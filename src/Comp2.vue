<template>
    <div
        ref="a"
        style="width: 1000px; height: 1000px; background-color: red;"
        @mouseout="log1"
        @mouseleave="log1"
        @mouseover="log1"
        @mouseenter="log1"
        @mousedown="log1"
        @mouseup="log1"
    >
        <div
            ref="b"
            style="width: 500px; height: 500px; background-color: blue;"
            @mouseout="log2"
            @mouseleave="log2"
            @mouseover="log2"
            @mouseenter="log2"
            @mousedown="log2"
            @mouseup="log2"
        ></div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";

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

        const a: Ref<HTMLElement | null> = ref(null);
        const b: Ref<HTMLElement | null> = ref(null);

        return {
            a,
            b,
            images,
            log1: (e: MouseEvent) => console.log(1, e.type, e.target === a.value, e),
            log2: (e: MouseEvent) => console.log(2, e.type, e.target === b.value, e),
        };
    },
};
</script>
