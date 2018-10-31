<template>
 <div class="siderBar">
        <el-menu
          class="el-menu"
          background-color="skyblue"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
        <el-submenu index="1">
            <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>管理员管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/index/adminAdd">添加管理员</el-menu-item>
                <el-menu-item index="/index/adminList">管理员列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                 <i class="el-icon-document"></i>
                 <span>新闻管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/index/newsAdd">添加新闻</el-menu-item>
                <el-menu-item index="/index/newsList">新闻列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                 <i class="el-icon-picture"></i>
                 <span>轮播图管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/index/swiperAdd">添加轮播图</el-menu-item>
                <el-menu-item index="/index/swiperList">轮播图列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
         <el-submenu index="4">
            <template slot="title">
                 <i class="el-icon-edit"></i>
                 <span>话题管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/index/topicList">话题列表</el-menu-item>
                <!-- <el-menu-item index="/index/swiperList">轮播图列表</el-menu-item> -->
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
 </div>
</template>

<script >
export default {
 data() {
 return {

 }
 },
 components: {

 }
}
</script>
<style scoped lang="scss">
.siderBar{
    height:calc(100vh - 60px);
    width: 200px;
    background: skyblue;
}
/deep/ .el-menu{
    border: 0;
}
/deep/ .el-aside{
    padding-top: 0px;
}
</style>-->
