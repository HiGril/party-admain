<template>
 <div class="login"> 
     <div class="title">欢迎来到党建一家后台管理系统</div>
     <div class="login-wrap">
         <el-form :model="userData" status-icon :rules="rule"  ref="userData" class="form-wrap" label-width="100px">
             <el-form-item label="账号:" prop="username" >
                <el-input type="text" v-model="userData.username"></el-input>
             </el-form-item>
             <el-form-item label="密码:" prop="password">
                 <el-input type="password" v-model="userData.password"></el-input>
             </el-form-item>
             <el-form-item >
                 <el-button type="primary" @click="handleSubmit('userData')">提交</el-button>
                 <el-button  @click="handelReset('userData')">重置</el-button>
             </el-form-item>
         </el-form>
     </div>
 </div>
</template>

<script >

export default {
 data() {
     let validaUsername  = (rule, value, callback)=>{
         if(value===""){
              callback(new Error("用户名不能为空"))
         }else{
             callback()
         }
     }
     let validaPassword  = (rule, value, callback)=>{
         if(value === ""){
             callback(new Error("请输入密码"))
         }else{
            
             callback()
         }
     }  
 return {
     rule:{
         username:[{validator:validaUsername,trigger:'blur', required: true}],
         password:[{validator:validaPassword,trigger:"blur", required: true}],
     },
     userData:{
         username:"",
         password:"",
     }
 }
 },
 components: {},
 methods:{
     handleSubmit(user){
        this.$refs[user].validate((valid) => {
          if (valid) {
            this.$axios.post("/admain/login",this.userData).then(res=>{
                console.log(res);
                if(res.code == 200){ 
                    this.$message.success(res.msg)
                    this.$router.push("/index/home")
                }
                 if(res.code == 400){
                    this.$message.error(res.msg)
                }
                let obj = {
                    username:res.data.username,
                    avatar:res.data.avatar,
                    nickname:res.data.nickname
                }
                  this.$store.commit("CHANGE_FORMDATA",obj)
            })
          } else {

            return false;
          }
        });
     },
    
     handelReset(user){
         this.$refs[user].resetFields();
     }
 }
}
</script>
<style scoped lang="scss">
.login{
    overflow: hidden;
    min-height:100vh;
    background: #007acc; 

    .title{
        font-size: 30px;
        color: #ffffff;
        text-align: center;
        margin-top: 150px;
    }
    .login-wrap{
        width: 500px;
        height: 300px;
        background: #ffffff;
        margin:50px auto;
        padding: 50px;
        border-radius: 10px;
        .form-wrap{
            width: 400px;
            height: 250px;
            margin: 50px auto 0;
        }
    }
}
</style>
