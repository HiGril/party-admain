<template>
 <div  class="admainDetail">
     <el-card>
         <div slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/index/adminList'}">管理员列表</el-breadcrumb-item>
                <el-breadcrumb-item>管理员详情</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
        <div class="detail-wrap" :model="userDetail">
            <div class="detail-top clearfix">
                <div class="avatar fl" >
                    <img :src="userDetail.avatar" alt="">
                </div>
                <div class="user fl">
                    <div class="username">{{userDetail.username}}</div>
                    <div class="nickname-wrap">
                        <span class="nickname">昵称:&nbsp;&nbsp;{{userDetail.nickname}}</span>
                        <span class="sex">{{userDetail.sex == "1" ?'男' :'女'}}</span>
                    </div>
                </div>
                <div class="edit fr">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit()">编辑</el-button>
               </div> 
            </div>
            <div class="detail-content">
                <div class="phone common">
                     <span class="title">电话:</span>
                    <span class="content">{{userDetail.phone}}</span>
                </div>
                <div class="job common">
                    <span class="title">工作:</span>      
                    <span class="content">{{userDetail.job}}</span>      
                </div>
                <div class="salary common">
                     <span class="title">薪资:</span> 
                    <span class="content"> {{userDetail.salary}}</span>   
                </div>
                <div class="desc common">
                    <span class="title">发表新闻数:</span>
                    <span class="desccontent">{{newQuant}}</span>
                </div>
                <div class="desc common">
                    <span class="title">自我简介:</span>
                    <span class="desccontent">{{userDetail.desc}}</span>
                </div>
            </div>
        </div>
     </el-card>
    
 </div>
</template>

<script >
export default {
 data() {
 return {
     userDetail:{},
     newQuant:"0"

 }
 },
 components: {},
 created(){
     this.getAdmainDetail()
    this.getNewLength()
 },
 methods:{
     //获取管理员详情
     getAdmainDetail(){
         let {id} = this.$route.params
         console.log(id);
         this.$axios.get(`/admain//admainDetail/${id}`).then(res=>{
             console.log(res);
             if(res.code == 200){
                 this.userDetail = res.data
             }
         })
     },
     //获取新闻数量
     getNewLength(){
          let {id} = this.$route.params 
          this.$axios.get(`/news/${id}`).then(res=>{
            //   console.log(res);
            if(res.code == 200){
                this.newQuant = res.count
            }
          })

     },



     handleEdit(){
        let {id} = this.$route.params
         this.$router.push(`/index/admainEdit/${id}`)
     }
 }
}
</script>

<style scoped lang="scss">
.detail-wrap{
    padding-top: 10px;
    width: 750px;
    margin: 0 auto;
    .detail-top{
        .avatar img{
            width: 80px;
            height: 80px;
            // border-radius: 50%;
            margin-right: 15px;
        }
        .user {
            .username{
                font-weight: 700;
                font-size: 25px;
                height: 40px;
                line-height: 40px;
            }
            .nickname-wrap{
                height: 40px;
                line-height: 40px;
                .nickname{
                    font-size: 14px;
                    color:#41b6e4;
                    margin-right: 15px;
                }
                .sex{
                    font-size: 12px;
                    color: rgb(223, 11, 11)

                }

            }
        }
        .edit{
            margin-top: 20px;
        }
    }
    .detail-content{
         width: 700px;
         margin: 20px auto;
        .common{
            height: 50px;
            line-height: 50px;
            .title{
                display: inline-block;
                width: 100px;
                font-size: 16px;
                font-weight: 600;
            }
             .desccontent{
                   display: inline-block;
                    width: 500px;
                    // border: 1px solid #ccc;
                    // height: 300px;
                    // border-radius: 15px;
                }
           

        }


    }
}
/deep/ .el-card{
    height: calc(100vh - 150px);
}
</style>

