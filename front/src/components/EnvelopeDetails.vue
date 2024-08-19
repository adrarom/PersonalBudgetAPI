<template>
    <div>
      <h2>{{ envelope.name }}</h2>
      <p>Balance: {{ envelope.balance }}</p>
      <ul>
        <li v-for="transaction in envelope.transactions" :key="transaction._id">
          {{ transaction.description }} - {{ transaction.amount }}
        </li>
      </ul>
      <TransactionForm @transactionAdded="fetchEnvelope" :envelopeId="envelope._id" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TransactionForm from './TransactionForm.vue';
  
  export default {
    components: { TransactionForm },
    data() {
      return {
        envelope: null,
      };
    },
    async mounted() {
      this.fetchEnvelope();
    },
    methods: {
      async fetchEnvelope() {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/envelopes/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.envelope = response.data;
      },
    },
  };
  </script>
  