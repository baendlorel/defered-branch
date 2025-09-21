我修改了api，并添加了类型标注，添加了新功能，我改写了部分注释，请你根据我的改动，重新改写readme.md

---

我整个添加了一个dynamic版本的源代码，改动很大。不过原版的api几乎没有改动，只是注释的修改。
我已经将readme.md清空，你帮我重写一版，要求：

1. 根据我的steps to use，介绍defered-branch和defered-branch-dynamic的功能和用途
2. 要备注defered-branch适合一次性立刻运行，defered-branch-dynamic因其传入的是判定函数，适合复用逻辑多次运行相同分支
3. api详细介绍
4. 可以用emoji适量，字符颜文字适量
5. 标题下方必须包含:

```text
For more awesome packages, check out [my homepage💛](https://baendlorel.github.io/?repoType=npm)
```

6. 用英文写

---

我新增了两个all版本的api，分别是defered-branch-all和defered-branch-all-dynamic
它们的功能是当有多个分支匹配时，全部执行，而不是只执行第一个匹配的分支。
请帮我据此更新一下README.md，以及检查4个defer-开头的代码里，函数的注释是否和行为一致
