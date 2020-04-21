<script lang="ts">
import { ref, Ref, watch, SetupContext, computed } from "vue";
import { VugelMouseEvent, Node } from "vugel";

export default {
    props: {
        initialValue: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 1 },
        suffix: { type: String, default: "" },
        digits: { type: Number, default: 2 },
        background: { type: Number, default: 0xffddddff },
        foreground: { type: Number, default: 0xff000000 }
    },
    setup(props: any, context: SetupContext) {
        const bar: Ref<Node | null> = ref(null);
        const dragTarget: Ref<Node | null> = ref(null);

        const value = ref(-1);

        let startEvent: VugelMouseEvent | null = null;
        const start = (e: VugelMouseEvent) => {
            if (dragTarget.value) {
                startEvent = e;
            }

            containerScale.value = 100;
            update(e);
        };

        const update = (e: VugelMouseEvent) => {
            const localCoords = bar.value!.el.core.convertWorldCoordsToLocal(e.canvasOffsetX, e.canvasOffsetY);
            const max = bar.value!.el.renderWidth;
            const v = Math.min(max, Math.max(0, localCoords[0]));
            value.value = v / max;
        };

        const move = (e: VugelMouseEvent) => {
            if (startEvent) {
                update(e);
            }
        };

        const end = (e: VugelMouseEvent) => {
            startEvent = null;
            containerScale.value = 1;
        };

        const updateValue = () => {
            dragTarget.value!.x = value.value * (bar.value!.el.renderWidth - 10) + 5;
        };
        watch([value, bar], updateValue);

        const convertValue = (value: number) => {
            return props.min + (props.max - props.min) * value;
        };
        watch(value, (v: number) => {
            const convertedValue = convertValue(value.value);
            context.emit("change", { value: convertedValue });
        });

        const formatValue = (v: number) => {
            return (props.min + (props.max - props.min) * v).toFixed(props.digits) + props.suffix;
        };
        const formattedValue = computed(() => {
            return formatValue(value.value);
        });

        const convertToAmount = (value: number) => {
            return Math.max(0, Math.min(1, (value - props.min) / (props.max - props.min)));
        };
        value.value = convertToAmount(props.initialValue || 0);

        const containerScale = ref(1);

        return {
            containerScale,
            start,
            move,
            end,
            bar,
            dragTarget,
            value,
            formattedValue,
            updateValue,
        };
    },
};
</script>

<template compiler="vugel">
    <container :h="20" :flex-grow="1" :min-width="80" :flex="true">
        <container
            :flex-item="false"
            w="w"
            h="h"
            :scale="containerScale"
            :z-index="containerScale"
            @mousedown="start"
            @mousemove="move"
            @mouseup="end"
            @mouseout="end"
        />
        <styled-rectangle
            ref="bar"
            :radius="4"
            :stroke-width="4"
            :flex-grow="1"
            :fill-color="background"
            :stroke-color="0xff000000"
            :pointer-events="false"
            @resize="updateValue"
        >
            <text x="w/2" y="h/2+1" :mount="0.5" font-face="monospace" :font-size="14" :color="foreground">
                {{ formattedValue }}
            </text>
            <container ref="dragTarget">
                <styled-rectangle
                    :radius="4"
                    :stroke-width="4"
                    :stroke-color="0xff000000"
                    :y="0"
                    :h="20"
                    :x="-5"
                    :w="10"
                    :fill-color="0xffffffff"
                />
            </container>
        </styled-rectangle>
    </container>
</template>
