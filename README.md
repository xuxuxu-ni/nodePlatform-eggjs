# nodePlatform
### 基于egg.js+jwt+mysql编写的开箱即用的权限管理后台
### 前台: [vue-xuAdmin](https://github.com/Nirongxu/vue-xuAdmin) (因为本项目的权限需要后台可配置,所以`vue-xuAdmin`的权限部分做了修改)
### 后台: egg.js
### 数据库: mysql

### 演示地址(乞丐版服务器比较卡):http://49.235.188.111

👤 **NiRongxu**

* Github: [@NiRongxu](https://github.com/NiRongxu)
* QQ: 595485548
* QQ群: 157216616
* email: 595485548@qq.com

### 已实现功能
#### 使用之前请先了解`egg.js`，然后把`/server/config/config.local.js`数据库配置成自己的，只要手动创建数据库就行，数据表在系统运行时会自动创建,并且自动创建超级管理员账号,为了系统稳定性该账号不可以被删除,不可以被降级权限

- [x] 注册
- [x] 登录
- [x] token校验过期处理（临时过期，永久过期）
- [ ] 微信登录
- [x] 个人资料修改
- [x] 角色管理，（增加，删除，修改）系统默认创建超级管理员角色，除了超级管理员任何角色不可对其删除修改
- [x] 权限管理 对每个角色分配不同的页面路由权限和按钮权限，(当前角色的用户只能分配自己拥有的页面权限和按钮权限)
- [x] 管理员对普通用户资料修改
- [x] 账号管理（增加，删除，修改）系统默认创建超级管理员账号，除了超级管理员任何角色不可对其删除修改
- [x] 添加账号
- [x] 用户列表
- [x] 用户状态管理
- [x] 发表文章 文章发布编辑器有`markdown`和`富文本`两种模式，`markdown`解析为`markdown`，`html`，`json`三种文本格式
- [x] 文章缩略图
- [x] 文章banner
- [x] 修改文章
- [x] 删除文章
- [x] 文章列表
- [x] 发表评论
- [x] 回复评论
- [x] 评论管理 （增加，删除，修改）
- [x] 评论列表

### 系统截图
#### 首次运行截图
![image.png](https://i.loli.net/2019/12/27/dJ8ypE9MnBT2OiD.png)
#### 内容截图
![image.png](https://i.loli.net/2019/12/26/8LCoklMW4sPg3rH.png)
![image.png](https://i.loli.net/2020/05/13/67n2YkZwxLBFDMy.png)
![image.png](https://i.loli.net/2020/05/13/csZJ1Ydkgem3SMV.png)
![image.png](https://i.loli.net/2020/05/13/gVeOjTvFns3ou4W.png)
![image.png](https://i.loli.net/2020/05/13/iKx1uf3JbHAYzCw.png)
![image.png](https://i.loli.net/2019/12/27/hqV6uDIk8CmUc5O.png)
![image.png](https://i.loli.net/2019/12/26/JL7nEmjWCvfXxTO.png)
![image.png](https://i.loli.net/2019/12/26/6KbydLqF5ADjXgk.png)
![image.png](https://i.loli.net/2019/12/27/ez93ycY68tCwovj.png)
![image.png](https://i.loli.net/2019/12/26/THP75qMD964xmCy.png)
![image.png](https://i.loli.net/2019/12/26/VPlrNURWHmhaDAd.png)

## 结语
如果这个框架对你有帮助的话，请给个星点个star



