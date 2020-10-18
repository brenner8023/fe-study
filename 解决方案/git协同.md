# git
git：分布式的版本控制工具
简易指南：https://www.bootcss.com/p/git-guide/

[Git：改变世界的一次代码提交](https://www.cnblogs.com/huaweiyun/p/13724028.html)

- 工作区：包含新文件和已管理的文件
- 暂存区：临时保存你的改动
- 本地版本库
- 远程版本库

初始化：
```shell
git init # 让git管理当前文件夹

git config user.email "vue666@qq.com"
git config user.name "brenner"
```
## 基本操作：
```shell
git status

git add .

git commit -m "v2" # 生成版本
git commit --amend -m "xxx" # 编辑上次提交

git stash
git stash list
git stash pop

# 差异对比
git diff # 比较暂存区和工作区
git diff --cached # 比较版本区和暂存区

git rm --cached xx.js # 从暂存区删除文件，不删工作区的文件
git rm -r xx # 删除文件夹

git log -3
git reflog
```
撤销操作：
```shell
# 版本回退
git reset --hard <commitid>
git reset --mixed <commitid> # 不修改工作区
git reset --soft <commitid> # 不修改工作区和暂存区

git checkout

git revert

git restore xxx.js # 取消对该文件的修改
```

远程：
```shell
git pull origin master # 等价于 git fetch + git merge
git pull --rebase origin master # 等价于git fetch + git rebase

git remote add origin git@github.com:brenner8023/vue-mask.git

git clone git@github.com:brenner8023/vue-mask.git
```
## 分支：
```shell
git branch dev-yearparty
git checkout dev-yearparty
git checkout -b dev-yearparty

git switch dev-year
git switch -c dev-year

git branch -av

git branch -d dev-year

git merge --no-ff bugFix-yearparty

git cherry-pick
```
变基rebase：
- 如果本地commit已经提交到远程版本库，就不要对该commit使用rebase。
- `git rebase -i HEAD~3`：合并commit记录，保持分支整洁
- 相比merge来说会减少分支合并的记录

`git rebase master`(当前分支是dev1)：需要保证dev1分支只有你一个人使用
1. git会把dev1分支里面的每个commit取消掉
2. 把上面的操作临时保存成patch文件，保存在`.git/rebase`目录下
3. 把dev1分支更新到最新的master分支
4. 把上面保存的patch文件应用到dev1分支上

git rebase --continue

## 小贴士：
汇报工作：`git log --since "30 days ago" --oneline --author "X.Q. Chen" --all --graph`

##