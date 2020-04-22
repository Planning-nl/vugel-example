<script lang="ts">
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import DragBar from "./form/DragBar.vue";
import ColorDragBar from "./form/ColorDragBar.vue";
import { createChangeHandlers } from "./form/utils";
import Toggle from "./form/Toggle.vue";

export default {
    components: { ColorDragBar, DragBar, Toggle, Editor, item: FormItem },
    setup() {
        return {
            ...createChangeHandlers([
                "radius",
                "fill",
                "fillColor",
                "strokeWidth",
                "strokeColor",
                "shadowBlur",
                "shadowColor",
            ]),
        };
    },
};
</script>

<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <styled-rectangle
                :x="20"
                :y="20"
                :radius="radius"
                :stroke-width="strokeWidth"
                :stroke-color="strokeColor"
                :fill="fill"
                :fill-color="fillColor"
                :shadow-blur="shadowBlur"
                :shadow-color="shadowColor"
                :flex="true"
                :padding="80"
            >
                <text font-size="50">contents..</text>
            </styled-rectangle>
        </template>
        <template v-slot:form-items>
            <item name="fill">
                <toggle :initial-value="true" @change="set_fill" />
            </item>
            <item name="fill-color" :visible="fill">
                <color-drag-bar :initial-value="0xffff00ff" @change="set_fillColor" />
            </item>
            <item name="radius">
                <drag-bar :initial-value="10" :min="0" :max="80" suffix="px" @change="set_radius" />
            </item>
            <item name="stroke-width">
                <drag-bar :initial-value="4" :min="0" :max="60" suffix="px" @change="set_strokeWidth" />
            </item>
            <item name="stroke-color">
                <color-drag-bar :initial-value="0xffffffff" @change="set_strokeColor" />
            </item>
            <item name="shadow-blur">
                <drag-bar :initial-value="10" :min="0" :max="50" suffix="px" @change="set_shadowBlur" />
            </item>
            <item name="shadow-color">
                <color-drag-bar :initial-value="0xffffffff" @change="set_shadowColor" />
            </item>
        </template>
    </editor>
</template>
