import Vue from 'vue'
import App from './App.vue'
import router from './routes/'
import store from './store/'
import './registerServiceWorker'
import './plugins/'
import './components'

const { config } = require('./config.js')

Vue.config.productionTip = false
window.config = {}
window.config.appName = config.appName
new Vue({

	router,
	store,
	//render: h => h(App)
	...App
})//.$mount('#app')
