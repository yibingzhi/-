// stores/counterStore.js
import {defineStore} from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref()
    const userId = ref()
    const isLogin = ref(false)

    function login() {
        isLogin.value = true
    }

    return {user, isLogin, login}
})
