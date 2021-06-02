import { computed, onMounted, reactive, watch,toRefs } from "vue";
import { useStore, key } from '@/store'

const useCart = (props:any)=>{
    const store = useStore(key);
    const data:any = reactive({
        show:false,
        aName:'',
        foodState:computed(()=>{
            return store.state.foodState
        }),
        state:computed(()=>{
            //根据商家id查询商品信息
            return data.foodState[props.resId]
        }),
        allPrice:computed(()=>{
            //当前商家 加购的 商品信息
            let state = data.state;
            let price =0;//默认价格
            let oPrice = 0;
            let _priceArr=[];
            let _price = 0;//储存价格
            let _oPrice = 0;
            let food;
            if(state){
               let foods = state.foods;
                //遍历加购的商品信息
                for(let k in foods){
                    food = foods[k];
                    _priceArr = food.item.specfoods[0];
                    //商品的现价
                    _price =_priceArr.price;
                    //计算现价的总价
                    price += _price * food.count;
                    //商品原价
                    _oPrice = _priceArr.original_price;
                    //计算原价
                    oPrice += _oPrice?_oPrice * food.count : price * food.count;
                }
              let fprice = price.toFixed(1);
              let foPrice = oPrice.toFixed(1);
              return {
                  fprice,
                  foPrice
              }
            }
            return {
                fprice:0,
                foPrice:0
            };
        }),
        count_all:computed(()=>{
            if(data.state){
                return data.state.count_all
            }
        }),
        rst:computed(()=>{
            return store.getters.rst;
        }),
        foods:computed(()=>{
            if(data.state){
                return data.state.foods;
            }
        }),
        //商品信息
        base_price:computed(()=>{
            return data.rst.piecewise_agent_fee.rules[0].price
        }),
        count:(item:any)=>{
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
        },
    })


    onMounted(()=>{

        	// 处理购物车的动画效果
		watch(()=>data.count_all,(n,o)=>{
			// 判断商品数量++ 设置动画名称
			if(n>(o||0)){
				data.aName='';
				setInterval(()=>{
					data.aName="car 0.3s"
				},100)
			}
			// console.log(n,(o||0))
		})

        watch([data.foodState,()=>data.state],([fv,sv],[ofv,osv])=>{
           
        },{
            /*监听某个对象具体值,必须开启深度监听，否则监听不到值 */
            deep:true,
        })
    })
    return{
        ...toRefs(data),
    }
}

export default useCart;