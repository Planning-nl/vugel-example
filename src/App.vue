<template>
  <h1>Hello Vugel!</h1>
  <vugel :settings="{w: 900, h: 900}" v-on:click="click">
    <comp :prop="scale" />
  </vugel>
</template>

<script>


  import {Vugel} from "vugel"

  import Comp from "./Comp.vue"

  import { ref } from 'vue'

  export default {
    components: {Vugel, Comp},
    setup(props) {
      const scale = ref(0.2);
      const click = function() {
        scale.value += 0.1;
      }
      return {scale, click}
    }
  }

</script>
