<template>
  <ul>
    <li class="activity_item" v-for="ac in data" :key="ac.id">
      <i :style="{ backgroundColor: '#' + ac.icon_color }" class="icon">{{
        ac.icon_name
      }}</i
      >{{ ac.description }}
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    data: Array,
  },
  setup() {
    return {};
  },
});
</script>
<style lang='scss' scoped>
.activity_item {
  margin-bottom: 0.16rem; //6
  line-height: 0.48rem; //18
  font-size: 0.32rem; //12 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  .icon {
    float: left;
    padding: 0 0.053333rem;
    height: 0.48rem;
    margin-right: 0.16rem;
    font-size: 0.32rem;
    text-align: center;
    color: #fff;
    border-radius: 0.08rem;
  }
}
</style>