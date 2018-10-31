<template>
 <div class="adminList">
     <el-card>
         <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
         <div class="admin-wrap">
        <el-table :data="adminList" class="table" >
            <el-table-column prop="avatar" label="头像" width="200">
                <template slot-scope="scope">
                    <img style="margin-left: 10px" :src="scope.row.avatar">
                </template>
            </el-table-column>
             <el-table-column prop="username" label="姓名" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
             <el-table-column prop="nickname" label="昵称" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
                </template>
            </el-table-column>
               <el-table-column prop="sex" label="性别" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex == 1 ? "男" :"女"}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="job" label="工作" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.job}}</span>
                </template>
            </el-table-column>
              <el-table-column prop="salary" label="薪资" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.salary}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
     adminList:[],
     page:1,
     page_size:10,
     count:0

 }
 },
 components: {

 },
 created(){
     this.getTableList()

 },
 methods:{
     getTableList(){
         let page = this.page
         let page_size = this.page_size
         this.$axios.get("/admain",{page,page_size}).then(res=>{
            //  console.log(res)
           if(res.code == 200){
               this.adminList = res.data
               this.count = res.count
           }
         })

     },
     handePage(page){
        this.page = page
        this.getTableList()

     },
     handleEdit(id){
         this.$router.push(`/index/admainEdit/${id}`)
     },
     handleDelete(id){
       this.$axios.delete(`/admain/admainDelete/${id}`).then(res=>{
           if(res.code == 200){
               this.$message.success(res.msg)
           }
           this.getTableList()
       })
     },
     handleDetail(id){
         this.$router.push(`/index/admainDetail/${id}`)

     }
 }
}
</script>

<style scoped lang="scss">
img{
    width: 50px;
    height: 50px;
}
/deep/ .cell{
    text-align: center;
}
</style>
