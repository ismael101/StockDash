import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    symbol:'AAPL',
    labels:[],
    percent:0.0,
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
    }
  },
  getters:{
    tableData(state){
      let data = []
      let counter = 0
      state.labels.forEach(element => {
        let obj = {datetime:element,open:state.open.data[counter],high:state.high.data[counter],low:state.low.data[counter],close:state.close.data[counter]}
        data.push(obj)
        counter++
      })
      return data
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
            percent:res.data["Global Quote"]["09. change"]     
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
            labels.push(key)
            open.push(res.data["Time Series (5min)"][key]["1. open"])
            close.push(res.data["Time Series (5min)"][key]["4. close"])
            high.push(res.data["Time Series (5min)"][key]["2. high"])
            low.push(res.data["Time Series (5min)"][key]["3. low"])
            volume.push(res.data["Time Series (5min)"][key]["5. volume"])
        }
        let datasets = {labels:labels,open:open,high:high,low:low,close:close,volume:volume}
        commit('setSeries',datasets)
    }
  }
})