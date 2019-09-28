import Vue from 'vue'
// 引入i18n国际化插件
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import { userInfo } from './api'
import { Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option } from 'element-ui'
import { getStore } from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
Vue.use(VueContentPlaceholders)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueI18n)
locale.use(lang)

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/home', '/goods', '/item', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods', '/aboutUs', '/ipCopyright', '/returnRefund', '/privacy', '/shipLocation', '/customDuty', '/customerService', '/faq'] // 不需要登陆的页面

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/assets/langs/chinese.json'),
    'en': require('@/assets/langs/english.json')
  }
})

router.beforeEach(function (to, from, next) {
  let params = {
    params: {
      token: getStore('token')
    }
  }
  userInfo(params).then(res => {
    if (res.result.state !== 1) { // 没登录
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        next()
      } else {
        next('/login')
      }
    } else {
      store.commit('RECORD_USERINFO', {info: res.result})
      if (to.path === '/login') { //  跳转到
        next({path: '/'})
      }
      next()
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
