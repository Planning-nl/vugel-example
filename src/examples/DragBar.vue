<template compiler="vugel">
    <container
        w="w"
        h="30"
        :min-width="300"
        :flex="true"
        :padding-left="20"
        :padding-right="20"
        @mousedown="start"
        @mousemove="move"
        @mouseup="end"
    >
        <special-rectangle
            ref="bar"
            :radius="4"
            :stroke-width="4"
            :flex-grow="1"
            :fill-color="0xffdddddd"
            :stroke-color="0xff000000"
            @resize="updateValue"
        >
            <text x="w/2" y="h/2+1" :mount="0.5" :font-size="28" :color="0xff000000">{{ formattedValue }}</text>
            <container ref="dragTarget">
                <special-rectangle
                    :radius="4"
                    :stroke-width="4"
                    :stroke-color="0xff000000"
                    :y="0"
                    :h="30"
                    :x="-5"
                    :w="10"
                    :fill-color="0xffffffff"
                />
            </container>
        </special-rectangle>
    </container>
</template>

<script lang="ts">
import { ref, Ref, watch, SetupContext } from "vue";
import { VugelMouseEvent, Node } from "vugel";

export default {
    props: {
        value: { type: Number, default: 0 },
        formatter: { type: Function },
    },
    setup(props: any, context: SetupContext) {
        const bar: Ref<Node | null> = ref(null);
        const dragTarget: Ref<Node | null> = ref(null);

        const value = ref(-1);
        const formattedValue = ref("");

        let startEvent: VugelMouseEvent | null = null;
        const start = (e: VugelMouseEvent) => {
            if (dragTarget.value) {
                startEvent = e;
            }

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
        };

        const updateValue = () => {
            dragTarget.value!.x = value.value * (bar.value!.el.renderWidth - 10) + 5;
        };
        watch([value, bar], updateValue);

        watch(value, (v: number) => {
            context.emit("change", { value: value.value });
            formattedValue.value = props.formatter ? props.formatter(v) : v.toFixed(2);
        });

        value.value = props.value || 0;

        return {
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
