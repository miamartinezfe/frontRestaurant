<template>
  <div>
    <input
      class="form-control me-2"
      v-model="searchTerm"
      type="search"
      placeholder="Buscar"
      aria-label="Search"
    />
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Tipo de Documento</th>
            <th scope="col">Identificacion</th>
            <th scope="col">Email</th>
            <th scope="col">Fecha de la Reserva</th>
            <th scope="col">Tipo de Reserva</th>
            <th scope="col"># Personas</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user in filteredArray" :key="user.userId">
            <tr v-for="reserva in user.reservas" :key="reserva.id">
              <td>{{ user.name }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.idType }}</td>
              <td>{{ user.userId }}</td>
              <td>{{ user.email }}</td>
              <td>{{ reserva.reservationDate.slice(0, 16) }}</td>
              <td>{{ reserva.reservationType }}</td>
              <td>{{ reserva.people }}</td>
              <td>{{ reserva.state }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  :data-bs-target="'#exampleModal-' + user.userId + '-' + reserva.id"
                  data-bs-toggle="modal"
                >
                  Edit
                </button>

                <!-- Modal -->
                <div
                  :id="'exampleModal-' + user.userId + '-' + reserva.id"
                  class="modal fade"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Reserva</h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <Form
                          :confirmed="reserva.state === 'PENDIENTE' ? false : true"
                          :userData="user"
                          :reservationData="reserva"
                          :key="user.userId + '-' + reserva.id"
                          :update="update"
                        ></Form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import Form from '../components/Form.vue'
const array = ref([])
onMounted(async () => {
  const data = await axios.get('/usuarios')
  array.value = data.data
})

const update = async () => {
  const data = await axios.get('/usuarios')
  array.value = data.data
}
const searchTerm = ref('')
const filteredArray = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return array.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.idType.toLowerCase().includes(term) ||
      user.userId.toString().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.reservas.some((reserva) => reserva.reservationDate.toLowerCase().includes(term)) ||
      user.reservas.some((reserva) => reserva.reservationType.toLowerCase().includes(term)) ||
      user.reservas.some((reserva) => reserva.people.toString().includes(term)) ||
      user.reservas.some((reserva) => reserva.state.toLowerCase().includes(term))
    )
  })
})
</script>
