<template>
 <v-app >
   <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent dark color='blue-grey darken-3'>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>dashboard</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Stock</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-app-bar app flat>
     <v-toolbar-title>
      Stock Dashboard
     </v-toolbar-title>
   </v-app-bar>
   <v-content>
     <v-container fluid>
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
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'donut_large' },
        ],
        mini: true,
      }
    }
};
</script>
