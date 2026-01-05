<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :elevation="2" color="teal-darken-4">
      <v-app-bar-title>Application Bar</v-app-bar-title>
      <template v-slot:append v-if="$route.path !== '/login' && $route.path !== '/register'">

        <v-btn class="ma-10" @click="to_services_page">Услуги</v-btn>

        <v-btn class="ma-10">Боты</v-btn>

        <v-btn class="ma-10">Покупатели</v-btn>

        <v-btn class="ma-10" v-if="isLoggedIn" @click="to_login_page">Выход</v-btn>
        <v-btn class="ma-10" v-else="isLoggedIn" @click="to_login_page">Вход</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center" class="fill-height">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="teal-darken-4" class="mt-auto" app>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2" rounded="xl">
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>My Application</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const links = [
  'Home',
  'About Us',
  'Team',
  'Services',
  'Blog',
  'Contact Us',
]

const router = useRouter()

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('ACCESS_TOKEN')
})

const to_login_page = () => {
  localStorage.removeItem('ACCESS_TOKEN')
  router.push('/login')
}

const to_services_page = () => {
  router.push('/services')
}
</script>