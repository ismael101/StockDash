import axios from 'axios'

export default{
    getSeries(symbol){
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.KEY}`)
                .then(res => {
                    let labels = []
                    let open = []
                    let close = []
                    let high = []
                    let low = []
                    let volume = []
                    for(let key in res.data["Time Series (5min)"]){
                        labels.push(key)
                        let openData = {
                        label: `Open ${key}`,
                        backgroundColor: '#ffd369',
                        data: res.data["Time Series (5min)"][key]["1. open"]
                        }
                        open.push(openData)
                        let closeData = {
                        labels: `Close ${key}`,
                        backgroundColor: '#263f44',
                        data: res.data["Time Series (5min)"][key]["4. close"]
                        }
                        close.push(closeData)
                        let highData = {
                        labels:`High ${key}`,
                        backgroundColor: '#015668',
                        data: res.data["Time Series (5min)"][key]["2. high"]
                        }
                        high.push(highData)
                        let lowData = {
                        labels:`Low ${key}`,
                        backgroundColor: '#fff1cf',
                        data: res.data["Time Series (5min)"][key]["3. low"]
                        }
                        low.push(lowData)
                        let volumeData = {
                        labels:`Volume ${key}`,
                        backgroundColor: '#f87979',
                        data: res.data["Time Series (5min)"][key]["5. volume"]
                        }
                        volume.push(volumeData)
                    }
                    let datasets = {labels:labels,open:open,high:high,low:low,close:close,volume:volume}
                    return(datasets)
                })
    }
}