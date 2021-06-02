import {Getters} from './getters';

//对象类型过滤
//获取单个getters infer推断 判断集合有没有该元素
type GetGetter<Module>= Module extends {getters:infer G}?G:unknown;//getters继承每个module内容然后,然后用推断它,有返回G没有返回unknown
//获取所有的modules中的getters
type GetGetters<Modules> = {
[K in keyof Modules]:GetGetter<Modules[K]>;
};


//找到每一个模块里的getters
type ModulesGetters = GetGetters<typeof Getters>;

type AddPrefix<Prefix,Keys> = `${Prefix & string}/${Keys & string}`;

type GetSpliceKey<Module,Key> = AddPrefix<Key, keyof Module>;//Key ==> user; keyof Module ==> isLogin
type GetSpliceKeys<Modules> = {
[K in keyof Modules]:GetSpliceKey<Modules[K],K>
//K ==> isLogin
/*
modules 是整个大模块
user: {
isLogin: (state: {
loading: boolean;
}) => string;
};
*/
}[keyof Modules];

//type xx =GetSpliceKeys<ModulesGetters>

type GetSpliceObj<T> = {
[K in GetSpliceKeys<T>]:string;
}
export type Getters = GetSpliceObj<ModulesGetters>