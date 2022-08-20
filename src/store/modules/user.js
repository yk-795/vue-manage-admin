import { login, getUserInfo } from '@/api/sys'
import { TOKEN } from '@/constant'
// import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  // 表示是一个单独的模块，不会被合并到主模块里面
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setuserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     *登录请求动作
     */
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(data => {
          commit('setToken', data.token)
          // 保存登录时间
          setTimeStamp()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     *获取用户信息
     */
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      commit('setuserInfo', res)
      return res
    },
    /**
    *退出登录
    */
    logout({ commit }) {
      commit('setToken', '')
      commit('setuserInfo', {})
      removeAllItem()
      // TODO：清理掉权限相关配置
      router.push('/login')
    }
  }
}
