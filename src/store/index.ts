import { createLogger,createStore,Store as VuexStore,CommitOptions,useStore as baseUseStore,DispatchOptions } from 'vuex';
import {InjectionKey} from "vue";
import {mutations,Mutations} from './mutations';
import {actions,Actions} from './actions';
import {getters,Getters} from './getters';
import {State,state} from './state';

export const key:InjectionKey<VuexStore<State>>=Symbol();

export function useStore(key:InjectionKey<VuexStore<State>>=Symbol()){
  return baseUseStore(key);
}

export type Store = Omit<VuexStore<State>,"getters"|"commit"|"dispatch">&{
  commit<K extends keyof Mutations,P extends Parameters<Mutations[K]>[1]>(
    key:K,
    payload:P,
    option?:CommitOptions
  ):ReturnType<Mutations[K]>
}&{
  dispatch<K extends keyof Actions>(
    key:K,
    payload:Parameters<Actions[K]>[1],
    options?:DispatchOptions,
  ):ReturnType<Actions[K]>
}&{
  getters:{
    [K in keyof Getters]:ReturnType<Getters[K]>
  }
}

export const store = createStore<State>({
  plugins:process.env.Node_ENV === "development"?[createLogger()] : [],
  state,
  mutations,
  actions,
  getters
  })