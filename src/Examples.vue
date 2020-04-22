<template compiler="vugel">
    <container w="w" h="h">
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
