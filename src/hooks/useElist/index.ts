import { computed, onMounted, reactive, toRefs } from "vue";
import {useRouter,useRoute} from "vue-router";
import axios,{AxiosResponse,} from "axios";
import {useStore,key} from "@/store/";
type Callback=(res:AxiosResponse)=>void;


export const useElist = () => {
    const store = useStore(key)
    let data = reactive<any>({
        //使用勾股定理 商家x,y 和 用户x1,y1
        //计算公式(计算距离,求2点之间距离):x1*x + y1*y
        //当前用户所在位置
        gps: {
            latitude: 28.242478,
            longitude: 112.946747
        },
        elist: [],
        show_activity_state:{},
        foodState:computed(() =>store.state.foodState),
    })
    const orderNumber=(item:any)=>{
        let count_all = 0
        var id = item.restaurant.id;
        if(id in data.foodState){
            count_all = data.foodState[id].count_all 
        }
        return count_all
    }
    //改变列表选中的状态
    const showActivityFn =(i:number)=>{
        data.show_activity_state[i]=!data.show_activity_state[i];
    }
    //是否展开/隐藏活动列表
    const showActive = (i:number)=>{
        let value =  data.show_activity_state[i];
        value?"auto":"";
        return {height:value}
    }
    const distanceCalc = (latitude: number, longitude: number) => {
        /*获取用户的经纬度 */
        let _latitude = data.gps.latitude;
        let _longitude = data.gps.longitude;
        /*获取商家的经纬度 */
        let x = _latitude - latitude;
        let y = _longitude - longitude
        //计算2点之间的距离
        let z = Math.sqrt(x * x + y * y);//得到了用户与商家的距离
        return (z * 1000).toFixed(2);//转换成公里;
    }
    //请求列表数据
    const getData = (start: number, end: number, callback:Callback): void => {
        /*  
        设置懒加载list
        获取列表数据(首页商家信息)
        list?offset=0&length=8;
    */
        axios.get('http://localhost:4000/api/list', {
            params: {
                offset: start,
                len: end,
            }
        }).then(callback)
    }

    let offset = 0;
    let length = 8;
    let items:Array<any> = [];
    const scrollFunction =()=>{
        let dHtml = document.documentElement;
        let dBody = document.body;
        let windowHeight = window.outerHeight;//窗口高度
        let textHeight = dHtml.offsetHeight|| dBody.offsetHeight;//文档高度
        let scorllHeight = dHtml.scrollTop || dBody.scrollTop;//滚动条的高度
        if(textHeight-windowHeight<=scorllHeight){
            //console.log(windowHeight,textHeight,scorllHeight)
            offset += length;
            getData(offset,length,(res:AxiosResponse)=> {
                items.push.apply(items,res.data.items);
            })
        }
    }
    onMounted(() => {
        //console.log(props.elistData)//null 异步请求数据 需要通过watch属性来获取数据
        //watch(()=>props.elistData,(newVal)=>newVal)
        //定义一个滚动函数,判断它是否到底
        window.addEventListener("scroll",scrollFunction)
        getData(offset,length,(res:AxiosResponse)=> {
            data.elist = res.data.items
            items=data.elist
        })
    })
    let itemData = computed(() => data.elist)
    const route = useRoute();
    const router = useRouter();
    const toDetails = (item:any)=>{
        router.push({
            path:"/detail/menu",
            query:{
                id:item.restaurant.id,
            }
        })
    }

   
    return {
        itemData,
        distanceCalc,
        showActivityFn,
        showActive,
        toDetails,
        orderNumber
    }
}
