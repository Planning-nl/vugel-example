<template compiler="vugel">
    <teleport to="#teleport">
        <picture src="./assets/rotterdam.jpg">
            <text :x="10" :y="10" :font-size="10">notice that Vue.teleport currently contains a bug, so it's not cleaned up properly.</text>
        </picture>
    </teleport>
    <container>
        <rectangle :h="400" :x="10" :y="10" func-w="w-20" color="rgb(0, 255, 0)" />
    </container>
</template>

<script lang="ts">
import { Teleport } from "vue";
export default {
    components: { Teleport },
};
</script>
