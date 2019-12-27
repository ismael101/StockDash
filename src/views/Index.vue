<template>
  <div>
      <v-alert type="error" outlined v-model='error' dismissible>
          API Timeout Wait a Minute and Refresh
    </v-alert>
    <v-row>
        <v-col lg=4 md=4>
            <v-row>
                <v-col>
                    <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1" :loading="loading">
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
            <apexchart ref='seriesChart' type=area height=440 :options="chartOptions" :series="series" class="overline" />
        </v-col>
    </v-row>
    <v-row>
        <v-col lg=10 md=10>
            <v-data-table
                :headers="headers"
                :items="this.$store.getters.tableData"
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
        </v-col>
        <v-col lg=2 md=2>
            <v-card outlined dark class="blue-grey darken-1">
                <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Percent</span></v-card-title>
                    <v-card-text class="headline">
                        % {{this.$store.state.open.status}}
                    </v-card-text>
            </v-card>
        </v-col>
    </v-row>
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
            name: `STOCK ${this.$store.state.symbol}`,
            data: this.$store.state.close.data
            }],
            chartOptions: {
            chart: {
                zoom: {
                enabled: false,
                foreColor: '#373d3f'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [{
                name: "STOCK ABC",
                data: this.$store.state.close.data
            }],
            title: {
                text: 'Stock Price Analysis',
                align: 'left'
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left'
            },
            labels: this.$store.state.labels,
            xaxis: {
                type: 'datetime',
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
            this.loaded = true
            await this.$store.dispatch('setQuotes',this.$store.state.symbol)
            await this.$store.dispatch('setSeries',this.$store.state.symbol)
            this.loaded = false
            this.$refs.seriesChart.updateSeries()
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