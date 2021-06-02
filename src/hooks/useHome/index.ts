import { computed,getCurrentInstance, onMounted, reactive, toRefs,onUnmounted,Directive } from "vue";

import axios from "axios";
export const home = () => {
    const proxy= getCurrentInstance()!;
    const data = reactive({
        show: { sider: false },
        currentSide: '',
        foodType: null,
        saveSide(val: any) {
            data.currentSide = val.name;
        },
    })
   
    onMounted(() => {
        axios.get('http://localhost:4000/api/foodtype')
            .then(res => {
                data.foodType = res.data.entries;
            })
    })

    /*
        拆分分类的数据
        10条数据为一组
    */
    const spliceFood = computed(() => {
        //获取到分类的数据
        let foodDatas: any = data.foodType;
        let arr = [];
        //切割数组 长度为10
        if (foodDatas) {
            do {
                arr.push(foodDatas.splice(0, 10))
            } while (foodDatas.length)
        }

        return arr;
    })
 
 
    return {
        ...toRefs(data),
        spliceFood
    }
}
