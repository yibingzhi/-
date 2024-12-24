import {defineStore} from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref()

    const isLogin = ref(false)


    function login(userData) {
        user.value = userData

        isLogin.value = true

    }

    function logout() {
        user.value = null

        isLogin.value = false

    }

    function resetState() {
        logout(); // 使用 logout 方法来清除状态
    }

    return {
        user,

        isLogin,

        login,
        logout,
        resetState
    }
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'userStore',
                storage: localStorage,
                paths: ['user', 'isLogin',],
                afterRestore: (context) => {
                    // 在恢复状态后进行一些检查或操作
                    // 例如，如果没有登录状态，就执行登出操作
                    if (!context.store.isLogin) {
                        context.store.logout();
                    }
                }
            }
        ]
    }
})
