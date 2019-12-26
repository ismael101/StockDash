import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    symbol:'AAPL',
    labels:[],
    percent:'',
    open:{
      status:'',
      data:null
    },
    close:{
      status:'',
      data:null
    },
    high:{
      status:'',
      data:null
    },
    low:{
      status:'',
      data:null
    },
    volume:{
      status:'',
      data:null
    },
    sma:{
      status:'',
      data:null
    },
    ema:{
      status:'',
      data:null
    },
    vwap:{
      status:'',
      data:null
    },
    rsi:{
      status:'',
      data:null
    },
  },
  mutations: {
    setQuotes(state,quotes){
      state.open.status = quotes.open
      state.high.status = quotes.high
      state.low.status = quotes.low
      state.close.status = quotes.close
      state.volume.status = quotes.volume
      state.percent = quotes.percent
    },
    setSeries(state,datasets){
      state.labels = datasets.labels
      state.open.data = datasets.open
      state.close.data = datasets.close
      state.high.data = datasets.high
      state.low.data = datasets.low
      state.volume.data = datasets.volume
    },
    setTechnical(state,datasets){
      state.labels = datasets.labels
      state.sma.status = datasets.sma
      state.sma.data = datasets.smaData
      state.ema.status = datasets.ema
      state.ema.data = datasets.emaData
      state.rsi.status = datasets.rsi
      state.rsi.data = datasets.rsiData
      state.vwap.status = datasets.vwap
      state.vwap.data = datasets.vwapData
      
    }
  },
  actions: {
    setQuotes({commit},quotes){
      commit('setQuotes',quotes)
    },
    setSeries({commit},datasets){
      commit('setSeries',datasets)
    },
    setTechnical({commit}, technical){
      commit('setTechnical',technical)
    }        
    
  }
})
