<template>
  <div>
       <v-alert type="error" outlined v-model='error' dismissible>
          API Timeout Wait a Minute and Refresh
    </v-alert>
    <v-row>
        <v-col>
            <v-card outlined>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card outlined>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card outlined>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card outlined>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col lg=5 md=5>
            
        </v-col>
        <v-col lg=7 md=7>
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
            error:false,
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
    }
}
</script>

<style>

</style>