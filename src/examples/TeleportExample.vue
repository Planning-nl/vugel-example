<template compiler="vugel">
    <teleport to="#teleport">
        <picture src="./assets/rotterdam.jpg">
            <rectangle :x="10" :y="10" :color="0xaa000000" :flex="true" :padding="10">
                <text :font-size="16">This content is teleported! 🚀</text>
            </rectangle>
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
