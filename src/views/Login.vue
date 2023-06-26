<script setup>
import { ref } from 'vue'
import {router} from '../router/index'
import axios from 'axios'
const userData = ref({
  password: '',
  email: ''
})

const handleChange = (event) => {
  userData.value = {
    ...userData.value,
    [event.target.name]: event.target.value
  }
}

const onSubmit = async (event) => {
  event.preventDefault();
  const user = {
    password: userData.value.password,
    email: userData.value.email
  }
  try {
    const admin = await axios.post('/usuarios/login', user);
    localStorage.setItem('admin', admin.data);
    if(admin.data==='access'){        
        router.push('/admindashboard');
    }
    else alert('El usuario ingresado no tiene permisos');
  } catch (error) {
    alert(error.message)
  }
}
</script>
<template>
  <div class="container text-center mt-3"><h1>Log In</h1></div>
  <div class="container mt-3">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          name="email"
          @input="handleChange"
          v-model="userData.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          name="password"
          @input="handleChange"
          v-model="userData.password"
          type="password"
          class="form-control"
          id="password"
        />
      </div>

      <button @click="onSubmit" type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
