<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <container func-w="w" func-h="h" @mousedown="start" @mousemove="move" @mouseup="end" @mouseleave="end">
                <rectangle :x="100" :y="100" :w="300" :h="300" :color="0xffffffff" :clipping="clipping">
                    <picture ref="dragTarget" src="./assets/rotterdam.jpg" :x="-100" :y="-100" />
                </rectangle>
                <text :x="100" :y="420" :color="0xffffffff" :font-size="14" :pointer-events="false"
                    >drag and drop the logo to test clipping</text
                >
            </container>
        </template>
        <template v-slot:form-items>
            <item name="clipping">
                <toggle :initial-value="true" @change="set_clipping" />
            </item>
        </template>
    </editor>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import { VugelMouseEvent, Node } from "vugel";
import Editor from "./form/Editor.vue";
import { createChangeHandlers } from "./form/utils";
import Toggle from "./form/Toggle.vue";
import FormItem from "./form/FormItem.vue";

export default {
    components: { Editor, Toggle, item: FormItem },
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

                // Do not scroll on mobile.
                e.originalEvent.preventDefault();
            }
        };

        const end = (e: VugelMouseEvent) => {
            startEvent = null;
        };

        return {
            start,
            move,
            end,
            dragTarget,
            ...createChangeHandlers(["clipping"]),
        };
    },
};
</script>
