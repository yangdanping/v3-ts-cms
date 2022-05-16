import { createApp } from 'vue';
import App from './App.vue';
import init from '@/global';
import 'normalize.css';
import './assets/css/index.scss';
// import '@/service/axios_demo(演示用)';

const app = createApp(App);
init.call(app);

console.log('当前环境', process.env.NODE_ENV, '接口', process.env.VUE_APP_BASE_URL);
