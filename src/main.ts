import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store,key} from './store'
import {formatImgSrc} from "@/plugins/hashImage";
import {autoTop} from '@/plugins/autoTop';
const app = createApp(App)
app.use(store,key)
app.use(router)
//全局挂
app.config.globalProperties.$formatImgSrc = formatImgSrc;
app.config.globalProperties.$autoTop = autoTop;
// app.config.globalProperties
app.mount('#app')

import {vFixed} from "@/plugins/fixedDreactive";
//注册全局自定义指定 v-fixed;
app.directive("fixed",vFixed)
// {
//     mounted(el,binding){
//         /*
            // el是绑定的DOM元素
            // <div class="header-search" v-fixed:60> 直接在DOM中调用
            //     v-fixed:60 给binding传参
//         */
//         console.log(el,binding);
//     }


