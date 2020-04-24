<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <picture src="./assets/rotterdam.jpg" :mount-x="mountx" :mount-y="mounty" func-x="x" func-y="y" func-w="w" func-h="h" />
        </template>
        <template v-slot:form-items>
            <item name="x">
                <drag-bar :max="800" suffix="px" @change="set_x" />
            </item>
            <item name="y">
                <drag-bar :max="800" suffix="px" @change="set_y" />
            </item>
            <item name="w">
                <drag-bar :max="800" suffix="px" @change="set_w" />
            </item>
            <item name="h">
                <drag-bar :max="800" suffix="px" @change="set_h" />
            </item>
            <item name="mount-x">
                <drag-bar suffix="px" @change="set_mountx" />
            </item>
            <item name="mount-y">
                <drag-bar suffix="px" @change="set_mounty" />
            </item>
        </template>
    </editor>
</template>

<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { createChangeHandlers } from "./form/utils";

export default {
    components: { DragBar, Editor, item: FormItem },
    setup() {
        return {
            ...createChangeHandlers(["x", "y", "mountx", "mounty", "w", "h"]),
        };
    },
};
</script>
