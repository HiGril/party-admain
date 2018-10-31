<template>
    <div class="layout">     
    <el-container>
     <el-header>
         <Header></Header>
         </el-header>
    <el-container>
        <el-aside width="200px">
            <SideBar></SideBar>
        </el-aside>
        <el-main>
            <div class="router-wrap">
              <router-view></router-view>
            </div>
        </el-main>
   </el-container>
</el-container>

    </div>
</template>

<script >
import Header from "@/components/Header"
import SideBar from "@/components/SideBar"
import AppMain from "@/components/AppMain"
export default {
 data() {
    return {

    }
 },
 components: {
     Header,
     SideBar,
     AppMain

 }
}
</script>

<style scoped lang="scss">
/deep/ .el-header{
    // background: #f00;
    width: 100%;
    // height: 30px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9998;

    padding: 0;
}
/deep/ .el-aside{
    position: fixed;
    left: 0;
    top: 60px;
    padding-bottom: 0;
    z-index: 9998;
}
/deep/ .el-main{
    padding-top: 80px;
    margin-left: 220px;
}
.router-wrap{
    // padding-top: 10px;
    // height:calc(100vh - 200px);
   
   
}

</style>
