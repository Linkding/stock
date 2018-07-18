<template>
    <div v-if="show_login" class="mask">
        <div :class="'login-wrap ' + (auth_by == 'signup'?'signup':'')">
            <div class="banner">
                <div class="close" @click="toggle_login"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
            <div class="main">
                <div class="header">
                    <span @click="auth_by='login'" :class="'col-lg-6 ' + (auth_by == 'login'? 'active':'')">登录</span>
                    <span @click="auth_by='signup'" :class="'col-lg-6 ' + (auth_by == 'signup'? 'active':'')">注册</span>
                </div>
                <form  @submit="submit($event)">
                    <div class="input-control">
                        <input id="username"
                             type="text" placeholder="用户名"
                             v-model="current.name"
                             v-validator="'required'"
                             error-el="#username_error"
                        >
                        <div class="error-list">
                            <div id="username_error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" 
                            placeholder="密码"
                            v-validator="'required|min_length:2|max_length:6'"
                            error-el="#password-error" 
                            v-model="current.password"                           
                        >
                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                    <div v-if="auth_by == 'signup'" :key="'signup'"  class="input-control">
                        <input id="repassword" type="password" 
                            placeholder="重复密码"
                            v-validator="'required|shadow:#password'"
                            error-el="#repassword-error"
                            v-model="current.repassword"
                        >
                        <div class="error-list">
                            <div id="repassword-error"></div>
                        </div>
                    </div>
                     <div v-if="auth_by == 'signup'"   class="input-control">
                        <input id="mail" type="text" 
                            placeholder="邮箱"
                            v-validator="'required|mail'"
                            error-el="#mail-error" 
                            v-model="current.mail"   
                        >
                        <div class="error-list">
                            <div id="mail-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <button type="submit">
                            <span v-if="auth_by == 'login'">登录</span>
                            <span v-else>注册</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import validator from "../directive/validator";
import http from "../util/http";
import helper from "../util/helper";
export default {
    directives: { validator },
    data() {
        return {
            auth_by:'login',
            current: {},
            user_id:'',
            show_login: false,
        };
    },
    methods: {
        toggle_login() {
        this.show_login = !this.show_login;
        },
        submit(e) {
        e.preventDefault();
        http
            .post("user/search", {
            where: {
                and: { name: this.current.name }
            }
            })
            .then(r => {
                let row = r.data
                if(row)
                    this.user_id = row[0].id;
                    helper.set('user_id',this.user_id);
                    this.show_login = false;
                    // 向父组件传递参数
                    this.$emit('afterLogin',row)
            });
        }
    }
};
</script>
<style scoped>
.close {
  text-align: right;
  padding: 10px;
}
.fa {
  font-size: 1.5rem;
  font-weight: 300;
  color: #fff;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.mask .login-wrap {
  font-size: 1rem;
  position: absolute;
  width: 40%;
  height: 50%;
  top: 120px;
  left: 30%;
  background: #fff;
}
.mask .login-wrap.signup {
    height: 70%
}
.banner {
  width: 100%;
  height: 60px;
  background: #cba58c;
}
.main {
  margin: 20px 50px;
  /* background: #fff; */
}
.header {
  padding: 5px;
  color: #a7aeb8;
}

.header >*
 {
  padding: 8px 0;
  font-size: 1.2rem;
  text-align: center;
}

.header .active {
  border-bottom: 4px solid #cba58c;
  color: #111;
}
.main .input-control {
  display: block;
}
.main input,
.main button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
.main button {
  background: #cba58c;
}
.error-list {
  color: red;
}
</style>
