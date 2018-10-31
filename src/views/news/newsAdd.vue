<template>
 <div class="newsAdd" >
     <el-card>
         <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ isEdit? '编辑新闻' :"添加新闻"}}</el-breadcrumb-item>
            </el-breadcrumb>
         </div>  
        <div class="add-wrap">
            <div class="add">
                <el-form :model="newsDate" label-width="100px" >
                    <el-form-item label="新闻分类" required label-width="180px"  > 
                        <el-select v-model="newsDate.type">
                            <el-option v-for="(item,index) in categories"
                            :key="index" 
                            :label="item.title" 
                            :value="item._id"></el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="作者" required label-width="180px"> 
                        <el-select v-model="newsDate.author">
                            <el-option v-for="(item,index) in user"
                            :key="index" 
                            :label="item.username" 
                            :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻标题" required label-width="180px"  > 
                    <el-input v-model="newsDate.title"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻头图" required label-width="180px"  > 
                    <upload v-model="newsDate.img"></upload>
                    </el-form-item>
                    <el-form-item label="新闻内容" required label-width="180px" >
                        <div class="quill">
                            <quill-editor class="edit"
                                v-model="newsDate.content"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @change="editorChange($event)">
                            </quill-editor> 
                        </div> 
                    </el-form-item>
                    <el-form-item label-width="180px">
                            <el-button type="primary"  @click="onSubmit" v-if="!isEdit">提交</el-button>
                            <el-button type="primary"  @click="handelSave" v-else>保存修改</el-button>
                            <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

     </el-card>

 </div> 
</template>
<script >
import upload from "@/components/upload"
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
import axios from "axios"
export default {
 data() {
    return {
        newsDate:{
            title:"", //*
            content:"", //存放富文本
            contentText:"",//*
            type:"",    //分类
            look_num:"",
            img:"",
            author:""
        },
        categories:[],
        user:[],
        token:"",

        editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action: "https://upload-z1.qiniup.com",
              response: (res) => {
                return res.url
              },
               change: (xhr, formData) => {
                    formData.append('token', this.token)
                } 
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        },

        editorChange({ quill, html, text }){
            this.newsDate.contentText = text
        },

        isEdit:false //是否处于编辑状态
    } 
 },
 components: {upload,quillEditor},
  watch:{
     $route(to,from){
         if(to.name=="newsEdit"){
             this.isEdit = true
         }else{
            this.isEdit = false
            this.newsDate={
                title:"", //*
                content:"", //存放富文本
                contentText:"",//*
                type:"",    //分类
                look_num:"",
                img:"",
                author:""
            }
         }
     }
 },
 created(){
    this.getUserDate()
    this.getToken()
    this.getType()
    if(this.$route.name == "newsEdit"){
        this.isEdit = true
        this.getNewsDetail()
    }else{
        this.isEdit = false
    }
 },
 methods:{
     //获取用户信息
     getUserDate(){
         this.$axios.get("/admain").then(res=>{
            //  console.log(res);
             if (res.code == 200) {
                 this.user =res.data  
                //  console.log(this.user);  
             }      
         })
     },
     //富文本编辑器上传图片获取token
     getToken(){
         axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
             if(res.data.code == 200){
                this.token = res.data.data
             }
         })
     },
     //获取分类
     getType(){
         this.$axios.get("/category").then(res=>{
            if(res.code==200){
                this.categories = res.data
            }
         })
     },
     //添加新闻
    onSubmit(){
        this.$axios.post("/news/newsAdd",this.newsDate).then(res=>{
            if(res.code == 200){
                this.$message.success(res.msg)
                this.$router.push("/index/newsList")
            }
        })
    },
    //获取新闻详情
    getNewsDetail(){
        let {id} = this.$route.params
        // console.log(id);
        this.$axios.get(`/news/newsDetail/${id}`).then(res=>{
            // console.log(res);
            if(res.code == 200){
                this.newsDate = res.data
            }
        })
    },
    //保存修改
    handelSave(){
        let {id} = this.$route.params
        this.$axios.post(`/news/newsEdit/${id}`,this.newsDate).then(res=>{
            // console.log(res);
            if(res.code == 200){
                this.$message.success(res.msg)
                this.$router.push("/index/newsList")
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
        .quill{
            width: 1200px;
            height: 300px;
             .edit{
                height: 230px;
            }
        }
    }   
}
/deep/ .el-form-item{
    width: 500px;
}
</style>
