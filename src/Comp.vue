<template compiler="vugel">
    <rectangle
        ref="a"
        color="0xff00ffff"
        w="1000"
        h="1000"
        @mouseout="log1"
        @mouseleave="log1"
        @mouseover="log1"
        @mouseenter="log1"
        @mousedown="log1"
        @mouseup="log1"
    >
        <rectangle
            ref="b"
            color="0xff008000"
            w="500"
            h="500"
            @mouseout="log2"
            @mouseleave="log2"
            @mouseover="log2"
            @mouseenter="log2"
            @mousedown="log2"
            @mouseup="log2"
        >
        </rectangle>
    </rectangle>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from "vue";
import { VugelMouseEvent, Rectangle } from "vugel";

export default defineComponent({
    props: {
        prop: { type: Number, default: 1 },
    },
    setup: (props, context) => {
        const images = ref([
            { x: 0, w: 400 },
            { x: 0, w: 800 },
            { x: 0, w: 400 },
        ]);

        const a: Ref<Rectangle | null> = ref(null);
        const b: Ref<Rectangle | null> = ref(null);

        return {
            a,
            b,
            images,
            log1: (e: VugelMouseEvent) => console.log(3, e.type, a.value?.el.color === e.target?.el.color, e),
            log2: (e: VugelMouseEvent) => console.log(4, e.type, b.value?.el.color === e.target?.el.color, e),
        };
    },
});
</script>
