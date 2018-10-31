<template>
 <div class="addadmain-wrap">
     <el-card>
         <div slot="header">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <div class="add-wrap">
            <div class="add">
                <el-form :model="userData" :rules="rules" ref="userData"  label-width="100px">
                    <el-form-item label="头像:" prop="avatar" label-width="180px">
                        <upLoad v-model="userData.avatar" :value="userData.avatar"></upLoad>
                    </el-form-item>
                    <el-form-item label="姓名:" prop="username">
                    <el-input  v-model="userData.username" v-if="!isEdit"></el-input>
                    <el-input  v-model="userData.username"  v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="昵称:" prop="nickname">
                    <el-input  v-model="userData.nickname" ></el-input>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <template  prop="sex">
                            <el-radio  v-model="userData.sex" label="1">男</el-radio>
                            <el-radio  v-model="userData.sex" label="0">女</el-radio>
                        </template>            
                    </el-form-item>
                    <el-form-item label="工作:" prop="job">
                    <el-input  v-model="userData.job" ></el-input>
                    </el-form-item>
                    <el-form-item label="薪资:" prop="salary">
                    <el-input  v-model="userData.salary" ></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话:" prop="phone">
                    <el-input  v-model="userData.phone" ></el-input>
                    </el-form-item>
                    <el-form-item label="自我简介:" prop="desc">
                    <el-input  v-model="userData.desc" type="textarea"></el-input>
                    </el-form-item> 
                    <el-form-item label="密码:" prop="password" v-if="!isEdit">
                    <el-input  v-model="userData.password"></el-input>
                    </el-form-item> 
                    <el-form-item v-if="!isEdit">
                        <el-button type="primary"  @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="isEdit">
                        <el-button type="primary"  @click="handleSave">保存修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
           </div>
        </div>

     </el-card>
       
        
 </div>
</template>

<script >
import upLoad from "@/components/upload"
export default {
 data() {
 return {
     userData:{
            username:"",
             nickname:"",
            avatar:"",
            password:"",
            desc:"",
            job:"",
            phone:"",
            sex:"",
            salary:""
     },
     rules:{
            username:[ { required: true, message: '请输入活动名称', trigger: 'blur' }],
            password:[{required: true, message: '请输入密码', trigger: 'blur'}]        
          },
    isEdit:false        //是否处于编辑状态

 }
 },
 components: {upLoad},
 created(){
     
    if (this.$route.name =="admainEdit") {
        this.isEdit =true  
        this.getAdmain()   
    }else{
        this.isEdit = false
    }
 },
 watch:{
     $route(to,from){
         if(to.name=="admainEdit"){ //如果是编辑路由
         this.isEdit =true
         }else{  
             this.isEdit = false
             this.userData={
                    username:"",
                    nickname:"",
                    avatar:"",
                    password:"",
                    desc:"",
                    job:"",
                    phone:"",
                    sex:"",
                    salary:""
            }
         }
     }

 },
 methods:{
     //添加管理员
     onSubmit(){
         this.$axios.post("/admain/admainAdd",this.userData).then(res=>{
             console.log(res);
            if(res.code == 200){
                  this.$message.success(res.msg)
                   this.$router.push("/index/adminList")
            }else{
                  this.$message({
                    message: res.msg,
                    type: 'error'
                    });  
            }
         })
     },
     //保存修改
     handleSave(){
           let id = this.$route.params.id
         this.$axios.post(`/admain/admainEdit/${id}`,this.userData).then(res=>{
             if(res.code == 200){
                 this.$message.success(res.msg)
                 this.$router.push("/index/adminList")
             }
         })

     },
     
     //获取要编辑的管理员的信息
     getAdmain(){
         let id = this.$route.params.id
        //  console.log(id);
        this.$axios.get(`/admain/admainDetail/${id}`).then(res=>{
            // console.log(res);
            if(res.code == 200){
                this.userData = res.data
                // console.log(this.userData.sex);
            }
        })

     }
 }
}
</script>

<style scoped lang="scss">
.add-wrap{
    padding-top: 10px;
    width: 100%;
   
    .add{
        width: 500px;
    }
    
}



</style>
