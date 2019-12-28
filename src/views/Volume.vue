<template>
  <div>
      <v-row>
          <v-col lg=5 md=5>
              <v-row>
                  <v-col>
                <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Volume</span></v-card-title>
                <v-card-text class="headline">
                    {{this.$store.state.volume.status}}
                </v-card-text>
                </v-card>
                  </v-col>
                  <v-col>
                <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                    <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Percent</span></v-card-title>
                    <v-card-text class="headline">
                        % {{this.$store.state.percent}}
                    </v-card-text>
                </v-card>
                  </v-col>
                  <v-col>
                <v-card outlined width="175px" height="180px" dark class="blue-grey darken-1">
                    <v-card-title><span class="overline">{{this.$store.state.symbol}}</span><v-spacer/><span class="overline">Open</span></v-card-title>
                    <v-card-text class="headline">
                        % {{this.$store.state.open.status}}
                    </v-card-text>
                </v-card>
                  </v-col>
              </v-row>
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
           <v-col lg=7 md=7>
            <apexchart type=bar height=800 :options="chartOptions" :series="series" v-if='loaded'/>
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
            loaded:false,
            series: [{
            data: []
            }],
            chartOptions: {
            plotOptions: {
                bar: {
                horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                labels:{
                    show:false
                },
                categories:[],
            }
            }

        }
    },
     async mounted(){
      try{
            await this.$store.dispatch('setQuotes',this.$store.state.symbol)
            await this.$store.dispatch('setSeries',this.$store.state.symbol)
            this.chartOptions.xaxis.categories = this.$store.state.labels
            this.series[0].data = this.$store.state.volume.data
            this.loaded = true
        }catch(err){
            console.log(err)
            this.error = true
        }
  }
}
</script>

<style>

</style>