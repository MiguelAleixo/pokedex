import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import regions from './regions/index'
import details from './details/index'
import list from './list/index'

Vue.use(Vuex, axios)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      regions,
      details,
      list
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
