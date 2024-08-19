<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post('http://localhost:5000/api/users/login', {
            email: this.email,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push('/dashboard');
        } catch (error) {
          this.errorMessage = 'Invalid email or password';
        }
      },
    },
  };
  </script>
  