类型检查：
- 类型推断：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
- 类型注释：事先注释好我们期待的类型，Flow会基于这些注释来进行判断。

视图是由数据驱动生成的，我们对视图的修改，不会直接操作DOM，而是通过修改数据。