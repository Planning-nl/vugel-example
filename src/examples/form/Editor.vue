<template compiler="vugel">
    <container func-w="w" :flex="true" flex-align-items="flex-start">
        <container :flex-grow="1" :w="400" :min-height="750">
            <slot name="content"></slot>
        </container>

        <rectangle :flex="true" :w="300" :flex-grow="0.5" :padding="10" flex-direction="column" :color="0xeeffffff">
            <slot name="form-items"></slot>
        </rectangle>
    </container>
</template>

<script lang="ts">
import { ref, Ref, watch, SetupContext } from "vue";
import { VugelMouseEvent, Node } from "vugel";

export default {
    props: {
        description: { type: String, default: "" },
    },
};
</script>
