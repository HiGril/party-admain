<template>
 <div class="upload">
      <el-upload
        class="avatar-uploader"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false" 
        :on-success="handleSuccess"
        :data="formData"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
 </div>
</template>

<script >
import axios from "axios"
export default {
props:{
    value:String
},
 data() {
 return {
     imageUrl:this.value,
     formData:{
         token:""
     }
 }
 },
 watch:{
     value(val){
         this.imageUrl = val
     }
 },
 components: {},
 created(){
     this.getToken()
 },
 methods:{
    getToken(){
        axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
            if(res.data.code == 200 ){
                this.formData.token = res.data.data
            }

        })
    },
    handleSuccess(res){
        this.imageUrl = res.url
        this.$emit('input',this.imageUrl)
    }
 }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
</style>
