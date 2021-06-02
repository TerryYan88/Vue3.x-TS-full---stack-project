
import { reactive, computed, toRefs,getCurrentInstance,onMounted } from "vue";
import { useStore, key } from '@/store'
import { MutationsType } from "@/store/mutations";
const useChangeNum = ()=>{
    const store = useStore(key);
    const data = reactive({
        foodState:computed(()=>{
            return store.state.foodState
        }),
    })
    //按钮事件
    const changeNum = (isFlag: boolean,item:any)=>{
        //isFlag === true? data.count+=1 : data.count -=1;
        if(isFlag){
            store.commit(MutationsType.ADD_FOODS,item)
        }else{
            store.commit(MutationsType.REDUCE_FOODS,item)
        }
    }
    //商品计算数字
    const count= (item:any)=>{
        let resId = item.restaurant_id;
        let foodId = item.specfoods[0].food_id;
        let res=data.foodState[resId];
        let food;
        if(res){
            //通过商品id 从商家去拿取 商品信息
            food = res.foods[foodId];
            if(food){
                return food.count;
            }
        }
        return 0;
    }
    return{
        count,
        changeNum
    }
}

export default useChangeNum;