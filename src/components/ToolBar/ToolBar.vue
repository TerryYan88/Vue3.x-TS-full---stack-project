<template>
   <div class="tool-bar-wrap">
       <ul class="tool-bar">
           <li class="tool-bar-items"
            v-for="item in bar_items" :key="item.id" 
           >
              <router-link :to="item.link">
                    <i class="iconfont" :class=item.icon></i>
                    <span>{{item.name}}</span>
              </router-link>
           </li>
       </ul>
   </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
import {toolBar} from '@/hooks/useToolBar'
export default defineComponent({
  name:"tool-bar",
  setup(){
     const {bar_items} = toolBar();
    return{
        bar_items
    }
  },
})
</script>
<style lang='scss' scoped>
$center:center;
   .tool-bar-wrap{
       position:fixed;
       bottom:0;
       left:0;
       width:100%;
       .tool-bar{
           display:flex;
           justify-content:space-around;
           align-items:$center;
           background-color:#47b4ff;
           box-shadow:0 0 .10666666666666667rem #000;
           .tool-bar-items{
               text-align:$center;
               padding:.13333333333333333rem 0;
               font-size:.37333333333333335rem;
               color:#ccc;
               .iconfont{
                //   把icon浮动上去 
                   display:block;
                   font-size:.50rem;
                   margin-bottom: .16rem;
               }
               a{
                   display: block;
                   text-decoration: none;
               }
           }
           .router-link-active{
               color:#fff;
               font-weight: 500;
           }
       }
   } 
</style>