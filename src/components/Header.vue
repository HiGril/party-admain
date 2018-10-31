<template>
 <div class="header">
     <div class="header-wrap">
         <h2 class="title">党建一家后台管理页面</h2>
         <div class="avatar">
             <img :src="fromData.avatar" alt="">
            <div @click="handleLoginout" class="outline">退出登录</div>
        </div> 
     </div>
 </div>
</template>

<script >
import {mapState} from "vuex"
export default {
 data() {
 return {
     

 }
 },
 components: {

 },
 computed:{
     ...mapState(["fromData"])
 },
 methods:{
     handleLoginout(){
         let obj = {
                    username:"",
                    avatar:"",
                    nickname:""
                }
            this.$store.commit("CHANGE_FORMDATA",obj)
        this.$router.push("/login")
     }
 }
}
</script>

<style scoped lang="scss">
.header{
    width: 100%;
    // height:60px;  
    background: rgb(65, 182, 228);
    .header-wrap{
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        
        .title{
            flex: 9;
        }
        .avatar{
           
            flex: 1;
            display: flex;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 15px;
            }
            .outline{
                line-height: 60px;
                height: 60px;
                display: inline-block;
                cursor: pointer;

            }
        }

    }

}

</style>
