<template compiler="vugel">
    <container w="w" h="h">
        <text :color="0xff000000" :font-size="60" :font-weight="900" font-style="italic" font-face="Serif">
            hello world
        </text>
        <paragraph w="w" :y="100" :font-size="30" :font-color="0xffff0000">
            The paragraph has the ability to wrap text. Drag the width of the window to see it in action.
        </paragraph>
    </container>
</template>

<script lang="ts">
export default {};
</script>
