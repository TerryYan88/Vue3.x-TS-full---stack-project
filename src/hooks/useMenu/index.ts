import { reactive, computed, toRefs,getCurrentInstance,onMounted } from "vue";
import { useStore, key } from '@/store'
import {autoTop} from '@/plugins/autoTop';
import { MutationsType } from "@/store/mutations";
import $ from "jquery";
const useMenu = () => {
    const store = useStore(key);
    const proxy:any = getCurrentInstance();
    let arr:number[] = [];
    const data = reactive({
        recommend: computed(() => store.getters.recommend),
        menu: computed(() => store.getters.menu),
        rst: computed(() => store.getters.rst),
        con_height: "0",
        menu_index:0,
        menu_tops:arr,
        scrollOff:true,
        foodState:computed(()=>{
            return store.state.foodState
        }),
    })
  

    //设置菜单内容区域的高度
    const setMenuHeight = () => {
        let wH = window.outerHeight;//创体的高度
        //通过ref 获取父组件的高度
        let navH = proxy.parent.parent.refs.detail_nav.offsetHeight;
        //console.log(proxy.parent.parent.refs.detail_nav.offsetHeight);
        let arg = wH - navH;
        data.con_height=arg/37.5+"rem";
    }
    //选种左侧菜单滚动
    const menuSelector = (i:number)=>{
        //获取第几个元素
        data.menu_index=i;
        //检测的开关
        data.scrollOff = false;
        //将main_con高度值设置成我们得到的值
        let main_con = proxy.refs.main_con;
        //置顶
        autoTop(0,main_con);

        // main_con.scrollTop = data.menu_tops[i];
        // console.log(main_con.scrollTop);
        //jquery 滚动实现
        $(main_con).animate({
            scrollTop: data.menu_tops[i],
        },300,()=>{
            setTimeout(()=>{
                data.scrollOff = true;
            },300)
        })
    }
    

    //获取高度函数
    const getTops = ()=>{
        let items = proxy.refs.menu_main.getElementsByClassName("con_item")!;
        //存储菜单高度
        let arr = data.menu_tops;
        //获取每个盒子的高度 得到con_item相对于父级的高度
        for(let item of items){
            arr.push(item.offsetTop)
        }
        //console.log(arr);
    }

    // const scrollFunciont = ()=>{
    //      //获取到main_con的div元素
    //      let main_con = proxy.refs.main_con;
    //      //滚动条的高度
    //      console.log(main_con.scrollTop)
    // }

    
    const cateCount = (resId:any,cid:any)=>{
        let cate = store.state.categroy;
        if(cate[resId]){
            return cate?cate[resId][cid]:0;
        }
    }
    onMounted(()=>{
        setMenuHeight();
        getTops();
        //获取滚动条的高度;
        //获取到main_con的div元素,检测滚动条,防止乱滚
        let main_con = proxy.refs.main_con;
        let t=0;
        //左侧菜单的某一项
        let arr = data.menu_tops;//菜单存储的高度
        let index,_i: number;
        //右侧内容的滚动
        main_con.addEventListener("scroll",()=>{
            t = main_con.scrollTop;
            index = data.menu_index;
            if(data.scrollOff){//屏蔽点击时,动画还没结束
                //置顶
                autoTop(0,main_con);
                //检测滚动条的高度
                for(let i = 0;i < arr.length;i++){
                    if(t<=arr[i]){
                        _i=i-1;//得到数值
                        //当下标发生改变时,修改
                        if(index !== _i){
                            data.menu_index=_i;
                        }
                        break;
                    }
                }
            }
            /**
             * 最开始数组[0,1193,3834,5015]
             * 
             */
        },false)
    })
   
    return {
        ...toRefs(data),
        menuSelector,

        cateCount,
        
    }
}

export default useMenu;