## useState
必须按照固定的数量和顺序
```js
const [count, setCount] = useState(0);
() => { setCount(count+1) }
```

## useEffect
```js
useEffect(() => {
  return () => {};
}, [])
```

## useContext
context提供了一种方式，能够让数据在组件树中传递而不必一级一级手动传递。
```js
CountContext = createContext();

const count = useContext(CountContext);
```

## useMemo
当某个依赖项改变时才重新计算值，有助于避免在每次渲染时进行高开销的计算
```js
const double = useMemo(() => {
  return a * 2;
}, [count]);
```

如果useMemo返回的是一个函数，那么等价于使用useCallback

## useReducer
```js
function reducerDemo() {
  const [count, dispatch] = useReducer((state, action) => {
    switch(action) {
      case 'add':
        return state + 1;
      case 'sub':
        return state - 1;
      default:
        return state;
    }
  }, 0);

  return (
    <div>
      <h2>分数: {count}</h2>
      <button onClick={() => { dispatch("add") }}>加</button>
      <button onClick={() => { dispatch("sub") }}>减</button>
    </div>
  )
}
```

## useRef

## 自定义hooks
```js
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount),
    it = useRef();

  useEffect(() => {
    it.current = setInterval(count => count+1, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) clearInterval(it.current);
  });

  return [count, setCount];
}
```

