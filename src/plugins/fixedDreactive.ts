/*
    自定义吸附指令
*/
import { DirectiveBinding } from "vue";

interface Css {
    position: string;
    top: string;
    left: string;
    zIndex: string;
    width: string;
    [key: string]: string;
}


export const vFixed = {
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
        //给window,body,html 添加scroll事件
        // window.addEventListener("scroll",scollFn,false);
        // dBody.addEventListener("scroll",scollFn,false); 
        // dHtml.addEventListener("scroll",scollFn,false);
        let _el = el;
        let dt: number = 0;
        let _elCheck = _el.offsetParent
        //设置占位元素
        let dP: HTMLElement = document.createElement("p");
        dP.style.height = el.offsetHeight / 37.5 + "rem";
        dP.style.display = "none";
        el.after(dP);
        // //获取元素距离顶部的高度
        // do{
        //     //元素相对定位于父级距离
        dt += _el.offsetTop;
        // }while(_elCheck)
        // console.log(dt);

        //arg 接受v-fixed传参 (防止轮播图移动)
        let arg: string | number = binding.arg || 0;
        let tVal: string = (arg as number) / 37.5 + 'rem';
        let dHtml: HTMLElement = document.documentElement;
        let dBody: HTMLElement = document.documentElement;
        let st: number = 0;
        let bool: boolean;
        let _bool: boolean;
        let css: Css = {
            position: "fixed",
            left: "0",
            top: tVal,
            zIndex: "5",
            width: "100%",
        }
        const scrollFn = () => {
            //2.获取滚动条的高度
            st = dHtml.scrollTop || dBody.scrollTop;
            //滚动条状态 只判断一次;
            bool = st >= dt - (arg as number);
            if (_bool !== bool) {
                console.log(bool ? "高度够了" : "高度不够")
                for (let key in css) {
                    //设置样式
                    if (bool) {
                        el.style[key as any] = css[key];
                        dP.style.display = "block";
                    } else {
                        //清楚原本样式
                        el.style[key as any] = "";
                        dP.style.display = "none";
                    }
                }
                _bool = bool;
            }
        }
        startScroll(window, dBody, dHtml, scrollFn)

    },
    unmounted(el:HTMLElement, binding: DirectiveBinding<any>){
        let _el = el;
        let dt: number = 0;
        let _elCheck = _el.offsetParent
        //设置占位元素
        let dP: HTMLElement = document.createElement("p");
        dP.style.height = el.offsetHeight / 37.5 + "rem";
        dP.style.display = "none";
        el.after(dP);
        // //获取元素距离顶部的高度
        // do{
        //     //元素相对定位于父级距离
        dt += _el.offsetTop;
        // }while(_elCheck)
        // console.log(dt);

        //arg 接受v-fixed传参 (防止轮播图移动)
        let arg: string | number = binding.arg || 0;
        let tVal: string = (arg as number) / 37.5 + 'rem';
        let dHtml: HTMLElement = document.documentElement;
        let dBody: HTMLElement = document.documentElement;
        let st: number = 0;
        let bool: boolean;
        let _bool: boolean;
        let css: Css = {
            position: "fixed",
            left: "0",
            top: tVal,
            zIndex: "5",
            width: "100%",
        }
        const scrollFn = () => {
            //2.获取滚动条的高度
            st = dHtml.scrollTop || dBody.scrollTop;
            //滚动条状态 只判断一次;
            bool = st >= dt - (arg as number);
            if (_bool !== bool) {
                console.log(bool ? "高度够了" : "高度不够")
                for (let key in css) {
                    //设置样式
                    if (bool) {
                        el.style[key as any] = css[key];
                        dP.style.display = "block";
                    } else {
                        //清楚原本样式
                        el.style[key as any] = "";
                        dP.style.display = "none";
                    }
                }
                _bool = bool;
            }
        }
        endScroll(window, dBody, dHtml, scrollFn)
    }
}

const endScroll = (window: any, dBody: any, dHtml: any, scrollFn: any) => {
    window.removeEventListener("scroll", scrollFn)
    dBody.removeEventListener("scroll", scrollFn)
    dHtml.removeEventListener("scroll", scrollFn)
}



const startScroll = (window: any, dBody: any, dHtml: any, scrollFn: any) => {
    window.addEventListener("scroll", scrollFn, false);
    dBody.addEventListener("scroll", scrollFn, false);
    dHtml.addEventListener("scroll", scrollFn, false);
}







