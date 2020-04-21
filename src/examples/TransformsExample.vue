<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <picture
                src="./assets/rotterdam.jpg"
                :scale-x="scalex"
                :scale-y="scaley"
                :pivot-x="pivotx"
                :pivot-y="pivoty"
                :x="x"
                :y="y"
                :rotation="rotation"
            />
        </template>
        <template v-slot:form-items>
            <item name="x">
                <drag-bar :max="800" suffix="px" @change="set_x" />
            </item>
            <item name="y">
                <drag-bar :max="800" suffix="px" @change="set_y" />
            </item>
            <item name="scalex">
                <drag-bar :initial-value="1" :max="4" @change="set_scalex" />
            </item>
            <item name="scaley">
                <drag-bar :initial-value="1" :max="4" @change="set_scaley" />
            </item>
            <item name="pivotx">
                <drag-bar :initial-value="0.5" @change="set_pivotx" />
            </item>
            <item name="pivoty">
                <drag-bar :initial-value="0.5" @change="set_pivoty" />
            </item>
            <item name="rotation">
                <drag-bar :max="2 * Math.PI" suffix="rad" @change="set_rotation" />
            </item>
        </template>
    </editor>
</template>

<script lang="ts">
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import DragBar from "./form/DragBar.vue";
import { createChangeHandlers } from "./form/utils";

export default {
    components: { Editor, item: FormItem, DragBar },
    setup() {
        return {
            ...createChangeHandlers(["x", "y", "scalex", "scaley", "pivotx", "pivoty", "rotation"]),
        };
    },
};
</script>
