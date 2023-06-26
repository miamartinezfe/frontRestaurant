<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'
import { defineProps } from 'vue'
const props = defineProps(['userData', 'reservationData'])
const flow = ref(['month', 'day', 'hours', 'minutes'])

const userData = ref({
  userId: '',
  password: '',
  role: { type: 'Cliente' },
  name: '',
  lastName: '',
  idType: '',
  email: ''
})

if (props.userData) {
  userData.value = props.userData
}

const reservationData = ref({
  reservationDate: '',
  reservationType: '',
  people: '',
  descriptionObservations: ''
})

if (props.reservationData) {
  reservationData.value = props.reservationData
}
const handleChange = (event) => {
  userData.value = {
    ...userData.value,
    [event.target.name]: event.target.value
  }
}
const handleChangeRes = (event) => {
  reservationData.value = {
    ...reservationData.value,
    [event.target.name]: event.target.value
  }
}
const onConfirm = async (event) => {
  try {
    await axios.put(`/reservas/confirm/${props.reservationData.id}`)
    alert('La reserva se confirmo con exito')
  } catch (error) {
    alert(error.message)
  }
}
const onUpdate = async (event) => {
  try {
    const user = {
      userId: userData.value.userId,
      password: userData.value.password,
      role: { type: 'Cliente' },
      name: userData.value.name,
      lastName: userData.value.lastName,
      idType: userData.value.idType,
      email: userData.value.email
    }
    const reserva = {
      reservationDate: reservationData.value.reservationDate.replace('=', 'T'),
      reservationType: reservationData.value.reservationType,
      people: Number(reservationData.value.people),
      descriptionObservations: reservationData.value.descriptionObservations
    }
    await axios.put(`/usuarios/${user.userId}`, user)
    await axios.put(`/reservas/update/${props.reservationData.id}`, reserva)
    alert('La reserva se actualizo con exito')
  } catch (error) {
    alert(error.message)
  }
}
const onSubmit = async (event) => {
  event.preventDefault()
  try {
    const user = {
      userId: userData.value.userId,
      password: userData.value.password,
      role: { type: 'Cliente' },
      name: userData.value.name,
      lastName: userData.value.lastName,
      idType: userData.value.idType,
      email: userData.value.email
    }
    const reserva = {
      reservationDate: reservationData.value.reservationDate.replace('=', 'T'),
      reservationType: reservationData.value.reservationType,
      people: Number(reservationData.value.people),
      descriptionObservations: reservationData.value.descriptionObservations
    }
    await axios.post('/usuarios', user)
    await axios.post(`/reservas/${user.userId}`, reserva)
    alert('La reserva se creo con exito')
  } catch (error) {
    alert(error.message)
  }
}
</script>
<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="nombres" class="form-label">Nombres</label>
        <input
          name="name"
          @input="handleChange"
          v-model="userData.name"
          type="text"
          class="form-control"
          id="nombres"
        />
      </div>
      <div class="mb-3">
        <label for="apellidos" class="form-label">Apellidos</label>
        <input
          name="lastName"
          @input="handleChange"
          v-model="userData.lastName"
          type="text"
          class="form-control"
          id="apellidos"
        />
      </div>
      <div class="mb-3">
        <label for="idType" class="form-label">Tipo de identificacion</label>
        <input
          name="idType"
          @input="handleChange"
          v-model="userData.idType"
          type="text"
          class="form-control"
          id="idType"
        />
      </div>
      <div class="mb-3">
        <label for="userId" class="form-label">Numero de identificacion</label>
        <input
          :disabled="props.userData ? true:false"
          name="userId"
          @input="handleChange"
          v-model="userData.userId"
          type="number"
          class="form-control"
          id="userId"
        />
      </div>

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
        <label for="reservationDate" class="form-label">Fecha de Reserva</label>
        <VueDatePicker
          name="reservationDate"
          @input="handleChangeRes"
          v-model="reservationData.reservationDate"
          :flow="flow"
          model-type="yyyy-MM-dd=HH:mm"
        ></VueDatePicker>
      </div>
      <div class="mb-3">
        <label for="reservationType" class="form-label">Tipo de Reserva</label>
        <select
          name="reservationType"
          @input="handleChangeRes"
          v-model="reservationData.reservationType"
          class="form-select"
          id="reservationType"
          aria-label="Default select example"
        >
          <option value="CENA">Cena</option>
          <option value="ALMUERZO">Almuerzo</option>
          <option value="ONCES">Onces</option>
          <option value="CUMPLEANOS">Cumpleaños</option>
          <option value="OCASION_ESPECIAL">Ocasion Especial</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="people" class="form-label">Numero de Personas</label>
        <input
          name="people"
          @input="handleChangeRes"
          v-model="reservationData.people"
          type="number"
          class="form-control"
          id="people"
        />
      </div>

      <div class="mb-3">
        <label for="descriptionObservations" class="form-label">Observaciones</label>
        <textarea
          name="descriptionObservations"
          @input="handleChangeRes"
          v-model="reservationData.descriptionObservations"
          type="text"
          class="form-control"
          id="descriptionObservations"
        ></textarea>
      </div>

      <button :hidden="props.reservationData ? true:false" @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
      <button :disabled="reservationData.reservationDate.length>16 ? true:false" :hidden="props.reservationData ? false:true" @click="onUpdate" type="submit" class="btn btn-warning">Update</button>
      <button :disabled="props.reservationData && props.reservationData.state === 'PENDIENTE' ? false:true" :hidden="props.reservationData ? false:true" @click="onConfirm" type="submit" class="btn btn-success">Confirm</button>
      
    </form>
  </div>
</template>
