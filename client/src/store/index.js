import auth from '@/modules/auth';
import { createStore } from 'vuex';
import products from '@/modules/products';

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules:{auth,products}
})

export default store;