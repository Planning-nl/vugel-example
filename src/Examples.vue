<template compiler="vugel">
    <container func-w="w" func-h="h">
        <container :skip-in-layout="true">
            <picture-example v-if="check('picture')" />
            <rectangle-example v-if="check('rectangle')" />
            <text-example v-if="check('text')" />
            <styled-rectangle-example v-if="check('styled-rectangle')" />
            <drawing-example v-if="check('drawing')" />

            <position-example v-if="check('position')" />
            <center-example v-if="check('center')" />
            <transforms-example v-if="check('transforms')" />
            <visibility-example v-if="check('visibility')" />
            <tinting-example v-if="check('tinting')" />
            <clipping-example v-if="check('clipping')" />

            <paragraph-example v-if="check('paragraph')" />

            <particles-example v-if="check('particles')" />
            <teleport-example v-if="check('teleport')" />

            <direct-example v-if="check('direct')" />

            <many-components v-if="check('many-components')" />
        </container>
        <container id="teleport" />
    </container>
</template>

<script lang="ts">
import TextExample from "./examples/TextExample.vue";
import PositionExample from "./examples/PositionExample.vue";
import TransformsExample from "./examples/TransformsExample.vue";
import ClippingExample from "./examples/ClippingExample.vue";
import VisibilityExample from "./examples/VisibilityExample.vue";
import CenterExample from "./examples/CenterExample.vue";
import PictureExample from "./examples/PictureExample.vue";
import RectangleExample from "./examples/RectangleExample.vue";
import StyledRectangleExample from "./examples/StyledRectangleExample.vue";
import TintingExample from "./examples/TintingExample.vue";
import ParagraphExample from "./examples/ParagraphExample.vue";
import DrawingExample from "./examples/DrawingExample.vue";
import ParticlesExample from "./examples/ParticlesExample.vue";
import TeleportExample from "./examples/TeleportExample.vue";
import DirectExample from "./examples/DirectExample.vue";
import ManyComponents from "./examples/performance/ManyComponents.vue";

export default {
    components: {
        PictureExample,
        RectangleExample,
        TextExample,
        StyledRectangleExample,
        DrawingExample,

        PositionExample,
        CenterExample,
        TransformsExample,
        VisibilityExample,
        TintingExample,
        ClippingExample,

        ParagraphExample,
        ParticlesExample,
        TeleportExample,
        DirectExample,

        ManyComponents,
    },
    props: {
        selected: { type: String, default: "" },
    },
    setup(props: any) {
        const check = (exampleName: string) => {
            return props.selected === exampleName;
        };
        return { check };
    },
};
</script>
