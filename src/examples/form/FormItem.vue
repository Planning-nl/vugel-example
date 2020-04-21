<template compiler="vugel">
    <container :flex="true" flex-direction="column" :padding="5">
        <text :color="0xff000000" :font-size="18" font-face="monospace">
            {{ name }}
        </text>
        <container :flex="true" :flex-grow="1" :margin-top="5">
            <slot></slot>
        </container>
    </container>
</template>

<script lang="ts">
import { computed, Ref, ref } from "vue";
import DragBar from "./DragBar.vue";
import Toggle from "./Toggle.vue";

export default {
    props: {
        name: { type: String, default: "" },
        type: { type: String, default: "" },
        config: { type: Object, default: () => ({}) },
    },
    setup(props: any) {
        return {};
    },
};
</script>
