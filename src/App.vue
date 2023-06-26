<script setup>
import Footer from '../src/components/Footer.vue'
import Navbar from '../src/components/NavBar.vue'
</script>

<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-3">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
