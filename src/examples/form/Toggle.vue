<template compiler="vugel">
    <container :w="40" :h="20">
        <styled-rectangle
            :w="40"
            :h="20"
            :radius="10"
            :stroke-width="4"
            :flex-grow="1"
            :fill-color="value ? 0xffaaffaa : 0xffffaaaa"
            :stroke-color="0xff000000"
            @click="click"
        >
            <styled-rectangle
                :radius="10"
                :x="circleX"
                :w="20"
                :h="20"
                :mount-x="0.5"
                :stroke-width="4"
                :flex-grow="1"
                :fill-color="0xffffffff"
                :stroke-color="0xff000000"
            />
        </styled-rectangle>
    </container>
</template>

<script lang="ts">
import { ref, Ref, watch, SetupContext, computed } from "vue";
import { VugelMouseEvent, Node } from "vugel";

export default {
    props: {
        initialValue: { type: Boolean, default: false },
    },
    setup(props: any, context: SetupContext) {
        const value = ref(false);

        const click = (e: VugelMouseEvent) => {
            value.value = !value.value;
        };

        watch(value, (v: boolean) => {
            context.emit("change", { value: value.value });
        });

        value.value = props.initialValue;

        const circleX = computed(() => {
            return value.value ? 30 : 10;
        });

        return {
            value,
            click,
            circleX,
        };
    },
};
</script>
