<template>
   <div class="top">
       <!-- 设置有名插槽设置默认布局 -->
       <slot name="top-main">
           <div class="top-main">
               <!-- vue3.x 自定义事件 -->
               <button class="top-btn" @click="$emit('back')">&lt;</button>
               <span>{{title}}</span>
           </div>
       </slot>
       <!-- 匿名插槽 -->
       <slot></slot>
   </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
export default defineComponent({
    name:"top",  
    props:{
        title:{
            type:String,
            required: true
        }
    },
  setup(){
    
    return{
      
    }
  },
})
</script>
<style lang='scss' scoped>
$bgColor:#51acfc;
 .top{
     background-image:linear-gradient(90deg,darken($bgColor,10%),$bgColor);
     .top-main{
         position: relative;
         color:#fff;
         text-align: center;
         font-size:.48rem;
         line-height: 1.4666666666666666rem;
         font-weight: 500;
         .top-btn{
             position: absolute;
             left:0;
             top: 0;
             color:#fff;
             margin:auto;
             width:1.066666rem;
             height:1.46666rem;
             font-size:0.8rem;
             font-weight: 400;
             font-family: "黑体";
         }
     }
 }
</style>