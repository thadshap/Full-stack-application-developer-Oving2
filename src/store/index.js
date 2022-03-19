import { createStore } from 'vuex'
import ContactService from "../services/ContactService.js";
import LogInService from "../services/LogInService";

export default createStore({
    state: {
        user: 'Thadshajini Paramsothy',
        contacts:[],
        registers:[],
        register:{},
        username: ''
    },
    mutations: {
        ADD_CONTACT(state, contacts){
            state.contacts.push(contacts)
        },
        SET_PROFILE(state, register) {
            state.register = register
        },
        SET_USERNAME(state, username) {
            state.username = username
        },
        SET_PROFILES(state, registers) {
            state.registers = registers
        },
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
        },
        fetchProfile({commit, state}, username){
            const existingProfile = state.registers.find(register => register.username === username)
            if(existingProfile){
                commit('SET_PROFILE', existingProfile)
                commit('SET_USERNAME', username)
            } else{
                LogInService.getProfile(username)
                    .then(response => {
                        commit('SET_PROFILE', response.data)
                    })
                    .catch(error =>{
                        console.log('User' + username + 'not found' + error)
                    })
            }
        },
        fetchProfiles({ commit, state }) {
            LogInService.getProfiles()
                .then(response => {
                    commit('SET_PROFILES', response.data)
                    console.log(
                        'Successfully fetched feedback from server ' + state.registers.length
                    )
                })
                .catch(error => {
                    console.log('could not get profiles' + error)
                })
        },
    },
    modules: {}
})

