// src/api/http.js
import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:8080", // 使用环境变量设置基础URL
    timeout: 10000, // 请求超时时间
    // withCredentials: true, // 允许跨域请求携带cookie
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 添加请求头
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 对响应数据做处理
        return response.data;
    },
    error => {
        if (error.response) {
            // 处理错误
        }
        return Promise.reject(error);
    }
);

export default http;