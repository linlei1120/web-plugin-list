import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'
import TuniaoUI from 'tuniao-ui'
Vue.use(TuniaoUI)

import uView from "uview-ui";
Vue.use(uView);

import './uni.promisify.adaptor'
Vue.config.productionTip = false

let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})

Vue.prototype.$today = (type)=>{//当日
	//今天的时间
	var day = new Date();
	day.setTime(day.getTime());
	var year = day.getFullYear();
	var month = (day.getMonth() + 1) < 10 ? '0'+ (day.getMonth() + 1) : (day.getMonth() + 1);
	var day = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
		
	if (type == 1) {
		return year;
	} else if (type == 2) {
		return year+"-" + month;
	} else if (type == 3) {
		return year+"-" + month + "-" + day;
	} else {
		return year+"-" + month + "-" + day;
	}
}

import request from './config/request.js'
Vue.use(request, app)
// (app)

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif