<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="actions">
        <div v-if="logined" class="userActions">
          <span class="welcome">你好,{{user.username}}</span>
          <a href="#" class="button" @click.prevrnt="signOut">退出</a>
        </div>
        <div v-else class="userActions">
          <a href="#" class="button primary" @click.prevent="signUpDialogVisible=true">注册</a>
          
          <a class="button primary" href="#" @click.prevent="signInDialogVisible = true">登录</a>
          
        </div>
        <button class="button primary">保存</button>
        <button class="button primary">预览</button>
      </div>
    </div>
    <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <SignUpForm @success="signIn($event)"/>
    </MyDialog>
    <MyDialog title="登陆" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </MyDialog>
  </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import AV from '../lib/leancloud'
export default {
  name: 'Topbar',
  data:function(){
    return {
      signUpDialogVisible: false,
      signInDialogVisible: false
    }
  },
   components:{
      MyDialog,SignUpForm,SignInForm
    },
    computed:{  
      user(){
        return this.$store.state.user
      },
      logined:function(){
        return this.user.id
      }
    },
    methods:{
      signIn:function(user){
        this.signUpDialogVisible = false
        this.signInDialogVisible = false
        this.$store.commit('setUser', user)
      },
      signOut:function(){
        AV.User.logOut()
        this.$store.commit('removeUser')
      }
    }
}
</script>

<style lang="scss" scoped>
  #topbar{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    >.wrapper{
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height:64px;
    }
    >.wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo{
      font-size:24px;
      color:#000000;
    }
  }
  .button{ 
    width:72px;
    height:32px;
    border: none;
    cursor: pointer;
    font-size: 18px; 
    background:#ddd;
    color: #222;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover{
      box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
    }
    &.primary{
      background:#02af5f;
      color: white;
    }
  }
  .actions{
    display: flex;
    .userActions{
      margin-right: 3em;
      .welcome{
        margin-right: .5em;
      }
    }
  }
</style>