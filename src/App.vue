<template>
  <div id="nav">
  <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Contain from "@/views/Contain/Contain.vue";
export default defineComponent({
  components:{
   Contain
  },
  setup() {
    
  },
})
</script>



<style lang="scss">

</style>
