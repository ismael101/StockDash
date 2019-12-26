import axios from 'axios'

export default{
    getSma(symbol){
        return axios.get(`https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=5min&time_period=10&series_type=open&apikey=${process.env.KEY}`)
                    .then(res => {
                        let labels = []
                        let sma = []
                        for(key in res["Technical Analysis: SMA"]){
                            let smaData = {
                              labels:`SMA ${key}`,
                              backgroundColor:'#f87979',
                              data: res["Technical Analysis: SMA"][key]["SMA"]
                            }
                            labels.push(key)
                            sma.push(smaData)
                          } 
                          return{labels:labels,sma:sma}  
                    })
    },
    getEma(symbol){
        return axios.get(`https://www.alphavantage.co/query?function=EMA&symbol=${symbol}&interval=5min&time_period=10&series_type=open&apikey=${process.env.KEY}`)
                    .then(res => {
                        let ema = []
                        for(key in res["Technical Analysis: EMA"]){
                            let emaData = {
                              labels: `EMA ${key}`,
                              backgroundColor:'#f87979',
                              data:res["Technical Analysis: EMA"][key]["EMA"]
                            }
                            ema.push(emaData)
                          }
                          return{ema:ema}
                    })
    },
    getRsi(symbol){
        return axios.get(`https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=5min&time_period=10&series_type=open&apikey=${process.env.KEY}`)
                    .then(res => {
                        let rsi = []
                        for(key in res["Technical Analysis: RSI"]){
                            let rsiData = {
                              labels: `RSI ${key}`,
                              backgroundColor:'#f87979',
                              data:res["Technical Analysis: RSI"][key]["RSI"]
                            }
                            rsi.push(rsiData)
                          }
                          return{rsi:rsi}
                    })

    },
    getVwap(symbol){
        return axios.get(`https://www.alphavantage.co/query?function=VWAP&symbol=${symbol}&interval=5min&apikey=${process.env.KEY}`)
                    .then(res => {
                        let vwap = []
                        for(key in res["Technical Analysis: VWAP"]){
                            let vwapData = {
                              labels: `VWAP ${key}`,
                              backgroundColor:'#f87979',
                              data:res["Technical Analysis: VWAP"][key]["VWAP"]
                            }
                            vwap.push(vwapData)
                          }
                        return{vwap:vwap}
                    })

    }
}