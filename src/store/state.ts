

export type DetailsData = {
    bought_list: { body: string },
    menu: { body: string },
    recommend: { body: string },
    redpack: { body: string },
    rst: { body: string },
    user: { body: string },
}

export type State = {
    detailData: any;
    foodState:any;
    categroy:any,
}

export const state: State = {
    detailData: "",
    foodState:{},
    //分类的状态
    categroy:{},
}