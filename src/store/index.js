import { createStore } from 'vuex'
import ContactService from "../services/ContactService.js";


export default createStore({
    state: {
        user: 'Thadshajini Paramsothy',
        contacts:[]
    },
    mutations: {
        ADD_CONTACT(state, contacts){
            state.contacts.push(contacts)
        }
    },
    actions: {
        createContact({commit},contactInfo){
            ContactService.postContact(contactInfo)
                .then(() => {
                    commit('ADD_CONTACT',contactInfo)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    modules: {}
})