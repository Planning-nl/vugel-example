<template>
    <h1>Vugel examples</h1>

    <div style="display: flex; flex-wrap: wrap; align-items: flex-start; height: 90%;">
        <div style="flex-shrink: 0; margin: 10px;">
            <div v-for="e in examples">
                <input :id="e.name" v-model="example" type="radio" :value="e.name" />
                <label :for="e.name">{{ e.text }}</label>
            </div>
        </div>
        <vugel :settings="{clearColor: 0xff000000}" style="flex-basis: 500px; flex-grow: 1; min-width: 500px; min-height: 700px; align-self: stretch; position: relative; margin: 10px;">
            <!-- notice that you must always use a single component tag (without v-if) here! -->
            <!-- otherwise you'll run into trouble as we are mixin compilers at this level -->
            <examples :selected="example" />
        </vugel>
    </div>
</template>

<script lang="ts">
import { Vugel } from "vugel/lib";
import Examples from "./Examples.vue";
import { ref, Ref, computed } from "vue";

export default {
    components: { Vugel, Examples },
    setup() {
        const examples = ref([
            { name: "picture", text: "Picture" },
            { name: "rectangle", text: "Rectangle" },
            { name: "text", text: "Text" },
            { name: "styled-rectangle", text: "Styled rectangle" },
            { name: "drawing", text: "Drawing" },
            { name: "position", text: "Position and size" },
            { name: "center", text: "Center" },
            { name: "transforms", text: "Transforms" },
            { name: "visibility", text: "Visibility" },
            { name: "tinting", text: "Tinting" },
            { name: "clipping", text: "Clipping" },
            // { name: "texture-clipping", text: "Texture clipping" },
            // { name: "z-index", text: "Z-index" },
            // { name: "flexbox", text: "Flexbox" },
            // { name: "effects", text: "Effects" },
            { name: "paragraph", text: "Paragraph" },
            // { name: "mouse-events", text: "Mouse events" },
            // { name: "focus-events", text: "Focus events" },
            // { name: "intersection", text: "Intersection" },
        ]);
        const example: Ref<string> = ref("styled-rectangle");
        const check = (exampleName: string) => {
            return example.value === exampleName;
        };
        const exampleObject = computed(
            () => examples.value.find((obj: any) => obj.name === example.value) || { name: "", text: "" },
        );
        return { examples, example, check, exampleObject };
    },
};
</script>
