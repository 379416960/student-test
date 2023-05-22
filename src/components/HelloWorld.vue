<!-- @format -->

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

// 通过vue3语法ref来新建一个变量,并且赋值为  '学校名称'
const school = ref('学校名称');

/**
 * 配置request请求时的默认参数
 */
const baseURL = "/api.php";
const request = axios.create({
  baseURL: baseURL || "", // 请求链接
  withCredentials: false, // 当跨域请求时发送cookie
  timeout: 5000, // 请求超时时间,5000(单位毫秒) / 0 不做限制
 
});

// 新建一个http方法
// apiuUrl:string  冒号后面是说明apiuUrl是字符串类型
// sendData: { page: number; size: number; }  sendData  冒号后面是说明数据是page和number这样的格式,page是number数字类型,size也是number数字类型
const http = async (apiuUrl: string,sendData: any) => {
  // 用上面创建的request封装一个请求
  const res = await request.request({
    url: apiuUrl,
    data: sendData,
    method:'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
};

// 新建一个变量接受服务器返回的数据,初始值为空,为了方便,定义类型为any,意思任何类型的数据都可以赋值
const result:any = ref();

// onMounted是vue3的语法,会在html加载完成后,才执行里面的语句
onMounted(async ()=>{
  // 调用上面创建的http方法,有两个参数,apiuUrl和sendData,请求成功的数据是res,然后赋值给result,因为result是用ref创建的,所以赋值要在result后面加.value
  http("/cms/nav",{
    name:'lie',
    sex:1
  }).then(res=>{
      console.log('打印服务器返回的数据res到浏览器的控制台 ',res );
      if(res.code == 1000){
        //如果code 等1000,那么是成功拿到服务器的数据了
        // 然后继续写其他逻辑
        // .......
        result.value = res.data
      }
     
    })
})

</script>

<template>

<!-- 输出变量school, vue语法,通过两个花括号来输出变量 -->
{{ school}}

<!-- 通过vue的语法v-for循坏数据 -->
<p v-for="(item,index) in result?.list" :key="index">

{{ item.username }}

</p>

</template>

<style scoped>
 
</style>
