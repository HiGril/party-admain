<template>
 <div class="swiperdetail">
    <el-card>
        <div slot="header">  
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/index/swiperList' }">轮播图列表</el-breadcrumb-item>
                <el-breadcrumb-item>轮播图详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="swiper-detail-wrap">
            <div class="detail-wrap">
                <div class="swiper-title">{{swiperDetail.title}}</div>
                <div class="swiper-status clearfix">
                    <span class="fl">{{swiperDetail.status == 1 ?"显示" :"不显示"}}</span>
                    <span class="fr">排序编号:{{swiperDetail.sort}}</span>
                </div>
                <div class="swiper-img">
                    <img :src="swiperDetail.img" alt="">
                </div>
                <div class="news-wrap">  
                    <div class="newsCard">新闻内容</div>
                     <div class="news-title">{{news.title}}</div>
                      <div class="news-content">
                          <div class="content" v-html="news.content"></div>
                      </div>
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
     swiperDetail:{},
     news:{}

 }
 },
 components: {

 },
 created(){
     this.getSwiperDetail()

 },
 methods:{
     getSwiperDetail(){
         let {id} = this.$route.params
         this.$axios.get(`/swiper/swiperDetail/${id}`).then(res=>{
             console.log(res);
            if(res.code == 200){
                this.swiperDetail = res.data
                this.news = this.swiperDetail.newsId
                console.log(this.news );
            }
         })
     }
 }
}
</script>

<style scoped lang="scss">
.swiper-detail-wrap{
    .detail-wrap{
        width:1110px;
        margin: 0 auto;
        padding:  0 20px;
        .swiper-title{
            font-size: 25px;
            font-weight: 700;
            text-align: center;
            height: 40px;
            line-height: 40px;

        }
        .swiper-status{
            color: #666;
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;
        }
        .swiper-img{
            width: 500px;
            margin: 10px auto;
            img{
                // width: 100%;
                height: 300px;
                // margin: 0 auto;

            }
        }
    }
    .news-wrap{
        margin-top: 20px;
       border: 1px solid #ddd;
       .newsCard{
           height: 60px;
           line-height: 60px;
           font-size: 20px;
           font-weight: 600;
           padding:  0 20px;
           border-bottom: 1px solid #ddd;
       }
       .news-title{
            height: 80px;
           line-height: 80px;
           font-size: 25px;
           font-weight: 700;
           padding:  0 20px;
           text-align: center;
       }
       .news-content{
           .content{
               /deep/  p{
                   line-height: 1.5;
                   padding: 0 5px;
               }
           }
       }
    }
}
</style>
