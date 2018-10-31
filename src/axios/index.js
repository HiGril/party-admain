import axios from "axios"
import {Message} from "element-ui"
import router from "../router";
const baseURL = process.env.BASE_API
// const baseURL = "/api"
const instance = axios.create({
    baseURL ,
    timeout: 15000
})
  class server {
    static get (url,data,config){
        return new Promise((resolve,rejects)=>{
         instance.get(url,{params:data},config).then(res=>{
                if(res.data.code == 403){
                    Message.error(res.data.msg); 
                    router.push("/login")
                }else{
                   
                    resolve(res.data)
                }         
            }).catch(err=>{
                rejects(err)
            })

        })
    }
    static delete(url,data,config){
        return new Promise((resolve,reject)=>{
            instance.delete(url,{params:data},config).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    static fetch (url,data,config,methods){
        return new Promise((resolve,reject)=>{
           instance[methods](url,data,config).then(res=>{                  
                    if(res.data.code == 403){
                        Message.error(res.data.msg); 
                        router.push("/login")
                    }else{
                        resolve(res.data)
                    }               
            }).catch(err=>{
                reject(err)
            })
        })
    }
    static post(url, data, config) {
        return this.fetch(url, data, config, 'post')
    }
    static patch(url,data,config){
        return this.fetch(url, data, config, 'patch')
    }
}
export default server

