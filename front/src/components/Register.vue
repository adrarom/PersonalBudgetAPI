<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async registerUser() {
        try {
          await axios.post('http://localhost:5000/api/users/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          this.$router.push('/login');
        } catch (error) {
          this.errorMessage = 'Registration failed';
        }
      },
    },
  };
  </script>
  