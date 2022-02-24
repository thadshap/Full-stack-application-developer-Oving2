import { createStore } from 'vuex'

export default createStore({
    state: {
        user: 'Thadshajini Paramsothy',
        contacts:[]
    },
    mutations: {
        ADD_CONTACT(state, contact){
            state.contacts.push(contact)
        }
    },
    actions: {},
    modules: {}
})