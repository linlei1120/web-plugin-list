import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 尝试获取本地是否存在变量

let vuex_user = uni.getStorageSync('vuex_user') || ''
let vuex_is_login = uni.getStorageSync('vuex_is_login') || ''

// 标记需要永久存储的变量，在每次启动时取出，在state中的变量名
let saveStateKeys = ['vuex_user','vuex_is_login','vuex_status_bar_height','vuex_custom_bar_height','uuid','access_token','usercode']

// 保存变量到本地存储
const saveLocalData = function(key, value) {
  // 判断变量是否在存储数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 将变量再次放回本地存储中
    uni.setStorageSync(key, value)
  }
}

const store = new Vuex.Store({
  state: {
    // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
    vuex_user: vuex_user || '昵称',
    
    // app版本
    vuex_version: "1.0.0",
    // 是否使用自定义导航栏
    vuex_custom_nav_bar: true,
    // 状态栏高度
    vuex_status_bar_height: 0,
    // 自定义导航栏的高度
    vuex_custom_bar_height: 0,
    // 自定义导航栏的高度-内容高度
    vuex_custom_scroll_height: 0,
    // index - height
    vuex_custom_index_height: 0,
	//是否登录
	vuex_is_login: vuex_is_login || false,
	// 自定义导航栏的高度-内容-margin-top
	vuex_padding_top : 64,
	
	uuid: '',
	access_token:'',
	usercode:'',
	nickname: false,
	imgUrl: '',
  },
  mutations: {
    $tStore(state, payload) {
      // 判断是否多层调用，state中为对象存在的情况，例如user.info.score = 1
      let nameArr = payload.name.split('.')
      let saveKey = ''
      let len = nameArr.length
      if (len >= 2) {
        let obj = state[nameArr[0]]
        for (let i= 1; i < len - 1; i++) {
          obj = obj[nameArr[i]]
        }
        obj[nameArr[len - 1]] = payload.value
        saveKey = nameArr[0]
      } else {
        // 单层级变量
        state[payload.name] = payload.value
        saveKey = payload.name
      }
      
      // 保存变量到本地中
      saveLocalData(saveKey, state[saveKey])
    }
  },
  actions: {
  }
})

export default store