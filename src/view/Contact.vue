<template>
  <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Contact form</h3>
      <label>Name:</label>
      <input id="name" v-model="contactInfo.name">
      <p v-if="!nameIsValid" class="error-message">The name field is required</p>

      <label>E-post:</label>
      <input id="epost" v-model="contactInfo.epost">
      <p v-if="!epostIsValid" class="error-message">The epost field is required</p>

      <label>Message:</label>
      <textarea id="message" v-model="contactInfo.message"></textarea>
      <p v-if="!messageIsValid" class="error-message">The message field is required</p>

      <button :disabled="!formIsValid" type="submit">Submit</button>
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


