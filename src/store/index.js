import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        selected: 'profile',
        user:{
            id:'',
            username:''
        },
        resume: {
          config: [
            { field: 'profile', icon: 'id' },
            { field: 'workHistory', icon: 'work' },
            { field: 'education', icon: 'book' },
            { field: 'projects', icon: 'heart' },
            { field: 'awards', icon: 'cup' },
            { field: 'contacts', icon: 'phone' },
          ],
          profile: {
            name: 'XXX',
            city: '西安',
            title: 'web开发',
            birthday:'19XX-1-1'
          },
          workHistory: [
            { company: 'XXXXX公司', content: '公司XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'},
            { company: 'XXXXX公司', content: '公司XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'},
          ],
          education: [
            { school: 'XXXXX大学' },
            { school: 'XXXXX高中' },
          ],
          projects: [
            { name: 'project A', content: '文字' },
            { name: 'project B', content: '文字' },
          ],
          awards: [
            { name: '获得XX奖',},
            { name: '获得XX奖',},
          ],
          contacts: [
            { contact: 'phone', content: '13812345678' },
            { contact: 'qq', content: '12345678' },
          ]
        }
    },
    mutations:{
        switchTab:(state,payload)=>{
            state.selected = payload
            localStorage.setItem('state', JSON.stringify(state))
        },
        updateResume:(state, {path, value})=>{
            objectPath.set(state.resume,path,value)
            localStorage.setItem('state', JSON.stringify(state))
        },
        initState:function(state,payload){
            Object.assign(state,payload)
        },
        setUser:function(state, payload){
            Object.assign(state.user, payload)
        },
        removeUser:function(state){
            state.user.id = ''
        }
    }
})