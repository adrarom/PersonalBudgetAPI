<template>
    <form @submit.prevent="addTransaction">
      <div>
        <label for="description">Description:</label>
        <input v-model="description" type="text" id="description" required />
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input v-model="amount" type="number" id="amount" required />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['envelopeId'],
    data() {
      return {
        description: '',
        amount: 0,
      };
    },
    methods: {
      async addTransaction() {
        const token = localStorage.getItem('token');
        try {
          await axios.post(
            `http://localhost:5000/api/envelopes/${this.envelopeId}/transactions`,
            {
              description: this.description,
              amount: this.amount,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.$emit('transactionAdded');
          this.description = '';
          this.amount = 0;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  