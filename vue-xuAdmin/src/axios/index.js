/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-02
 * Description: 文件描述
 */
import axios from 'axios'
import Cookies from 'js-cookie'
import { Message } from "element-ui";
// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = process.env.API_HOST;
console.log(axios.defaults.baseURL);
// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    if (Cookies.get('access_token')) {
      //用户每次操作，都将cookie设置成半小时
      // Cookies.set('access_token', Cookies.get('access_token') ,{ expires: 7 });
      config.headers.Authorization = "Bearer" + Cookies.get('access_token')
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 11000) {
      Message({
        message: '长时间未操作,请重新登录',
        type: 'warning'
      });
      Cookies.remove('access_token');
      setTimeout(() => {
        location.reload()
      }, 3000)
      return Promise.reject()
    }else if(response.data.code === 10000){
      return Promise.reject(response)
    }else {
      return Promise.resolve(response);
    }
  },
  error => {
    if (error.response.status === 404) {
      Message({
        message: '请求地址出错',
        type: 'warning'
      });
    }else if (error.response.status === 401) {
      Message({
        message: error.response.data.message,
        type: 'warning'
      });
      Cookies.remove('access_token');
      setTimeout(() => {
        location.reload()
      }, 3000)
      return false
    }
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
export default axios;
