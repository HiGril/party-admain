<template>
 <div class="news-wrap">
    <el-card>
        <div slot="header">  
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/index/newsList' }">新闻列表</el-breadcrumb-item>
                <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
            </el-breadcrumb></div>
        <div class="news"> 
            <div class="news-title">{{newsDetail.title}}</div>
            <div class="news-other clearfix">
                <div class="other-left fl">
                    <div class="category common">分类:{{categoryTitle}}</div>  
                    <!-- type 分类的id -->
                    <div class="time"><i class="el-icon-date"></i>{{newsDetail.create_time}}</div>
                </div>
                <div class="other-right fr">
                    <div class="author common">作者:{{username}}</div>
                    <!-- author 是作者的id -->
                    <div class="looknum"><i class="el-icon-view"></i> {{newsDetail.look_num}}</div>
                </div>
            </div>
            <div class="news-img">
                <img :src="newsDetail.img" alt="">
            </div>
            <div class="news-content">
                <div class="content" v-html="newsDetail.content"></div>
            </div>
            <div class="copyright">
                <p>版权归wyy所有,转载请标明出处</p>
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
newsDetail:{},
categoryTitle:"",
username:""
 }
 },
 components: {

 },
 created(){
     this.getNewsDetails()
 },
 methods:{
     //获取新闻详情
     getNewsDetails(){
         let {id} = this.$route.params
         this.$axios.get(`/news/newsDetail/${id}`).then(res=>{
            //  console.log(res);
            if(res.code == 200){
                this.newsDetail = res.data
                let time = new Date(this.newsDetail.create_time)
                this.newsDetail.create_time = moment(time).format('YYYY-MM-DD hh:mm:ss')
                this.username = this.newsDetail.author.username
                this.categoryTitle = this.newsDetail.type.title
            }
         })
     },
 }
}
</script>

<style scoped lang="scss">
.news{
    width: 750px;
    margin: 0 auto;
    .news-title{
        font-size: 35px;
        font-weight: 700;
        text-align: center;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #ccc;

    }
    .news-other{
        height: 45px;
        border-bottom: 1px solid #ccc;
        padding: 10px 20px;
        font-size: 14px;
        color: #666;
       .common{
           padding-bottom: 10px;
       }

    }
    .news-img{
        margin: 20px 0;
        img{
            width: 750px;
            height: 400px;
        }
    }
    .news-content{
        .content{
            width: 750px;
            border: 1px solid #ddd;
            font-size: 14px;
            line-height: 1.5; 
        }
    }
    .copyright{
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #666;
        font-size: 12px;

    }

}






/deep/ img{
    width: 150px;
}
</style>
