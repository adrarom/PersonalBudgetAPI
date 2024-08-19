<template>
    <div class="dashboard">
      <h2>Your Envelopes</h2>
      <div v-if="envelopes.length === 0">You have no envelopes.</div>
      <ul>
        <li v-for="envelope in envelopes" :key="envelope._id">
          <router-link :to="`/envelope/${envelope._id}`">{{ envelope.name }} - {{ envelope.balance }}</router-link>
        </li>
      </ul>
      <button @click="createEnvelope">Add New Envelope</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        envelopes: [],
      };
    },
    async mounted() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/envelopes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.envelopes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      async createEnvelope() {
        const name = prompt('Enter envelope name');
        const budget = parseFloat(prompt('Enter budget'));
        const token = localStorage.getItem('token');
        
        try {
          await axios.post(
            'http://localhost:5000/api/envelopes',
            { name, budget },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.$router.go();
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  