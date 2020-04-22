<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <container>
                <picture src="./assets/rotterdam.jpg" :alpha="alpha" :visible="visible" />
            </container>
        </template>
        <template v-slot:form-items>
            <item name="visible">
                <toggle :initial-value="true" @change="set_visible" />
            </item>
            <item name="alpha">
                <drag-bar :initial-value="1" @change="set_alpha" />
            </item>
        </template>
    </editor>
</template>

<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { createChangeHandlers } from "./form/utils";
import Toggle from "./form/Toggle.vue";

export default {
    components: { DragBar, Toggle, Editor, item: FormItem },
    setup() {
        return {
            ...createChangeHandlers(["alpha", "visible"]),
        };
    },
};
</script>
