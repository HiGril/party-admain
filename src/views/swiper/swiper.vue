<template>
 <div class="swiper">
        <el-card>
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/index/swiperList' }">轮播图列表</el-breadcrumb-item>
                    <el-breadcrumb-item> {{isEdit ? "编辑轮播图": "添加轮播图"}} </el-breadcrumb-item>
                </el-breadcrumb>
              
            </div>       
        <el-form :model="swiperData"  >
            <el-form-item label="轮播图图片" prop="img" required>
                <upload v-model="swiperData.img"></upload>
            </el-form-item>
            <el-form-item label="轮播图标题">
                <el-input v-model="swiperData.title"></el-input>
            </el-form-item>
             <el-form-item label="轮播图对应新闻标题">
                    <el-select v-model="swiperData.newsId">
                        <el-option v-for="item in news" 
                                    :key="item._id" 
                                    :value="item._id" 
                                    :label="item.title">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="轮播图排序">
               <el-input-number v-model="swiperData.sort" :min="1" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item >
                <el-switch
                    v-model="swiperData.status"
                    active-text="显示" 
                    inactive-text="不显示"
                    :active-value="1"
                    :inactive-value="0"
                    >
                    </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="onSubmit" v-if="!isEdit">提交</el-button>
                <el-button type="primary"  @click="handleSave" v-else >保存修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>   
 </div>
</template>

<script >
import upload from "@/components/upload"
export default {
 data() {
 return {
     swiperData:{
        sort:"", 
        status:1, 
        title:"",
        newsId:"" ,
        img:""
     },
     news:[],
     isEdit:false

 }
 },
 components: {upload},
 created(){
    if(this.$route.name=='swiperEdit'){
        this.isEdit = true
        this.getSwiper()
    }else{
        this.isEdit = false
    } 
    this.getnewsList()
 },
 watch:{
     $route(to,from){
         if(to.name=='swiperEdit'){
             this.isEdit = true       
         }else{
             this.isEdit = false
             this.swiperData={
                sort:"", 
                status:1, 
                title:"",
                newsId:"" ,
                img:""
             }
         }
     }  
 },
 methods:{
     //获取新闻列表
     getnewsList(){
         this.$axios.get("/news").then(res=>{
            if(res.code ==200 ){
                this.news = res.data
            }
         })
     },
     //获取要编辑轮播图的信息
     getSwiper(){
         let {id}= this.$route.params
         this.$axios.get(`/swiper/swiperDetail/${id}`).then(res=>{
             console.log(res);
             if(res.code == 200){
                 this.swiperData = res.data
             }
         })

     },
     onSubmit(){
         this.$axios.post("/swiper/swiperAdd",this.swiperData).then(res=>{
            if(res.code == 200){
                this.$message.success(res.msg)
                this.$router.push("/index/swiperList")
            }
         })
     },
     handleSave(){
         let {id} = this.$route.params
         this.$axios.patch(`/swiper/swiperEdit/${id}`,this.swiperData).then(res=>{
             console.log(res);
             if(res.code == 200){
                 this.$router.push("/index/swiperList")
                 this.$message.success(res.msg)
             }
         })


     }

 }
}
</script>

<style scoped lang="scss">
</style>
