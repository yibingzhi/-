// src/api/user.js
import http from './http';

const userApi = {
    login(params) {
        return http.post('/user/login', null, {params: params});

    },

    // getUserInfo() {
    //     return http.get('/user/info');
    // },
    getUserInfo(params) {
        return http.get('/user/getUserById', {params: params});
    },

    register(data) {
        return http.post('user/register', data);
    }
    // 其他用户相关的API
};

export default userApi;