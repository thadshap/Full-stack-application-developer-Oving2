<template>
  <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Contact form</h3>
      <label>Name:</label>
      <input id="name" v-model="contactInfo.name">

      <label>E-post:</label>
      <input id="epost" v-model="contactInfo.epost">

      <label>Message:</label>
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
  inject:['GStore'],
  methods: {
    onSubmit() {
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
    }
  }
}
</script>