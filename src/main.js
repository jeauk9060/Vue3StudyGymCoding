import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 부트스트랩 및 스타일 추가
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 앱 생성 및 마운트
createApp(App).use(router).mount('#app');
