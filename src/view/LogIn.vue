<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <input v-model="username" id="u">
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <input v-model="password" id="p">
      <p id="header">{{header}}</p>
      <button v-on:click="handleClickSignin" id="logging">Sign in</button>
    </div>
  </div>
</template>

<script>
import Calculator from "./Calculator";

export default {
  name: 'LoginComponent',
  created() {
    this.$store.dispatch('fetchProfiles')
  },

  methods: {
    handleClickSignin (){
      this.$store.dispatch('fetchProfile', this.username)
      const fetchedProfile = this.$store.state.register

      if(
          fetchedProfile.username === this.username &&
          fetchedProfile.password === this.password
      ){
        this.$router.push({
          name: 'Calculator',
          component: Calculator,
        })
      }else if (fetchedProfile.username === this.username){
        this.header = 'Wrong password'
      }
      else {
        this.header = 'Login failed'
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      header: ''
    }
  }
}
</script>

<style scoped>
input{
  margin: 10px;
}
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#loginTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#username, #password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
}

#usernameLabel, #passwordLabel {
  width: 100px;
}

</style>