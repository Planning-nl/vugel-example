<template compiler="vugel">
    <container :flex="true" :flex-grow="1" flex-direction="column">
        <drag-bar
            :initial-value="red"
            :margin-bottom="10"
            :background="redBackground"
            :foreground="0xffffffff"
            @change="updateRed"
        />
        <drag-bar
            :initial-value="green"
            :margin-bottom="10"
            :background="greenBackground"
            :foreground="0xffffffff"
            @change="updateGreen"
        />
        <drag-bar
            :initial-value="blue"
            :margin-bottom="10"
            :background="blueBackground"
            :foreground="0xffffffff"
            @change="updateBlue"
        />
        <drag-bar
            :margin-bottom="10"
            :initial-value="alpha"
            :background="alphaBackground"
            :foreground="alphaForeground"
            @change="updateAlpha"
        />
    </container>
</template>

<script lang="ts">
import DragBar from "./DragBar.vue";
import { ref, watch, computed, SetupContext } from "vue";
import { ColorUtils } from "tree2d";

export default {
    components: { DragBar },
    props: {
        initialValue: { type: Number, default: 0 },
    },
    setup: function (props: any, context: SetupContext) {
        const red = ref(-1);
        const green = ref(-1);
        const blue = ref(-1);
        const alpha = ref(-1);

        const updateRed = (v: { value: number }) => {
            red.value = v.value;
        };

        const updateGreen = (v: { value: number }) => {
            green.value = v.value;
        };

        const updateBlue = (v: { value: number }) => {
            blue.value = v.value;
        };

        const updateAlpha = (v: { value: number }) => {
            alpha.value = v.value;
        };

        const components = ColorUtils.getRgbaComponentsNormalized(props.initialValue);

        red.value = components[0];
        green.value = components[1];
        blue.value = components[2];
        alpha.value = components[3];

        watch([red, green, blue, alpha], (values: number[]) => {
            const color = ColorUtils.getArgbNumber([
                red.value * 255,
                green.value * 255,
                blue.value * 255,
                alpha.value * 255,
            ]);
            context.emit("change", { value: color });
        });

        const redBackground = computed(() => {
            return ColorUtils.getArgbNumber([red.value * 255, 0, 0, 255]);
        });

        const greenBackground = computed(() => {
            return ColorUtils.getArgbNumber([0, green.value * 255, 0, 255]);
        });

        const blueBackground = computed(() => {
            return ColorUtils.getArgbNumber([0, 0, blue.value * 255, 255]);
        });

        const alphaBackground = computed(() => {
            return ColorUtils.getArgbNumber([alpha.value * 255, alpha.value * 255, alpha.value * 255, 255]);
        });

        const alphaForeground = computed(() => {
            return alpha.value > 0.5 ? 0xff000000 : 0xffffffff;
        });

        return {
            red,
            green,
            blue,
            alpha,
            updateRed,
            updateGreen,
            updateBlue,
            updateAlpha,
            redBackground,
            greenBackground,
            blueBackground,
            alphaBackground,
            alphaForeground,
        };
    },
};
</script>
