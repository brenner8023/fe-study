```js
mounted () {
  const timer = setInterval(() => {
    console.log(Date.now());
  }, 1000);

  this.$once('hook:beforeDestroy', () => {
    clearInterval(timer);
  });
}
```