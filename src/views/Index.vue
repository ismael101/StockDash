<template>
  <div>
      <v-alert type="error" outlined v-model='error' dismissible>
          API Timeout Wait a Minute and Refresh
    </v-alert>
    <v-row>
        <v-col lg=4 md=4>
            <v-row>
                <v-col>
                    <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                        <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Open</span></v-card-title>
                        <v-card-text class="headline">
                            $ {{this.$store.state.open.status}}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                        <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">High</span></v-card-title>
                        <v-card-text class="headline">
                            $ {{this.$store.state.high.status}}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                        <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Low</span></v-card-title>
                        <v-card-text class="headline">
                            $ {{this.$store.state.low.status}}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                        <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Close</span></v-card-title> 
                         <v-card-text class="headline">
                        $ {{this.$store.state.close.status}}
                    </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col lg=8 md=8>
                <apexchart type=area height=440 :options="chartOptions" :series="series" v-if="loaded"/>
        </v-col>
    </v-row>
            <v-data-table
                :headers="headers"
                :items="this.$store.getters.quoteTable"
                :items-per-page="5"
                item-key="datetime"
                :footer-props="{
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus'}"
                dark
                class='blue-grey darken-1 overline'
                >
            </v-data-table>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
    components:{
        apexchart: VueApexCharts,
    },
    data(){
        return{
            headers: [
            {
                text: 'Datetime',
                align: 'left',
                value: 'datetime',
            },
            {   text: 'Open',
                align:'left', 
                value: 'open' 
            },
            {   text: 'High',
                align:'left', 
                value: 'high' 
            },
            {   text: 'Low',
                align:'left', 
                value: 'low' 
            },
            {   text: 'Close',
                align:'left', 
                value: 'close' 
            },
            ],
            error:false,
            loaded:false,
            series: [{
            name: `Stock ${this.$store.state.symbol}`,
            data: []
            }],
            chartOptions: {
            chart: {
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [{
                name: `STOCK ${this.$store.state.symbol}`,
                data: []
            }],
            title: {
                text: 'Time Series of Apple Stock',
                align: 'left'
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left'
            },
            labels:[],
            xaxis:{
                labels: {
                show: false,
                }
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
            }

    }},
  methods:{
    
  },
  async mounted(){
      try{
            await this.$store.dispatch('setQuotes',this.$store.state.symbol)
            await this.$store.dispatch('setSeries',this.$store.state.symbol)
            this.chartOptions.labels = this.$store.state.labels
            this.series[0].data = this.$store.state.close.data
            this.chartOptions.series[0].data = this.$store.state.close.data
            this.loaded = true
        }catch(err){
            console.log(err)
            this.error = true
        }
  }
}
</script>

<style>
.quote{
    font-size: 25px
}
</style>