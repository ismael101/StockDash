import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error:false,
    symbol:'AAPL',
    stocklabels:[],
    technicallabels:[],
    percent:0.0,
    percentchange:0.0,
    open:{
      status:0,
      data:[]
    },
    close:{
      status:0,
      data:[]
    },
    high:{
      status:0,
      data:[]
    },
    low:{
      status:0,
      data:[]
    },
    volume:{
      status:0,
      data:[]
    },
    ema:{
      status:0,
      data:[]
    },
    sma:{
      status:0,
      data:[]
    }
  },
  getters:{
    quoteTable(state){
      let data = []
      let counter = 0
      state.stocklabels.forEach(element => {
        let obj = {datetime:element,open:state.open.data[counter],high:state.high.data[counter],low:state.low.data[counter],close:state.close.data[counter]}
        data.push(obj)
        counter++
      })
      return data
    },
    volumeTable(state){
      let data = []
      let counter = 0
      state.stocklabels.forEach(element => {
        let obj = {datetime:element,volume:state.volume.data[counter]}
        data.push(obj)
        counter++
      })
      return data
    }
  },
  mutations: {
    setQuotes(state,quotes){
      state.open.status = quotes.open
      state.high.status = quotes.high
      state.low.status = quotes.low
      state.close.status = quotes.close
      state.volume.status = quotes.volume
      state.percent = quotes.percent
      state.percentchange = quotes.percentchange
    },
    setSeries(state,datasets){
      state.stocklabels = datasets.labels
      state.open.data = datasets.open
      state.close.data = datasets.close
      state.high.data = datasets.high
      state.low.data = datasets.low
      state.volume.data = datasets.volume
    },
    setTechnical(state,datasets){
      state.technicallabels = datasets.labels
      state.ema.data = datasets.ema
      state.ema.status = datasets.ema[0] 
      state.sma.data = datasets.sma
      state.sma.status = datasets.sma[0] 
    },
    setError(state,bool){
      state.error = bool
    }
  },
  actions: {
    async setQuotes({commit},symbol){
        let res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.KEY}`)
        let quotes = {
            open:res.data["Global Quote"]["02. open"],
            high:res.data["Global Quote"]["03. high"], 
            low:res.data["Global Quote"]["04. low"], 
            close:res.data["Global Quote"]["08. previous close"],
            volume:res.data["Global Quote"]["06. volume"],
            percent:res.data["Global Quote"]["09. change"],
            percentchange:res.data["Global Quote"]["10. change percent"]       
        }
        commit('setQuotes',quotes)
    },
    async setSeries({commit},symbol){
        let res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.KEY}`)
        let labels = []
        let open = []
        let close = []
        let high = []
        let low = []
        let volume = []
        for(let key in res.data["Time Series (5min)"]){
            console.log(key)
            labels.push(key)
            open.push(res.data["Time Series (5min)"][key]["1. open"])
            close.push(res.data["Time Series (5min)"][key]["4. close"])
            high.push(res.data["Time Series (5min)"][key]["2. high"])
            low.push(res.data["Time Series (5min)"][key]["3. low"])
            volume.push(res.data["Time Series (5min)"][key]["5. volume"])
        }
        let datasets = {labels:labels,open:open,high:high,low:low,close:close,volume:volume}
        commit('setSeries',datasets)
    },
    async setTechnical({commit},symbol){
      let ema = []
      let sma = []
      let labels = []
      let res1 = await axios.get(`https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.KEY}`)
      let res2 = await axios.get(`https://www.alphavantage.co/query?function=EMA&symbol=${symbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.KEY}`)
      
      for(let key in res1.data["Technical Analysis: SMA"]){
          labels.push(key)
          sma.push(res1.data["Technical Analysis: SMA"][key]["SMA"])
      }
      for(let key in res2.data["Technical Analysis: EMA"]){
        ema.push(res2.data["Technical Analysis: EMA"][key]["EMA"])
    }
      let datasets = {labels:labels,ema:ema,sma:sma}
      commit('setTechnical', datasets)
    },
    setError({commit}, bool){
      commit('setError',bool)
    }
  }
})