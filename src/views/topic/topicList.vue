<template>
 <div class="topicList">
     <el-card>
         <div slot="header">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >话题列表</el-breadcrumb-item>
            </el-breadcrumb>
         </div>

         <div class="topic-add" @click="handleTopicAdd">
          <img src="@/style/01.png" alt="">
        </div>
        <div class="topicList-wrap" v-for="(item, idx) in topicList" :key="item._id">
            <div class="user-wrap clearfix">
                <div class="user-avatar fl"><img :src="item.user.avatar" alt=""></div>
                <div class="user-name fl">
                    <div class="username">{{item.user.username}}</div>
                    <div class="time">{{item.create_time}}</div>
                </div>
                <div class="updrown fr">
                    <el-button @click="handeldelete(item._id)">删除</el-button>
                </div>
            </div>
            <div class="content-wrap">
                <div class="content">{{item.content}}</div>
                <!-- 评论的内容 -->
                <div v-for="(com, index) in item.comment" :key="index" class="comment">
                    <span class="user">小明</span>
                    <span class="commentpl user">评论</span>
                    <span class="user">{{item.user.username}} : </span>
                    <span class="user commentpl">{{com.content}}</span>  
                </div>
            </div>
            <div class="inp">
                <el-input v-model="item.text"></el-input>
                <el-button @click="handleSubmit(item._id, idx)">评论</el-button>
            </div>
        </div>




     </el-card>
     
 </div>
</template>

<script >
import moment from 'moment'
export default {
 data() {
    return {
        topicList:[],
    }
 },
 created(){
     this.getTopicList()
 },
 methods:{
     //删除话题
     handeldelete(id){
        this.$axios.delete(`/topic/topicDelete/${id}`).then(res=>{  
            if (res.code == 200) {
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.getTopicList()
            }
        })
     },
     //添加话题
     handleTopicAdd(){
         this.$prompt('发表说说', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            let obj = {
                content:value
            }
            this.$axios.post("/topic/topicAdd",obj).then(res=>{
                if(res.code == 200){
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.getTopicList()
                }
            })    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });

     },
    //获取话题列表
    getTopicList(){
        this.$axios.get("/topic").then(res=>{  
            if(res.code == 200){ 
                this.topicList = res.data.map(item => {
                    let time = new Date(item.create_time)
                    item.create_time = moment(time).format('YYYY-MM-DD hh:mm:ss')
                    item.text  = "";
                    return item
                })  
            }
        })
    },
    handleSubmit(id, index){ 
        let topicId = id
        let content = this.topicList[index].text
        this.$axios.post("/comment/commentAdd",{topicId,content}).then(res=>{
            if(res.code == 200){ 
                this.$message({
                    message: res.msg,
                    type: 'success'
                    });
                this.getTopicList()
            }
        })
    },      
 }

}
</script>

<style scoped lang="scss">
.topicList{
    background: rgb(228, 228, 228);
     border-radius: 15px;
    overflow: hidden;
    // width: 750px;
   
    .topicList-wrap{
        margin: 0 auto;
        margin-bottom: 30px;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 5px 5px 3px #ccc ;
        border-radius: 15px;
        overflow: hidden;
        padding: 30px;
         width: 750px;
        .user-wrap{
            color: #666;
            img{
                width: 50px;
                height: 50px;
                margin-right: 15px;
            }
            .user-name{
                .username{
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                .time{
                    font-size: 12px;
                } 
            }
        }
        .content-wrap{
            margin: 20px;
            color: #444;
            .content{
                font-size: 16px;
                line-height: 1.5;
            }
            .comment{
                height: 40px;
                line-height: 40px;
                cursor: pointer;
                .user{
                    font-size: 14px;
                    color: rgb(20, 147, 231)

                }
                .commentpl{
                    color: #444;
                }
            }
        }
        .inp{
            display: flex;
            justify-content: space-between;
        }
    }
    .topic-add{
        position: fixed;
        top: 150px;
        right: 100px;
        img{
            width: 50px;
        }

    }

}

















/deep/ .el-input__inner{
    width: 400px;
}

/deep/ .el-icon-circle-plus-outline{
    width: 10px;
}
</style>
