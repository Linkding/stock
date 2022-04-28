<template>
<div class="container">
    <div class="login-box">
        <h3>stock 登录</h3>
        <el-form ref="form">
            <el-form-item label="登录名">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="登录名2">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="登录名3">
                <el-input></el-input>
            </el-form-item>
        </el-form>
        


    </div>
</div>
  
</template>
<script>
  export default {
   
  }
</script>
<style  scoped>
    .container {
        height :100%;
        width: 100%;
        background: rgba(129, 127, 127, 0.8)
    }
    .login-box{
        width: 450px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: rgba(202, 147, 147, 0.8)
    }
</style>