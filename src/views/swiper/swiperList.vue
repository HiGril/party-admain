<template>
 <div class="swiperList">
     <el-card>
         <div slot="header">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >轮播图列表</el-breadcrumb-item>

                </el-breadcrumb>
         </div>
         <div class="swiper-wrap">
             <el-table :data="swiperListData">
             <el-table-column label="轮播图头图">
                 <template slot-scope="scope">
                   <img :src="scope.row.img">
                </template>
             </el-table-column>
             <el-table-column label="轮播图标题" >
                 <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                 </template>
             </el-table-column>
              <el-table-column label="轮播图排序" >
                  <template slot-scope="scope">
                        <span>{{scope.row.sort}}</span>
                  </template>
                 
             </el-table-column>
              <el-table-column label="是否显示" >
                  <template slot-scope="scope">
                    <span>{{scope.row.status==1?"显示":"不显示"}}</span>
                  </template>
                 
             </el-table-column>
             <el-table-column label="新闻标题" prop="newsId.title"></el-table-column>
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

         </div>
         
         <!-- 分页 -->
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handePage"
            :total="count">
        </el-pagination>

     </el-card>

 </div>
</template>

<script >
export default {
 data() {
 return {
     swiperListData:[],
     page:1,
     page_size:6,
     count:0
 }
 },
 components: {},
 created(){
     this.getSwiperList()
 },
 methods:{

     getSwiperList(){
         let page = this.page
         let page_size = this.page_size
         this.$axios.get("/swiper",{page,page_size}).then(res=>{
            //  console.log(res);
            if(res.code == 200){
                this.swiperListData = res.data
                this.count = res.count
            }
         })

     }, 
     handleEdit(id){
         this.$router.push(`/index/swiperEdit/${id}`)

     },
     handleDetail(id){
         this.$router.push(`/index/swiperDetail/${id}`)

     },
     handleDelete(id){
         this.$axios.delete(`/swiper/swiperDelete/${id}`).then(res=>{
             if(res.code == 200){
                 this.$message.success(res.msg)
                 this.getSwiperList()
             }
         })

     },
     handePage(page){
         this.page = page
         this.getSwiperList()
     }

 }
}
</script>

<style scoped lang="scss">
.swiper-wrap {
    img{
      width: 80px;

}

}
/deep/ .cell{
    text-align: center;
    height: 96.5px;
    line-height: 96.5px;
   
}
</style>
