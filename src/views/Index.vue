<template>
  <div>
      <v-row>
          <v-col>
              <v-card outlined>
                  <v-card-title>
                      <span class="overline">AAPL</span>
                      <v-spacer></v-spacer>
                      <span class='overline'>Open</span>
                  </v-card-title>
                  <v-card-text class="text-center py-10">
                      <span class='display-3'>{{this.$store.state.open.status}}</span>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col>
              <v-card outlined>
                  <v-card-title>
                      <span class="overline">AAPL</span>
                      <v-spacer></v-spacer>
                      <span class='overline'>Close</span>
                  </v-card-title>
                  <v-card-text class="text-center py-10">
                      <span class='display-3'>{{this.$store.state.close.status}}</span>
                  </v-card-text>
              </v-card>
          </v-col>
           <v-col>
              <v-card outlined>
                  <v-card-title>
                      <span class="overline">AAPL</span>
                      <v-spacer></v-spacer>
                      <span class='overline'>High</span>
                  </v-card-title>
                  <v-card-text class="text-center py-10">
                      <span class='display-3'>{{this.$store.state.high.status}}</span>
                  </v-card-text>
              </v-card>
          </v-col>
           <v-col>
              <v-card outlined>
                  <v-card-title>
                      <span class="overline">AAPL</span>
                      <v-spacer></v-spacer>
                      <span class='overline'>Low</span>
                  </v-card-title>
                  <v-card-text class="text-center py-10">
                      <span class='display-3'>{{this.$store.state.low.status}}</span>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-card outlined v-if="loaded">
          <v-card-title>
               <span class="overline">AAPL</span>
                <v-spacer></v-spacer>
                <span class='overline'>Time Series</span>
          </v-card-title>
          <v-card-text>
              <apexchart type=area height=350 :options="chartOptions" :series="series" />
          </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
  data(){
      return{
           loaded: false,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
      }
  },
  methods:{
    fillData(){
        this.$quotes.getQuotes(this.$store.state.symbol)
                .then(res => {
                    this.$store.dispatch('setQuotes',res)
                })
        this.$series.getSeries(this.$store.state.symbol)
                .then(res => {
                    this.$store.dispatch('setSeries',res)         
                })   
        this.loaded = true
      },
  },
  async mounted(){
      await this.fillData()
  }
}
</script>

<style>

</style>