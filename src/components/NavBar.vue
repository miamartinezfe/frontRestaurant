<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Restaurante</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="admin === 'access'">
            <router-link @click="handleClick" class="nav-link active" to="/">Sign Out</router-link>
          </li>
          <li v-else>
            <router-link @click="handleClick" class="nav-link active" to="/login"
              >Log In</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/adminDashboard">DashBoard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { watch, ref } from 'vue'
import { router } from '../router';
const admin = ref(localStorage.getItem('admin'))
watch(
  () => router.currentRoute.value.name,
  (newValue) => {
    admin.value = localStorage.getItem('admin')
  }
)

const handleClick = () => {
  if (admin.value === 'access') {
    localStorage.setItem('admin', '')
    admin.value = ''
  }
}
</script>
