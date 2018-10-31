<template>
 <div class="newsList">
     <el-card>
         <div slot="header">
               <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
                </el-breadcrumb>
         </div>
         <div class="admin-wrap">
            <el-table :data="newsData" class="table" >
                <el-table-column prop="img" label="新闻头图" width="200">
                    <template slot-scope="scope">
                        <img style="margin-left: 10px" :src="scope.row.img">
                    </template>
                </el-table-column>
                <el-table-column prop="author.username" label="作者" label-width="200">   
                </el-table-column>
                <el-table-column prop="type.title" label="新闻类型" label-width="200">     
                </el-table-column>
                <el-table-column prop="title" label="新闻标题" label-width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" label-width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row._id)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleDetail(scope.row._id)">详情</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row._id)">删除</el-button>  
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handePage"
                :total="count">
            </el-pagination>
        </div>
    </el-card>
    
    
 </div>
</template>
<script >
export default {
 data() {
 return {
      newsData:[],
      count:0,
      page:1,
      page_size:10,
      
    }
 },
 components: {},
 created(){
     this.getNewsList()
 },
 methods:{
     //获取新闻列表
     getNewsList(){
         let page = this.page
         let page_size = this.page_size
         this.$axios.get("/news",{page,page_size}).then(res=>{
            //  console.log(res);
            if(res.code == 200){
              this.newsData =  res.data
              this.count = res.count
            }
         })
     },
     handleEdit(id){
         this.$router.push(`/index/newsEdit/${id}`)   
     },
     handleDetail(id){
         this.$router.push(`/index/newsDetail/${id}`)

     },
     handleDelete(id){
         this.$axios.delete(`/news/newsDelete/${id}`).then(res=>{
             if(res.code==200){
                 this.$message.error(res.msg)
                 this.getNewsList()
             }
         })

     },
     //分页事件
     handePage(page){
         this.page = page
         this.getNewsList()
     }
 }
}
</script>

<style scoped lang="scss">
.admin-wrap {
    img{
      width: 50px;

}

}
/deep/ .cell{
    text-align: center;
}

</style>
