import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import './styles/index.scss'
// 导入SvgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import '@/permission'
// 导入element样式
import 'element-plus/es/components/message/style/css'

const app = createApp(App)
installIcons(app)
app
  .use(store)
  .use(router)
  .mount('#app')
