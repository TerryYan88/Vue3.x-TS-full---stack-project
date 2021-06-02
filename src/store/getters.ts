import {State} from './state';
import {GetterTree} from "vuex";
export type Getters={
    rst(state:State):void;
    bought_list(state:State):void;
    menu(state:State):void;
    recommend(state:State):void;
    redpack(state:State):void;
    user(state:State):void;
};

const formatData = (state:State,key:string)=>{
    if(state.detailData){
        return JSON.parse(state.detailData[key].body)
    }
}

export const getters:GetterTree<State,State>&Getters={
    rst:(state:State)=>{
       if(state.detailData){
           return formatData(state,'rst');
       }
    },
    bought_list:(state:State)=>{
        if(state.detailData){
            return formatData(state,'bought_list');
        }
     },
     menu:(state:State)=>{
        if(state.detailData){
            return formatData(state,'menu');
        }
     },
     recommend:(state:State)=>{
        if(state.detailData){
            return formatData(state,'recommend');
        }
     },
     redpack:(state:State)=>{
        if(state.detailData){
            return formatData(state,'redpack');
        }
     },
     user:(state:State)=>{
        if(state.detailData){
            return formatData(state,'user');
        }
     },
}
