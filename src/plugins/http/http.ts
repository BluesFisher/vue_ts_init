import axios from 'axios';

const instance = axios.create({
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        token: 'one'
    },
    baseURL: process.env.NODE_ENV === 'production' ? `https://health.tengmed.com` : '/',
    timeout: 5000,
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        // 在发送请求之前做某事，比如说 设置token
        config.headers.token = 'token';
        return config;
    },
    error => {
        // 请求错误时做些事
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做些事
        const status = response.status;
        if (status === 200) {
            const result = response.data;
            if (result.retcode === 304 && result.url) {
                location.href = result.url;
            }
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);

export default instance;
