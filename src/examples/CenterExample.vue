<template compiler="vugel">
    <!--full width/height using relative functions -->
    <rectangle w="w" h="500" :color="0xff000000">
        <!-- calc functions for width and height -->
        <rectangle w="w" h="h" :color-left="0xffff0000" :color-right="0xff0000ff" />

        <!-- use mount to position an element relative to its size (can be used for centering with unknown width) -->
        <text x="w/2" y="h/2" mount-x="0.5" mount-y="0.5">Centered</text>
        <text :x="0" :y="0" mount-x="0" mount-y="0">Top left</text>
        <text x="w" y="h" mount-x="1" mount-y="1">Bottom right</text>
    </rectangle>
</template>

<script lang="ts">
export default {};
</script>
