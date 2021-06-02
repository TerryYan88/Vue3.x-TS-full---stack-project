import {reactive, toRefs} from 'vue';
import {ToolBarItems} from './types';
export const toolBar = ()=>{
    const data = reactive<{bar_items:ToolBarItems[]}>({
        bar_items:[
            {id:0,name:"首页",icon:"icon-shouye",link:"home"},
            {id:1,name:"发现",icon:"icon-custom-discovery",link:"discovered"},
            {id:2,name:"订单",icon:"icon-emaxcitygerenxinxitubiaoji03",link:"order"},
            {id:3,name:"我的",icon:"icon-center",link:"mine"},
        ]
    })

    return{
        ...toRefs(data)
    }
}