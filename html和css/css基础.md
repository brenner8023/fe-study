# css基础
position
- static：默认值，元素出现在正常的流中
- absolute：绝对定位，相对于static定位以外的最近的父元素进行定位，改变了元素性质，表现出inline-block的效果
- fixed：固定定位，相对于浏览器窗口进行定位
- relative：相对于其正常位置进行定位

## BEM命名约定
```css
/* 代表了高级别的抽象或组件 */
.block {}

/* 代表.block的后代 */
.block__element {}

/* 代表.block的不同状态或者不同版本 */
.block--modifier {}
```
示例：
```css
.person {}

.person__hand {}

.person--female {}

.person--female__hand {}

.person__hand--left {}
```