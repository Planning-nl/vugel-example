<template>
    <h1>Hello Vugel!</h1>
    <vugel style="position: absolute; width: 100%; height: 100%;" @click="click">
        <comp :prop="scale" />
    </vugel>
</template>

<script lang="ts">
import { Vugel } from "vugel";
import Comp from "./Comp.vue";
import { ref } from "vue";

const a: number = 1;
export default {
    components: { Vugel, Comp },
    setup(props: any) {
        const scale = ref(0.2);
        const click = function () {
            scale.value += 0.1;
        };
        return { scale, click };
    },
};
</script>
