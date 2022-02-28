<template>
  <div id="registerContainer">
    <form class="review-form" @submit.prevent="onSubmit">
      <h3 id="registerTitle">Contact form</h3>
      <div id="name">
      <label id="nameLabel">Name:</label>
      <input v-model="contactInfo.name">
      </div>
      <div id="nameError">
      <p v-if="!nameIsValid" class="error-message">Name field is required</p>
      </div>
      <div id="epost">
      <label id="epostLabel">E-post:</label>
      <input v-model="contactInfo.epost">
      </div>
      <div id="epostError">
      <p v-if="!epostIsValid" class="error-message">Email field is required</p>
      </div>
      <div id="message">
      <label id="messageLabel">Message:</label>
      <textarea v-model="contactInfo.message"></textarea>
      </div>
      <div id="messageError">
      <p v-if="!messageIsValid" class="error-message">Message field is required</p>
      </div>

      <button :disabled="!formIsValid" type="submit" id="handleClickRegister">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import Calculator from "./Calculator";

export default {
  data(){
    return{
      contactInfo:{
        id:'',
        name:'',
        epost:'',
        message:'',
        organizer:''
      }
    }
  },
  computed:{
    nameIsValid(){
      return !!this.contactInfo.name
    },
    epostIsValid(){
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return  !!this.contactInfo.epost && regex.test(String(this.contactInfo.epost).toLowerCase())

    },
    messageIsValid(){
      return !!this.contactInfo.message
    },
    formIsValid(){
      return this.nameIsValid && this.epostIsValid && this.messageIsValid
    },
  },
  inject:['GStore'],
  methods: {
    onSubmit() {
      if(this.formIsValid){
        console.log('Form Submitted', this.contactInfo)
      }else{
        console.log('Invalid form')
      }
      const contactInfo={
        ...this.contactInfo,
        id : uuidv4(),
        organizer : this.$store.state.user
      }
      this.$store.dispatch('createContact',contactInfo)
      this.GStore.flashMessage = 'sending -> sent'
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      this.$router.push({
        name: 'Calculator',
        component: Calculator,
      })
    }
  }
}
</script>

<style scoped>
textarea,input{
  margin: 10px 10px 0 10px;
}
#registerContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#registerTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#name, #epost, #message, #handleClickRegister, #nameError, #epostError, #messageError{
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
}

#nameError, #epostError, #messageError{
  color: red;
  margin: 0 0 0 40%;
  font-size: .8em;
}

#nameLabel, #epostLabel, #messageLabel{
  width: 100px;
}

#handleClickRegister{
  margin: 10px 0 0 40%;
}
</style>
