<template>
  <div class="login-container">
    <div class="login-left">
      <div class="login-art">
        <div class="shape orange"></div>
        <div class="shape purple"></div>
        <div class="shape black"></div>
        <div class="shape yellow"></div>
      </div>
    </div>
    <div class="login-right">
      <div class="login-content">
        <div class="login-header">
          <h2>Welcome back!</h2>
          <p>Please enter your details</p>
        </div>
        <form @submit.prevent="loginUser">
          <div class="input-group">
            <input v-model="email" type="email" placeholder="Email" required />
          </div>
          <div class="input-group password-group">
            <input v-model="password" type="password" placeholder="Password" required />
            <span class="eye-icon">👁️</span>
          </div>
          <div class="extra-options">
            <label>
              <input type="checkbox" v-model="rememberMe" />
              Remember for 30 days
            </label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" class="login-button">Log In</button>
        </form>
        <div class="signup-link">
          <p>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
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

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
}

.login-left, .login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-left {
  background-color: #e5e5e5;
}

.login-art {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.shape {
  width: 100px;
  height: 100px;
  display: inline-block;
}

.orange {
  background-color: #ff6f3f;
  border-radius: 50px;
}

.purple {
  background-color: #5631d0;
  height: 150px;
}

.black {
  background-color: #1d1d1d;
  height: 120px;
}

.yellow {
  background-color: #f8d247;
}

.login-right {
  background-color: white;
  padding: 40px;
}

.login-content {
  width: 100%;
  max-width: 350px;
  text-align: center;
}

.login-header h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.login-header p {
  color: #888;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-group {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.extra-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.google-button {
  width: 100%;
  padding: 10px;
  background-color: #f2f2f2;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signup-link {
  margin-top: 20px;
}

.signup-link a {
  color: black;
  text-decoration: underline;
}
</style>
