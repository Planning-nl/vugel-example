<template compiler="vugel">
    <basic-tags-example v-if="check('basic-tags')" />
    <text-example v-if="check('text')" />
    <position-example v-if="check('position')" />
    <transforms-example v-if="check('transforms')" />
    <visibility-example v-if="check('visibility')" />
    <clipping-example v-if="check('clipping')" />
</template>

<script lang="ts">
import BasicTagsExample from "./examples/BasicTagsExample.vue";
import TextExample from "./examples/TextExample.vue";
import PositionExample from "./examples/PositionExample.vue";
import TransformsExample from "./examples/TransformsExample.vue";
import ClippingExample from "./examples/ClippingExample.vue";
import VisibilityExample from "./examples/VisibilityExample.vue";
import { ref, Ref, computed } from "vue";

export default {
    components: {
        BasicTagsExample,
        TextExample,
        PositionExample,
        TransformsExample,
        ClippingExample,
        VisibilityExample,
    },
    props: {
        selected: { type: String, default: "basic-usage" },
    },
    setup(props: any) {
        const check = (exampleName: string) => {
            return props.selected === exampleName;
        };
        return { check };
    },
};
</script>
