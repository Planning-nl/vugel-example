<template compiler="vugel">
    <container>
        <picture :scale-x="scalex" :x="x" :y="y" src="./assets/logo.png" :pivot="0" />

        <drag-bar :w="500" :x="10" :y="100" :formatter="formatscalex" @change="changescalex" />
        <drag-bar :w="500" :x="10" :y="300" :formatter="formatx" @change="changex" />
        <drag-bar :w="500" :x="10" :y="400" :formatter="formaty" @change="changey" />
    </container>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import DragBar from "./DragBar.vue";

export default {
    components: { DragBar },
    setup() {
        const getValueFormatter = (min: number = 0, max: number = 1, suffix: string = "", digits: number = 2) => {
            return (v: number) => {
                return (min + (max - min) * v).toFixed(digits) + suffix;
            };
        };

        const getValueChanger = (ref: Ref<number>, min: number = 0, max: number = 1) => {
            return (e: { value: number }) => {
                ref.value = min + (max - min) * e.value;
            };
        };

        const buildProp = (
            name: string,
            config: { initial?: number; min?: number; max?: number; suffix?: string; digits?: number },
        ) => {
            const obj: any = {};
            obj[name] = ref(config.initial || 0);
            obj[`format${name}`] = getValueFormatter(config.min, config.max, config.suffix);
            obj[`change${name}`] = getValueChanger(obj[name], config.min, config.max);
            return obj;
        };

        return {
            ...buildProp("x", { min: 0, max: 1000, suffix: "px" }),
            ...buildProp("y", { min: 0, max: 400, suffix: "px" }),
            ...buildProp("scalex", { max: 4 }),
        };
    },
};
</script>
