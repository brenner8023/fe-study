# 构建自己的模板引擎
```html
<div class="result"></div>
<script type="template" id="template">
    <h2>
        <a href="{{ href }}">
            {{ title }}
        </a>
    </h2>
    <img src="{{ imgSrc }}" alt="{{ title }}">
</script>
```
第一种方式
```js
var data = [
    {
      title: "Knockout应用开发指南",
      href: "http://www.cnblogs.com/TomXu/archive/2011/11/21/2257154.html",
      imgSrc: "http://images.cnblogs.com/cnblogs_com/TomXu/339203/o_knockout2.jpg"
    },
    {
      title: "微软ASP.NET站点部署指南",
      href: "http://www.cnblogs.com/TomXu/archive/2011/11/25/2263050.html",
      imgSrc: "http://images.cnblogs.com/cnblogs_com/TomXu/339203/o_vs.jpg"
    },
    {
      title: "HTML5学习笔记简明版",
      href: "http://www.cnblogs.com/TomXu/archive/2011/12/06/2277499.html",
      imgSrc: "http://images.cnblogs.com/cnblogs_com/TomXu/339203/o_LearningHtml5.png"
    }
  ];

var template = document.getElementById('template').innerHTML;
var result = document.getElementsByClassName('result')[0];
var fragment = '';
for(let i = 0; i < data.length; i++) {
    fragment += template.replace(/\{\{title\}\}/g, data[i].title)
        .replace(/\{\{href\}\}/g, data[i].href)
        .replace(/\{\{ imgSrc \}\}/g, data[i].imgSrc);
}
result.innerHTML = fragment;
```
第二种方式
```js
function myreplace(template, obj) {
    let res;

    for(let key in obj) {
        let reg = new RegExp('{{' + key + '}}', 'gi');
        res = (res || template).replace(reg, obj[key]);
    }

    return res;
}

function attachTemplateToData(template, data) {
    let fragment;

    for(let i = 0; i < data.length; i++) {
        fragment += myreplace(template, data[i]);
    }

    return fragment;
}

result.innerHTML = attachTemplateToData(template, data);
```