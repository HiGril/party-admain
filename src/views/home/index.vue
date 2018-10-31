<template>
	
		<div>
		        <vue-particles
					color="#6495ED"
			        :particleOpacity="0.8"
			        :particlesNumber="60"
			        shapeType="circle"
			        :particleSize="4"
			        linesColor="#6495ED"
			        :linesWidth="1"
			        :lineLinked="true"
			        :lineOpacity="0.6"
			        :linesDistance="150"
			        :moveSpeed="3"
			        :hoverEffect="true"
			        hoverMode="grab"
			        :clickEffect="true"
			        clickMode="push"
					>
				</vue-particles>
            <div class="title">
                <h1>欢迎来到首页面</h1>
            </div>
		</div>
	
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  data(){
    return {
      list:{}
    }
  },
  created(){
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">
#particles-js {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 98;
    width: 100%;
    height: 99%;
}
.title{
    width: 500px;
    margin: 0 auto;
}
</style>