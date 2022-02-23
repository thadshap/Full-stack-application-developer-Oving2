<template>
  <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Contact form</h3>
      <label for="name">Name:</label>
      <input id="name" v-model="contactInfo.name">

      <label for="epost">E-post:</label>
      <input id="epost" v-model="contactInfo.epost">

      <label for="message">Message:</label>
      <textarea id="message" v-model="contactInfo.message"></textarea>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
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
  methods: {
    onSubmit() {
      this.contactInfo.id = uuidv4()
      this.contactInfo.organizer = this.$store.state.user
      console.log("Contacts:", this.contactInfo)
    }
  }
}
</script>