# JavaScript宏任务和微任务分别有哪些?
单线程: 任务是串行的, 后一个任务需要等待前一个任务的执行, 这就可能出现长时间的等待. 由于ajax网络请求, setTimeout时间延迟等任务并不消耗CPU, 是一种空等, 资源浪费.

同步执行/异步执行: 同步执行是主线程按照顺序, 串行执行任务, 异步执行就是CPU跳过等待, 先处理后续的任务. 由此产生了任务队列与事件循环.

## 事件循环机制
1. 主线程读取js代码, 此时为同步环境, 形成相应的堆和执行栈
2. 主线程遇到异步任务, 交给对应的异步进程进行处理
3. 异步进程处理完毕, 将相应的异步任务推入任务队列
4. 主线程执行完毕, 查询任务队列, 如果存在任务, 则取出一个任务推入主线程处理
5. 重复step2, 3, 4

## 任务队列
任务队列存在多个, 同一任务队列内, 按队列顺序被主线程取走, 不同任务队列存在着不同的优先级

### 宏任务
不唯一, 存在一定的优先级, 执行为异步, 同一事件循环中, 只执行一个

setTimeout, setInterval, I/O, UI rendering

### 微任务
唯一, 整个事件循环中, 执行为同步

Promise, async

```html
<script>
  setTimeout(() => {
    console.log(4)
  }, 0);

  new Promise((resolve) => {
    console.log(1);

    for (var i = 0; i < 10000000; i++) {
      i === 9999999 && resolve();
    }

    console.log(2);
  }).then(() => {
    console.log(5);
  });

  console.log(3);
</script>
<script>
  console.log(6);
  
  new Promise((resolve) => {
    resolve();
  }).then(() => {
    console.log(7);
  });
</script>
```