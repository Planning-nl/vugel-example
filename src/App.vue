<template>
    <div>
        <div
            style="
                position: absolute;
                width: 100%;
                height: 100%;
                min-height: 750px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            "
        >
            <div style="display: flex; align-items: center; background: #ffffff; padding: 10px;">
                <p style="font-family: sans-serif; margin: 0;">
                    <em>Vugel example</em> (
                    <a href="https://github.com/Planning-nl/vugel-example" target="_blank"
                        >View source code on Github</a
                    >
                    )
                </p>
                <select v-model="example" style="margin-left: 50px;" @click="myvar = 1" @mousedown="myobj.x = 1">
                    <option v-for="e in examples" :value="e.name">
                        {{ e.text }}
                    </option>
                </select>
            </div>

            <vugel :settings="{ clearColor: '#000000' }" style="flex-grow: 1; position: relative;">
                <!-- notice that you must always use a single component tag (without v-if) here! -->
                <!-- otherwise you'll run into trouble as we are mixin compilers at this level -->
                <examples :selected="example" />
            </vugel>
        </div>
    </div>
</template>

<script lang="ts">
import { Vugel } from "vugel";
import Examples from "./Examples.vue";
import { ref, Ref, computed, reactive } from "vue";

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
            { name: "particles", text: "Particles" },
            { name: "teleport", text: "Teleport" },
            { name: "direct", text: "Direct" },
            { name: "many-components", text: "Many components performance" },
        ]);
        const example: Ref<string> = ref("picture");
        const check = (exampleName: string) => {
            return example.value === exampleName;
        };
        const exampleObject = computed(
            () => examples.value.find((obj: any) => obj.name === example.value) || { name: "", text: "" },
        );
        const myvar = ref(1);
        const myobj = reactive({x: 0, y: 0});
        return { examples, example, check, exampleObject, myvar, myobj };
    },
};
</script>
