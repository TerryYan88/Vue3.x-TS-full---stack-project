import {MutationTree} from "vuex";
import {DetailsData} from './state';
import {State} from './state';
import { useStore,key } from "./";
export enum MutationsType{
    SET_DETAIL_DATA ='SET_DETAIL_DATA',
    ADD_FOODS="ADD_FOODS",
    REDUCE_FOODS="REDUCE_FOODS",
    CLEAR_CARTS = "CLEAR_CARTS",
    ADD_CATEGORY = "ADD_CATEGORY",
    REDUCER_CATEGORY="REDUCER_CATEGORY"
}

export type Mutations = {
    [MutationsType.SET_DETAIL_DATA](state:State,payload:DetailsData):void
    [MutationsType.ADD_FOODS](state:State,payload:any):void
    [MutationsType.REDUCE_FOODS](state:State,payload:any):void
    [MutationsType.CLEAR_CARTS](state:State,resId:number):void
    [MutationsType.ADD_CATEGORY](state:State,item:any):void
    [MutationsType.REDUCER_CATEGORY](state:State,item:any):void
}

export const mutations:MutationTree<State|any>&Mutations = {
    [MutationsType.SET_DETAIL_DATA](state:State,payload:DetailsData):void{
        state.detailData = payload
    },
    [MutationsType.ADD_FOODS](state:State,payload:any):void{
        let {item,cid} = payload;
        let foodState:any = state.foodState;//购物状态
        let resId = item.restaurant_id;
        let foodId = item.specfoods[0].food_id;
        //商品
        let foods;
        //判断当前商家或者商品是否存在
        if(resId in foodState){
            foods = foodState[resId].foods;
            //商品数量+1
            foodState[resId].count_all++;
            //判断商品是否存在
            if(foodId in foods){
                foods[foodId].count++;
            }else{
                foods[foodId]={
                    count:1,
                    cid,
                    item,
                }
            }
        }else{
            //第一次点击没有商品添加进来
            //添加新的商家
            foodState[resId] = {
                count_all:1,
                foods:{
                    [foodId]:{
                        count:1,
                        cid,
                        item,
                    }
                }
            }
        }
        this.commit(MutationsType.ADD_CATEGORY,{resId,cid})
    },
    //减少购物车商品数量
    [MutationsType.REDUCE_FOODS](state,payload){
 
        let {item,cid} = payload;
        let foodState:any = state.foodState;//购物状态
        let resId = item.restaurant_id;
        let foodId = item.specfoods[0].food_id;
        let res = foodState[resId];//商家数据
        let food = res.foods[foodId];//商品数据
        if(res){
            if(food){
                //减少商品数量
                food.count--;
                //减少商品总数的数量
                res.count_all--;
                if(res.count_all<=0){
                    delete foodState[resId];
                }
                if(food.count<=0){
                    delete res.foods[foodId]
                }
            }
        }
        this.commit(MutationsType.REDUCER_CATEGORY,{resId,cid})
    },
    [MutationsType.CLEAR_CARTS](state,resId){
        //清空购物车数据
        delete state.foodState[resId]
        //清空分类数据
        delete state.categroy[resId]
    },
    //添加分类数量
    [MutationsType.ADD_CATEGORY](state,item:any){
        let cState = state.categroy;
        let {resId,cid} = item;
        let res = cState[resId];
        if(!cid) return;
        //判断 当前商家或者 分类是否存在
        if(resId in cState){
            if(cid in cState[resId]){
                res[cid]++
            }else{
                res[cid] = 1;
            }
        }else{
            //添加新的分类
            cState[resId]={
                [cid]:1,
            }
        }
    },
    //减少分类数量
    [MutationsType.REDUCER_CATEGORY](state,item){
        let cState = state.categroy;
        let {resId,cid} = item;
        let res = cState[resId];
        if(!cid) return;
        res[cid]--;
        if(res[cid] <=0){
            delete res[resId];
        }
        //删除商家
        if(!state.foodState[resId] || state.foodState[resId].count_all<=0){
            delete cState[resId];
        }
    }
}

