<template>
	<footer>
    <div class="container">
      <div class="siteinfo">
        <ul class="c0">
          <h3 class="c1">订单服务</h3>
          <ul>
            <li class="c2"><router-link to="/thanks"><a class="c3">购买指南</a></router-link></li>
            <li class="c2"><a class="c3" @click="open4">支付方式</a></li>
            <li class="c2"><a class="c3" @click="open5">送货政策</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">服务支持</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="https://github.com/Exrick">官方开源</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://github.com/Exrick/xmall-front">项目前端</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://github.com/Exrick/xmall">项目后端</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">自助服务</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="http://blog.exrick.cn">个人博客</a></li>
            <li class="c2"><a class="c3" target="_blank" href="http://blog.exrick.cn/intro/">个人简介</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://www.bilibili.com/video/av15860053/">个人视频</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">其他项目</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="http://xpay.exrick.cn">XPay支付系统</a></li>
            <li class="c2"><a class="c3" target="_blank" href="http://shouji.baidu.com/software/11783429.html">数据共享</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://github.com/Exrick">待开发...</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">友情链接</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="http://yucccc.com/">宇cccc</a></li>
            <li class="c2"><a class="c3" target="_blank" href="http://www.smartisan.com">Smartisan</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://cn.vuejs.org/">Vue</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">关注我吧</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes">腾讯 QQ</a></li>
            <li class="c2"><a class="c3" target="_blank" href="http://weibo.com/2255094222/profile">新浪微博</a></li>
            <li class="c2"><a class="c3" target="_blank" href="mailto:1012139570@qq.com">官方邮箱</a></li>
          </ul>
        </ul>

        <ul class="c4">
          <li class="tel"><a class="c5" href="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes" target="_blank">1012139570</a></li>
          <li class="time">周一至周日 10:00-23:00（限Starrer或捐赠人联系）</li>
          <li class="online">
            <y-button text="在线帮助" class="button" @btnClick="open3"></y-button>
          </li>
        </ul>
      </div>

      <div class="copyright">
        <h4 class="content-c2">Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved.本网站设计内容大部分属锤子科技</h4>
        <ul class="privacy">
          <li class="content-c1"><a class="content-c0" @click="open1">法律声明</a></li>
          <li class="content-c1"><a class="content-c0" @click="open2">隐私条款</a></li>
          <li class="content-c1"><a class="content-c0" target="_blank" href="https://github.com/Exrick">开发者中心</a></li>
        </ul>
      </div>
      <div class="cop">
        <a class="content-c3" href="http://www.miibeian.gov.cn/" target="_blank">
          <span class="content-c3">蜀ICP备16030308号-1</span>
          <span class="content-c3">蜀ICP证16030308号</span>
        </a>
      </div>
    </div>
  </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
</style>