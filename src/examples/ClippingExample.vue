<template compiler="vugel">
    <rectangle w="w" h="h" :color="0xff000000" @mousedown="start" @mousemove="move" @mouseup="end" @mouseleave="end">
        <rectangle :x="100" :y="100" :w="300" :h="300" :color="0xffffffff" :clipping="clipping">
            <picture ref="dragTarget" src="./assets/logo.png" :x="-10" :y="100" />
        </rectangle>
        <text :x="100" :y="420" :color="0xffffffff" :font-size="14">drag and drop the logo to test clipping</text>
        <text :x="100" :y="440" :color="0xffffffff" :font-size="14" @click="changeClipping">clipping: {{ clipping }} (click to toggle)</text>
    </rectangle>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import { VugelMouseEvent, Node } from "vugel";

export default {
    setup() {
        const dragTarget: Ref<Node | null> = ref(null);

        let startEvent: VugelMouseEvent | null = null;
        let startX = 0;
        let startY = 0;
        const start = (e: VugelMouseEvent) => {
            if (dragTarget.value) {
                startEvent = e;

                // As Vugel doesn't expose the properties, we refer directly to the element.
                startX = dragTarget.value.el.x as number;
                startY = dragTarget.value.el.y as number;
            }
        };

        const move = (e: VugelMouseEvent) => {
            if (startEvent) {
                const deltaX = e.canvasOffsetX - startEvent.canvasOffsetX;
                const deltaY = e.canvasOffsetY - startEvent.canvasOffsetY;
                dragTarget.value!.x = startX + deltaX;
                dragTarget.value!.y = startY + deltaY;
            }
        };

        const end = (e: VugelMouseEvent) => {
            startEvent = null;
        };

        const clipping = ref(true);
        return {
            start,
            move,
            end,
            dragTarget,
            clipping,
            changeClipping: () => {
                clipping.value = !clipping.value;
            },
        };
    },
};
</script>
