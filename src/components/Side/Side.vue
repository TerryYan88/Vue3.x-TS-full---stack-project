<template>
  <div class="side">
    <!-- 地址选择 -->
    <div class="side-main">
      <!-- 自定义事件 -->
      <Top class="main-header" title="选择收获地址" @click="$emit('sback')">
        <span class="add">新增地址</span>
      </Top>
      <div @click="show.city=true">
        <!-- 如果选择了城市就选择已经选择城市的名称,否则显示请选择城市 -->
        <span>{{currentCity?currentCity :"请选择城市"}}</span>
      </div>
    </div>

  <!-- 少了搜索列表 -->


    <!-- 城市选择 -->
    <div class="side-city" v-show="show.city">
      <!-- 城市选择头部  使用自定义事件 返回事件-->
      <Top class="city-header" title="城市选择" @back="show.city=false">
        <!-- 搜索城市 -->
        <div class="city-search flex">
          <i class="iconfont icon-fangdajing"></i>
          <input class="cininput" type="text" placeholder="" v-model="searchCities"/>
        </div>
      </Top>
      <div>
        当前城市
        {{currentCity}}
      </div>
      <!-- 城市列表 -->
      <van-index-bar>
			<ul v-for="(items,k,i) in cityName" :key="i" :index="k" >
        		<van-index-anchor :index="k"/>
				<li v-for="(item) in items" :key="item.zip"
          @click="selectCity(item)"
        >
					{{item.name}}
				</li>
			</ul>
      </van-index-bar>
    </div>
  </div>
</template>

<script lang='ts'>
import Top from "../Header/Top.vue";
import { defineComponent } from "vue";
//import { getCurrentInstance } from "vue"; //vue3.0;getCurrentInstance 获取全局实例
import { IndexAnchor,IndexBar } from "vant";
import {useSideIndexBar} from "@/hooks/useSideIndexBar";
export default defineComponent({
  components: { Top, 
  [IndexAnchor.name]: IndexAnchor,
  [IndexBar.name]:IndexBar
  },
  setup(props, ctx) {
	  const {cityName,searchCities,citySearch,selectCity,currentCity,show} = useSideIndexBar();
	  //console.log(cityName);
	  /*
    console.log(getCurrentInstance());
    getCurrentInstance 方法,用来获取当前实例的,通过上下文ctx,获取当前的方法
    在打包之后无法获取全局挂在的方法. ctx只适合开发环境;
    如何说是需要上线,那么需要将ctx换成proxy
        const {ctx,proxy} = getCurrentInstance();
        const data = reactive({
            cityList:null,
        })
        ctx.$axios ("/api/citylist")
        .then(res=>{
            data.cityList = res.data;
        })
    */
   	/*
		格式化数据,将数据按pinyin开头字母进行分类   
	*/

    return {
      //...toRefs(data);
	  cityName,
	  searchCities,
	  citySearch,
    selectCity,
    currentCity,
    show
    };
  },
});
</script>
<style lang='scss' scoped>
	.side{
		height: 100%;
		// background-color: #fff;
		.side_main,.side_city{
			height: 100%;
			background-color: #f4f4f4;
		}
		.side_main{
			.main_header{
				.add{
					position: absolute;
					right: 0.266666rem;
					top: 0;
					line-height: 1.466666rem;//55
					color: #fff;
					font-size: 0.426666rem;//16
				}
			}
				// 搜索模块开始
						.main_search {
							align-items: center;
							background-color: #fff;
							padding: 0.32rem;//12
			
							.search_name {
								width: 1.066666rem;//40px
								text-align: center;
								font-size: 0.32rem;//12
								// 字体超出隐藏
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
			
							.search_input {
								padding: 0.16rem;//6
								margin-left: 0.266666rem;//10
								background-color: #f4f4f4;
			
								.iconfont {
									font-size: 0.32rem;//12
									font-weight: 600;
									color: #999;
								}
			
								.input {
									padding: 0.133333rem;//5
									width: 6.666666rem;//250
									color: #999;
								}
							}
			
							// 搜索框结束
			                // 当前地址
						.new_add {
							margin: 0.266666rem;//10
							font-size: 0.373333rem;//14
						}
						}

		}
		
		.side_city{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.city_header{
				padding-bottom: 0.026666rem;
			}
			.city_search{
				margin: 0.266666rem 0.933333rem;
				background-color: #fff;
				padding: 0.266666rem 0.533333rem;
				border-radius:2.666666rem;
				color:#999;
				font-size: 0.32rem;
				font-weight: 600;
			}
			.cinput{
				background-color: #fff;
				width: 90%;
				color:#999;
				margin-left: 0.213333rem;
			}
		}
	    	/**列表模块**/
			.add_list {
				height: 0.4rem;//15
				background-color: #fff;
				padding: 0.4rem;//15
				font-size: 0.373333rem;//14
				border-bottom: 1px solid rgba(166, 166, 166, 0.1);
			}
		 .search_box{
				/* 自适应填满剩余空间 */
				flex-grow: 1;
				flex-shrink: 1;
				overflow: auto;
			}
			.current_box{
				span{
					line-height:35px;
					padding: 15px;
					font-size: 14px;
					color: #999;
				}
			}
		
	}
</style>