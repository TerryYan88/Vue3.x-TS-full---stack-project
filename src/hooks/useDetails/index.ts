import { computed, onMounted, reactive, toRefs,getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { useStore, key } from '@/store'
import { MutationsType } from "@/store/mutations";
import axios from "axios";
const useDetails = () => {
    const route = useRoute();
    const { getters, commit } = useStore(key);
    const data = reactive({
        rst: computed(() => getters.rst),
        bought_list: computed(() => getters.bought_list),
        menu: computed(() => getters.menu),
        recommend: computed(() => getters.recommend),
        redpack: computed(() => getters.redpack),
        user: computed(() => getters.user),
        show: {
            desc: false,
            coupon: false,
            activities: false,
        },
        //路由地址
        path: {
            menu: "menu",
            evaluate: "evaluate",
            merchant: "merchant",
        },
        //处理 id 的拼接
        _paths: computed(() => {
            let path: any = data.path;
            let _paths: any = {};
            for (let key in path) {
                //给每个路由进行拼接
                _paths[key as any] = path[key] + "?id=" + route.query.id;
            }
            return _paths;
        }),
       
    })



    onMounted(() => {
        //获取详情页的数据
        axios("http://localhost:4000/api/details", {
            params: {
                id: route.query.id,
            }
        }).then(res => {
            commit(MutationsType.SET_DETAIL_DATA, res.data);
        })
  
    })



    return {
        ...toRefs(data)
    }
}

export default useDetails;