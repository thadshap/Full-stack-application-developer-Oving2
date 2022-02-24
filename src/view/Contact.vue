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
    <div>{{$store.state.contacts}}</div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import ContactService from "../services/ContactService";
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
      const contactInfo={
        ...this.contactInfo,
        id : uuidv4(),
        organizer : this.$store.state.user
      }
      console.log("Contacts: ", contactInfo)
      ContactService.postContact(contactInfo)
      .then(() => {
          //this.$store.commit('ADD_CONTACT',contactInfo)
          })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>