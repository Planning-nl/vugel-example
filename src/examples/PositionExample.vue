<template compiler="vugel">
    <!--full width/height using relative functions -->
    <rectangle w="w" h="h" :color="0xff000000">
        <!-- calc functions for width and height -->
        <rectangle :x="10" :y="10" w="w-20" h="h-20" :color-left="0xffff0000" :color-right="0xff0000ff" />

        <!-- use mount to position an element relative to its size (can be used for centering with unknown width) -->
        <picture src="./assets/logo.png" x="w/2" y="h/2" mount-x="0.5" mount-y="0.5"></picture>
    </rectangle>
</template>

<script lang="ts">
export default {};
</script>
