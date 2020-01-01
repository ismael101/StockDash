<template>
  <div>
        <v-alert type="error" outlined v-if='this.$store.state.error' dismissible>
          API Error
    </v-alert>
    <v-alert type="warning" outlined v-if='!this.$store.state.loaded' dismissble>
        API Timeout
    </v-alert>
    <v-row>
        <v-col>
            <v-card outlined class="blue-grey darken-1" dark>
                 <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Volume</span></v-card-title>
                <v-card-text class="headline">
                    {{this.$store.state.volume.status}}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card outlined class="blue-grey darken-1" dark> 
                <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Percent</span></v-card-title>
                <v-card-text class="headline">
                    {{this.$store.state.percent}}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card outlined class="blue-grey darken-1" dark>
                    <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">SMA</span></v-card-title>
                <v-card-text class="headline">
                    {{this.$store.state.sma.status}}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card outlined class="blue-grey darken-1" dark>
                    <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">EMA</span></v-card-title>
                <v-card-text class="headline">
                    {{this.$store.state.ema.status}}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
        <v-row>
            <v-col lg=8 md=8>
                <apexchart type=area height=695 :options="chartOptions" :series="[{
                name: `Simple Moving Average of ${this.$store.state.symbol}`,
                data: this.$store.state.sma.data
                    },{
                name: `Exponential Moving Average of ${this.$store.state.symbol}`,
                data: this.$store.state.ema.data
                    }]" v-if="this.$store.state.loaded" ref='average'/>
            </v-col>
            <v-col lg=4 md=4>
                 <v-card outlined class="blue-grey darken-1 mb-5" dark>
                        <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Percent Change</span></v-card-title>
                    <v-card-text class="headline">
                        {{this.$store.state.percentchange}}
                    </v-card-text>
                </v-card>
              <v-data-table
                :headers="headers"
                :items="this.$store.getters.volumeTable"
                :items-per-page="10"
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
            {   text: 'Volume',
                align:'left', 
                value: 'volume' 
            }
            ],
            series: [{
            name: `Simple Moving Average of ${this.$store.state.symbol}`,
            data: this.$store.state.sma.data
            },{
            name: `Exponential Moving Average of ${this.$store.state.symbol}`,
            data: this.$store.state.ema.data
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
                name: `SMA of ${this.$store.state.symbol}`,
                data: this.$store.state.sma.data
            },{

                name: `EMA of ${this.$store.state.symbol}`,
                data: this.$store.state.ema.data
            }
            ],
            title: {
                text: 'Moving Average of Apple Stock',
                align: 'left'
            },
            subtitle: {
                text: 'Average Movements',
                align: 'left'
            },
            labels:this.$store.state.technicallabels,
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


        }
    }
}
</script>

<style>

</style>