<template>
    <h1>Vugel examples</h1>

    <div style="display: flex; flex-wrap: wrap; align-items: flex-start; height: 500px;">
        <div style="flex-shrink: 0; margin-bottom: 20px; margin-right: 20px;">
            <div v-for="e in examples">
                <input :id="e.name" v-model="example" type="radio" :value="e.name" />
                <label :for="e.name">{{ e.text }}</label>
            </div>
        </div>
        <vugel style="flex-basis: 500px; flex-grow: 1; min-width: 500px; min-height: 500px; align-self: stretch; position: relative;">
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
            { name: "basic-tags", text: "Basic tags" },
            { name: "text", text: "Text" },
            { name: "position", text: "Position" },
            { name: "transforms", text: "Transforms" },
            { name: "visibility", text: "Visibility" },
            { name: "clipping", text: "Clipping" },
            { name: "z-index", text: "Z-index" },
            { name: "flexbox", text: "Flexbox" },
            { name: "styled-rectangle", text: "Styled rectangle" },
            { name: "drawing", text: "Drawing" },
            { name: "effects", text: "Effects" },
            { name: "intersection", text: "Intersection" },
            { name: "mouse-events", text: "Mouse events" },
            { name: "focus-events", text: "Focus events" },
            { name: "pixel-ratio", text: "Pixel ratio" },
        ]);
        const example: Ref<string> = ref("transforms");
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
