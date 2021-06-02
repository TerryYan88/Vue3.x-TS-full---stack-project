<template>
   <div class="Contain">
       <router-view/>
       <ToolBar/> 
   </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
import ToolBar from '@/components/ToolBar/ToolBar.vue';
export default defineComponent({
  components:{
    ToolBar,
  },
  setup(){
    
    return{
      
    }
  },
})
</script>
<style lang='less' scoped>
 
</style>