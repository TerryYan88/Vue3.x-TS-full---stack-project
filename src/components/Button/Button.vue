<template>
  <div class="baseBtn flex">
    <transition name="reduce">
      <button class="iconfont icon-iconless" 
      :class='count !== 0? "rotate_transition": ""'
      @click="$emit('changeNum',false)"></button>
    </transition>
    <span class="num" :style="{visibility:count !== 0?'visible':'hidden'}">{{count}}</span>
    <button class="iconfont icon-jia" @click="$emit('changeNum',true)" ></button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  props:{
      "count":{
          type:Number,
          isRequired:true,
          default:0
      }
  },
  setup() {
    return {

    };
  },
});
</script>
<style lang='scss' scoped>
.baseBtn {
  justify-content: flex-end;
  align-items: center;
  .iconfont {
    font-size: 0.586666rem; //22
    color: #28bfbd;
  }
  .num {
    margin: 0 0.106666rem; //4
    font-size: 0.426666rem; //16
  }
  .reduce-enter-active,
  .reduce-leave-active {
    transition: 0.5s;
  }
  .reduce-enter,
  .reduce-leave-to {
    opacity: 0;
  }
  .icon-iconless {
    transition: 0.2s;
    opacity: 0;
    visibility: hidden;
    transform: translate(-30px) rotate(-160deg);
  }
  .rotate_transition {
    opacity: 1;
    visibility: visible;
    transform: translate(0px) rotate(0deg);
  }
}
</style>