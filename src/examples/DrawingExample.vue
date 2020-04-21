<script lang="ts">
import { ref, watch, Ref } from "vue";
import { DrawingFunctionOptions } from "tree2d/lib/textures/DrawingTexture";
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { createChangeHandlers } from "./form/utils";
import { Drawing } from "vugel";

export default {
    components: { DragBar, Editor, item: FormItem },
    setup() {
        const handlers = createChangeHandlers(["gradient", "w", "h"]);

        const drawing: Ref<Drawing | null> = ref(null);

        // Make sure that the drawing is updated after a change.
        watch(handlers.gradient, () => {
            if (drawing.value) {
                drawing.value.update();
            }
        });

        return {
            drawing,
            draw(info: DrawingFunctionOptions) {
                const ctx = info.context;
                ctx.beginPath();
                const rectangle = new Path2D();
                rectangle.rect(0, 0, info.w, info.h);

                const gradient = ctx.createLinearGradient(0, 0, handlers.gradient.value, 0);
                gradient.addColorStop(0, "magenta");
                gradient.addColorStop(0.5, "blue");
                gradient.addColorStop(1.0, "red");

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 20;
                ctx.stroke(rectangle);
                return {};
            },
            ...handlers,
        };
    },
};
</script>

<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <drawing ref="drawing" :w="w" :h="h" @draw="draw" />
        </template>
        <template v-slot:form-items>
            <item name="w">
                <drag-bar :initial-value="100" :max="600" suffix="px" @change="set_w" />
            </item>
            <item name="h">
                <drag-bar :initial-value="100" :max="600" suffix="px" @change="set_h" />
            </item>
            <item name="x">
                <drag-bar :initial-value="170" :max="300" suffix="px" @change="set_gradient" />
            </item>
        </template>
    </editor>
</template>
