<template compiler="vugel">
    <container>
        <rectangle :w="400" :h="400" :color="0xffff0000">
            <rectangle :x="100" :y="100" :w="250" :h="110" :color="0xffffffff">
                <picture :x="10" :y="10" src="../../assets/logo.png" />
            </rectangle>
        </rectangle>
    </container>
</template>

<script lang="ts">
export default {};
</script>
