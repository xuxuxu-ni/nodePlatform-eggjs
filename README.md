# nodePlatform
### 基于egg.js编写的cms权限管理平台
### 前台: [vue-xuAdmin](https://github.com/Nirongxu/vue-xuAdmin) (因为本项目的权限需要后台可配置,所以`vue-xuAdmin`的权限部分做了修改)
### 后台: egg.js
### 数据库: mysql

### 已实现功能
#### 使用之前请先了解`egg.js`，然后把`/server/config/config.local.js`数据库配置成自己的，只要手动创建数据库就行，数据表在系统运行时会自动创建,并且自动创建超级管理员账号,为了系统稳定性该账号不可以被删除,不可以被降级权限

- [x] 注册
- [x] 登录
- [x] token校验过期处理（临时过期，永久过期）
- [ ] 微信登录
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
- [x] 个人资料修改
- [x] 角色管理，（增加，删除，修改）系统默认创建超级管理员，除了自己任何角色不可对其删除修改
- [x] 管理员对普通用户资料修改
- [x] 账号管理（增加，删除，修改）
- [x] 添加账号
- [x] 用户列表
- [x] 用户状态管理
- [x] 权限管理 对每个角色分配不同的路由权限，

![image.png](https://i.loli.net/2019/12/26/8LCoklMW4sPg3rH.png)
![image.png](https://i.loli.net/2019/12/26/6hn2wL1qzcEoNI5.png)
![image.png](https://i.loli.net/2019/12/26/1u6A5ChPnNtKXcQ.png)
![image.png](https://i.loli.net/2019/12/26/JL7nEmjWCvfXxTO.png)
![image.png](https://i.loli.net/2019/12/26/N8JkRE5DzZlWfYp.png)
![image.png](https://i.loli.net/2019/12/26/6KbydLqF5ADjXgk.png)
![image.png](https://i.loli.net/2019/12/26/MI9CJSw5Leki7Fh.png)
![image.png](https://i.loli.net/2019/12/26/THP75qMD964xmCy.png)
![image.png](https://i.loli.net/2019/12/26/VPlrNURWHmhaDAd.png)
![image.png](https://i.loli.net/2019/12/26/JQzEFRYcAMSm1bP.png)



