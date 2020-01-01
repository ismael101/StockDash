<template>
 <v-app>
   <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent dark color='blue-grey darken-1'>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>dashboard</v-icon>
        </v-list-item-avatar>

        <v-list-item-title class="overline">Menu</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router :to='item.route'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="overline">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-app-bar app flat class="blue-grey lighten-4"> 
     <v-toolbar-title class="font-weight-light overline">
      Apple Stock Analytics
     </v-toolbar-title>
     <v-spacer/>
   </v-app-bar>
   <v-content class="blue-grey lighten-4">
     <v-container fluid class="blue-grey lighten-4 py-8 px-8">
       <router-view/>
     </v-container>
   </v-content>
 </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
      return {
        drawer: true,
        items: [
          { title: 'Quotes', icon: 'timeline', route:'/' },
          { title: 'Technical', icon: 'equalizer', route:'/technical' },
        ],
        mini: true,
      }
    },
  async mounted(){
    try{
      this.$store.dispatch('setError',false)
      await this.$store.dispatch('setQuotes',this.$store.state.symbol)
      await this.$store.dispatch('setSeries',this.$store.state.symbol)
      await this.$store.dispatch('setTechnical',this.$store.state.symbol)
      this.$store.dispatch('setLoaded',true)
    }catch(err){
      this.$store.dispatch('setError',true)
    }
  }
};
</script>
