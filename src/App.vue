<template>
    <h1>Hello Vugel!</h1>
    <vugel style="position: absolute; width: 50%; height: 50%;" @click="click">
        <comp :prop="scale" />
    </vugel>
    <Comp2 style="position: absolute; left: 50%; width: 50%; height: 50%;"></Comp2>
</template>

<script lang="ts">
import { Vugel } from "vugel/lib";
import Comp from "./Comp.vue";
import { ref } from "vue";
import Comp2 from "./Comp2.vue";

const a: number = 1;
export default {
    components: { Vugel, Comp, Comp2 },
    setup(props: any) {
        const scale = ref(1);
        const click = function () {
            scale.value += 0.1;
        };
        return { scale, click };
    },
};
</script>
