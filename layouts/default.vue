<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawer">
      <v-list two-line dense>
        <v-list-tile v-for="(menu, i) in menus" :key="i" avatar @click="$router.push(menu.path)">
          <v-list-tile-avatar>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{menu.title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title>Password Generator</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018 - Password Generator</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    menus: [
      { title: 'Home', icon: 'home', path: '/' },
      { title: 'Generator', icon: 'build', path: '/generator' },
      { title: 'History', icon: 'history', path: '/history' }
    ]
  })
}
</script>