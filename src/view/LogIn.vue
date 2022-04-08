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
      <input v-model="password" id="p" type="password">
      <p id="header">{{header}}</p>
      <button v-on:click="handleClickSignin" id="logging">Sign in</button>
    </div>
    <label id="loginstatusLabel">{{loginStatus}}</label>
  </div>
</template>

<script>
import Calculator from "./Calculator";
import service from "../services/LogInService";
export default {
  name: 'LoginComponent',
  created() {
    this.$store.dispatch('fetchProfiles')
  },

  methods: {
    handleClickSignin (){
      /**
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
      }*/
      const loginRequest = { username: this.username, password: this.password };
      const loginResponse = service.doLogin(loginRequest);
      console.log(loginResponse)
      loginResponse.then((resolvedResult) => {
        if (resolvedResult.loginStatus === 'Success') {
          this.$store.dispatch('fetchProfile', this.username)
          const fetchedProfile = this.$store.state.register

          if (
              fetchedProfile.username === this.username &&
              fetchedProfile.password === this.password
          ) {
            this.$router.push({
              name: 'Calculator',
              component: Calculator,
            })
          }
        }
        else {
          this.loginStatus = "Failed, please try again!";
        }
      });
    }
  },
  data() {
    return {
      username: '',
      password: '',
      header: '',
      loginStatus: '',
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