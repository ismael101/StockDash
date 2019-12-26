import axios from 'axios'

export default{
    getQuotes(symbol){
        return axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.KEY}`)
                .then(res => {
                    let data = {
                        open:res.data["Global Quote"]["02. open"],
                        high:res.data["Global Quote"]["03. high"], 
                        low:res.data["Global Quote"]["04. low"], 
                        close:res.data["Global Quote"]["08. previous close"],
                        volume:res.data["Global Quote"]["06. volume"],
                        percent:res.data["Global Quote"]["09. change"]     
                    }
                    return(data)
                })
    }
}