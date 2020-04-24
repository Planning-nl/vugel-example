<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <rectangle
                :h="100"
                :x="20"
                :y="20"
                func-w="w-40"
                :color-left="colorLeft"
                :color-right="colorRight"
                :margin-bottom="20"
            />
            <picture :x="20" :y="140" :color-left="colorLeft" :color-right="colorRight" src="./assets/rotterdam.jpg" />
        </template>
        <template v-slot:form-items>
            <item name="color-left">
                <color-drag-bar :initial-value="0xffff00ff" @change="set_colorLeft" />
            </item>
            <item name="color-right">
                <color-drag-bar :initial-value="0xff00ffff" @change="set_colorRight" />
            </item>
        </template>
    </editor>
</template>

<script lang="ts">
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import ColorDragBar from "./form/ColorDragBar.vue";
import { createChangeHandlers } from "./form/utils";

export default {
    components: { ColorDragBar, Editor, item: FormItem },
    setup() {
        return {
            ...createChangeHandlers(["colorLeft", "colorRight"]),
        };
    },
};
</script>
