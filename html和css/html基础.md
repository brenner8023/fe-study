# html
## 表单
表单是用户和web站点或应用程序之间交互的主要内容之一, 允许用户将数据发送到web站点.

- form: 按照一定的格式定义了表单, 确定表单行为
- novalidate: 在提交表单数据时不使用默认的方式对表单数据进行验证
- fieldset: 在相关表单元素周围设置边框, 对相关表单元素进行分组
- legend: 为fieldset元素定义标题
- autocomplete: 规定输入字段是否启用自动完成功能
- tabindex: 规定当使用tab键导航时的元素顺序
- autofocus: 规定当页面加载时, 对应元素应当自动获得焦点
```html
<form action="/my-handling-form-page" method="post" novalidate>
  <fieldset>
    <legend>登录</legend>
    <div>
    	<p>
      	<input name="userName" placeholder="邮箱/手机号" tabindex="1" required autofocus />  
      </p>
      <p>
        <input type="password" name="password" placeholder="密码" tabindex="2" required />
        <a href>忘记密码?</a>
      </p>
      <p>
        <input name="code" placeholder="验证码" autocomplete="off" tabindex="3" />
        <img src="" alt="验证码" />
      </p>
      <p>
        <button type="submit" tabindex="4">登录</button>
      </p>
      <a href="" target="_blank" rel="">立即注册</a>
    </div>
  </fieldset>
</form>
```