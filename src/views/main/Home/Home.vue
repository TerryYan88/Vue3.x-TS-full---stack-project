<template>
  <div class="home">
    <Top title="首页">
      <!-- 使用具名插槽 需要在template下的 
          1.# 插槽名
          2.v-slot:插槽名
         -->
      <template #top-main>
        <!-- 城市/地址 -->
        <div class="home_header" @click="show.sider = true">
          <i class="iconfont icon-weizhi1"></i>
          <span>{{ currentSide ? currentSide : "城市/地址名字" }}</span>
          <i class="iconfont icon-arrow_down_full"></i>
           <!-- 商家搜索 -->
          <div class="header_search" v-fixed>
            <p class="search_main">
              <i class="iconfont icon-fangdajing"></i>
              <span>搜索商家</span>
            </p>
          </div>
        </div>
      </template>
    </Top>
    <!-- carousel start -->

    <div class="foodType">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="items in spliceFood" :key="items">
          <ul class="flex foodType_main">
            <li class="foodType_item" v-for="item in items" :key="item.business_flag">
              <img :src="formatImgSrc(item.image_hash)" alt="" /> 
              <span class="f_title"> {{item.name}} </span>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 筛选组件 -->
	<Filter v-fixed:60 ref="removeFixed"></Filter>
    <!-- 首页列表 -->
    <Elist></Elist>
    <!-- carousel end -->
    <Side
      class="header-side"
      v-show="show.sider"
      @sback="show.sider = false"
      @changeSide="saveSide"
    ></Side>
  </div>
</template>

<script lang='ts'>
import Top from "@/components/Header/Top.vue";
import Side from "@/components/Side/Side.vue";
import Elist from "@/components/Elist/Elist.vue";
import Filter from '@/components/Filter/Filter.vue';
import { home } from "@/hooks/useHome";
import { defineComponent } from "vue";
import { Swipe, SwipeItem } from "vant";
import {formatImgSrc} from "@/plugins/hashImage";
// import {vFixed} from "@/plugins/fixedDreactive";
export default defineComponent({
  components: { Top, Side,Filter, [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem,Elist },
//   directives:{
// 	  "fixed":vFixed
//   },
  setup() {
    const { show, saveSide, currentSide, foodType, spliceFood } = home();

    return {
      show,
      saveSide,
      currentSide,
      foodType,
      spliceFood,
      formatImgSrc,
    };
  },
});
</script>
<style lang='scss' scoped>
	// .my-swipe .van-swipe-item {
	//     color: #fff;
	//     font-size: 20px;
	//     line-height: 150px;
	//     text-align: center;
	//     background-color: #39a9ed;
	//   }
	.home{
		// height: 53.333333rem;//2000
		/* 头部部分start */
		 .home_header{
			 // 20 20 5 20
			 padding: 0.533333rem 0.533333rem 0.266666rem 0.533333rem;
			 font-size: 0.64rem;//24
			 color: #fff;
			 .icon-iconlocation{
				 font-size: 90%;
			 }
			 span{
				 margin: 0rem 0.133333rem;
				 font-size: 0.48rem;//18
				 font-weight: 520;
			 }
			 
			/* 搜索商家 */
			 .header_search{
				 background-image: linear-gradient(90deg,#51acfc,#206bfe);
				 padding: 0.266666rem 0.266666rem; //10px
				 z-index: 10;
				 .search_main{
					 font-size: 0.373333rem;//14
					 background-color: #fff;
					 color: #999;
					 text-align: center;
					 line-height:1.066666rem ;
					 width: 95%;
					 .icon-icon_sousuo{
						 font-family: simsun;
						 margin-right: 0.266666rem;
					 }
				 }
			 }
			/* 搜索商家end */
		 }
	    /* 头部部分end */
		.header_side{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
		.foodType{ /* 轮播开始*/
		        height:5.866666rem;//220
		        .foodType_main{
		            flex-wrap:wrap;
		        }
		        .foodType_item{
		            width:20%;
		            margin-top:0.533333rem;//20
		            color:#666;
		            text-align:center;
		            span{
		                color:#666;
		            }
		            img{
		                display:block;
		                width:1.333333rem;//50
		                height:1.333333rem;
		                margin:0.053333rem auto;//2
		            }
		        }
		        //  .mint-swipe-indicators{
		            // .is-active{
		                //   background-color:red;
		                // }
		            //  }
		    } /* 轮播结束*/
	}
</style>