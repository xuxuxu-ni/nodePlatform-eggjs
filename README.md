# nodePlatform
### 基于egg.js编写的cms权限管理平台
### 前台: [vue-xuAdmin](https://github.com/Nirongxu/vue-xuAdmin) (因为权限需要后台可配置,权限部分做了修改)
### 后台: egg.js
### 数据库: mysql

### 以实现功能
#### 使用之前请先了解`egg.js`，然后把`/server/config/config.local.js`数据库配置成自己的，只要手动创建数据库就行，数据表在系统运行时会自动创建
- [x] 登录、注册
- [x] token校验过期处理（临时过期，永久过期）
- [x] 账号管理（增加，删除，修改）
- [x] 角色管理，（增加，删除，修改）系统默认创建超级管理员，除了自己任何角色不可对其删除修改，
- [x] 权限管理 对每个角色分配不同的路由权限，
- [x] 文章管理 （增加，删除，修改）文章发布编辑器有`markdown`和`富文本`两种模式，`markdown`解析为`markdown`，`html`，`json`三种文本格式
- [x] 评论管理 （增加，删除，修改）

