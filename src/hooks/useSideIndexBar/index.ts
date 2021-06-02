import axios from "axios";
import { computed, onMounted, reactive, toRefs,getCurrentInstance } from 'vue';
export const useSideIndexBar = ()=>{
    const {proxy}= getCurrentInstance()!;
    const data = reactive({
        cities:[],
        searchCities:"",
        currentCity:'',
        show:{
            city:false,
        },
        selectCity(val:any){
            //选择完城市的时候关闭城市选择列表
            data.show.city = false;

            //input 内容
            data.searchCities = "";
            //console.log(val);
            data.currentCity = val.name;
            //选择完城市的时候,将选择的城市数据传递出去

            //自定义事件 把值从side 传到 home
            proxy!.$emit('changeSide',val);
        }
    })
    onMounted(()=>{
        axios.get("http://localhost:4000/api/citylist")
        .then(res=>data.cities = res.data)
    })
    /*数据格式化 */
    const cityName = computed(()=>{
        /*获取数据 */
        const cities:any = data.cities
        //初始化一个容器对象
        let cityList:any = {}
        //首字母
        let initial;
        if(cities){
            //遍历数组
            for(let item of cities){
                //拿到每项拼音的首字母
                initial = item.pinyin[0].toUpperCase()
                //如果当前首字母存在,那么添加到城市当前的首字母列表项中
                if(initial in cityList){
                    cityList[initial].push(item);
                }else{
                    //初始化首字母为一个数组
                    cityList[initial]=[item]
                }

            }
        }
        return cityList
    })

    //城市模糊查询
    const citySearch = computed(()=>{
        const arr:any[] = [];//声明一个空的数组,来存放塞选的数据
        //获取城市列表数据,城市查询的字符串
        const cities:any = data.cities
        let regs;
        let searchCities = data.searchCities
        if(!cities || !searchCities) return [];

        /*
            正则 处理: 阿拉善盟 ->啊善
        */
       //  /.*啊.*善.*/
       searchCities = searchCities.replace(/.{0}/g,'.*');

        //循环数据中的每一项,根据label的值
        for(let city in cities){
            //声明全局匹配忽略大小写
            regs = new RegExp(searchCities,"gi");
            //判断输入框中的值是否可以匹配到数据,如果匹配成功
            // if(cities[city].label.indexOf(searchCities) !== -1){
            //     //向arr数组中添加
            //     arr.push(arr);
            // }
            if(regs.test(cities[city].label)){
                arr.push(cities[city].name);
            }

        }
        return arr

    })


    return{
        cityName,
        ...toRefs(data),
        citySearch
    }
}


