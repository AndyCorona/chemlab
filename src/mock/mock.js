import Mock from 'mockjs'

// 接口随机响应时间
Mock.setup({ timeout: '200-600' })

// 登录接口-成功
Mock.mock('/true/api/home/login', 'post', {
  status: 200,
  data: {
    firstLogin: true
  },
  msg: '登录成功'
})

// 登录接口-失败
Mock.mock('/false/api/home/login', 'post', {
  status: 500,
  msg: '用户名或密码错误'
})

// 注册接口-成功
Mock.mock('/true/api/home/register', 'post', {
  status: 200,
  data: {
  },
  msg: '注册成功'
})

// 注册接口-失败
Mock.mock('/false/api/home/register', 'post', {
  status: 500,
  // 用户名已存在 || 邮箱已存在
  msg: '用户名已存在'
})

// 忘记密码-获取验证码接口-成功
Mock.mock(/\/true\/api\/home\/code.*/, 'get', {
  status: 200,
  data: {
  },
  msg: '获取成功'
})

// 忘记密码-获取验证码接口-失败
Mock.mock(/\/false\/api\/home\/code.*/, 'get', {
  status: 500,
  msg: '获取失败'
})

// 核对验证码接口-成功
Mock.mock('/true/api/home/verify', 'post', {
  status: 200,
  data: {
    username: 'mock',
    email: 'mock@qq.com'
  },
  msg: '验证成功'
})

// 核对验证码接口-失败
Mock.mock('/false/api/home/verify', 'post', {
  status: 500,
  msg: '验证码不正确'
})

// 修改密码接口-成功
Mock.mock('/true/api/home/update', 'post', {
  status: 200,
  data: {
  },
  msg: '修改成功'
})

// 修改密码接口-失败
Mock.mock('/false/api/home/update', 'post', {
  status: 500,
  msg: '修改失败'
})

// 退出登录接口-成功
Mock.mock('/true/api/main/logout', 'get', {
  status: 200,
  data: {
  },
  msg: '退出成功'
})

// 退出登录接口-失败
Mock.mock('/false/api/main/logout', 'get', {
  status: 500,
  msg: '退出失败'
})

// 个人中心获取个人信息接口-成功
Mock.mock('/true/api/main/info', 'get',
  {
    status: 200,
    data: {
      // 个人信息
      email: 'likezhen@qq.com',
      username: 'likezhen',
      school: '门头沟大学',
      major: '化学',
      field: '有机'
    },
    msg: '获取成功'
  }
)

// 个人中心获取个人信息接口-失败
Mock.mock('/false/api/main/info', 'get', {
  status: 500,
  msg: '信息获取失败'
})

// 个人中心修改基本信息接口-成功
Mock.mock('/true/api/main/update-basic', 'post', {
  status: 200,
  data: {},
  msg: '修改成功'
})

// 个人中心修改基本信息接口-失败
Mock.mock('/false/api/main/update-basic', 'post', {
  status: 500,
  msg: '修改失败'
})

// 个人中心修改个人信息接口-成功
Mock.mock('/true/api/main/update-me', 'post', {
  status: 200,
  data: {},
  msg: '修改成功'
})

// 个人中心修改个人信息接口-失败
Mock.mock('/false/api/main/update-me', 'get', {
  status: 500,
  msg: '修改失败'
})

// 获取个人项目列表接口-成功
Mock.mock('/true/api/main/user/project', 'get', {
  status: 200,
  data: {
    isGroup: false,
    projectList: [{ id: 1, name: '个人项目1' }, { id: 2, name: '个人项目2' }, { id: 3, name: '个人项目3' }, { id: 4, name: '个人项目4' }, { id: 5, name: '个人项目5' }, { id: 6, name: '个人项目6' }, { id: 7, name: '个人项目7' }, { id: 8, name: '个人项目8' }]
  },
  msg: '获取成功'
})

// 获取个人项目列表接口-失败
Mock.mock('/false/api/main/user/project', 'get', {
  status: 500,
  msg: '获取失败'
})

// 获取群组项目列表接口-成功
Mock.mock('/true/api/main/group/project', 'get', {
  status: 200,
  data: {
    isGroup: true,
    projectList: [{ id: 1, name: '群组项目1' }, { id: 2, name: '群组项目2' }, { id: 3, name: '群组项目3' }, { id: 4, name: '群组项目4' }, { id: 5, name: '群组项目5' }, { id: 6, name: '群组项目6' }, { id: 7, name: '群组项目7' }, { id: 8, name: '群组项目8' }, { id: 1, name: '群组项目1' }, { id: 2, name: '群组项目2' }, { id: 3, name: '群组项目3' }, { id: 4, name: '群组项目4' }, { id: 5, name: '群组项目5' }, { id: 6, name: '群组项目6' }, { id: 7, name: '群组项目7' }, { id: 8, name: '群组项目8' }, { id: 1, name: '群组项目1' }, { id: 2, name: '群组项目2' }, { id: 3, name: '群组项目3' }, { id: 4, name: '群组项目4' }, { id: 5, name: '群组项目5' }, { id: 6, name: '群组项目6' }, { id: 7, name: '群组项目7' }, { id: 8, name: '群组项目8' }, { id: 1, name: '群组项目1' }, { id: 2, name: '群组项目2' }, { id: 3, name: '群组项目3' }, { id: 4, name: '群组项目4' }, { id: 5, name: '群组项目5' }, { id: 6, name: '群组项目6' }, { id: 7, name: '群组项目7' }, { id: 8, name: '群组项目8' }]
  },
  msg: '获取成功'
})

// 获取群组项目列表接口-失败
Mock.mock('/false/api/main/group/project', 'get', {
  status: 500,
  msg: '获取失败'
})

// 删除个人｜群组项目接口-成功
Mock.mock('/true/api/project', 'delete', {
  status: 200,
  data: {},
  msg: '删除成功'
})

// 删除个人｜群组项目接口-失败
Mock.mock('/false/api/project', 'delete', {
  status: 500,
  msg: '删除失败'
})

// 成员退出 ｜｜ 群主解散群组接口-成功
Mock.mock('/true/api/group/quit', 'delete', {
  status: 200,
  data: {},
  msg: '操作成功'
})
// 成员退出 ｜｜ 群主解散群组接口-失败
Mock.mock('/false/api/group/quit', 'delete', {
  status: 500,
  msg: '操作失败'
})

// 创建课题组接口-成功
Mock.mock('/true/api/group', 'post', {
  status: 200,
  data: {
    groupUUID: '1234567899',
    groupDesc: '欢迎来到我的课题组',
    groupName: 'xxx课题组',
    isAdmin: true,
    members: [
      {
        logo: '/imgs/左边栏/头像-1.svg',
        name: 'likezhen',
        isAdmin: true
      }
    ]
  },
  msg: '创建成功'
})

// 创建课题组接口-失败
Mock.mock('/false/api/group', 'post', {
  status: 500,
  msg: '创建失败'
})

// 获取群组信息接口-成功
Mock.mock('/true/api/group', 'get', {
  status: 200,
  data: {
    groupUUID: '1234567899',
    groupDesc: '欢迎来到我的课题组',
    groupName: 'xxx课题组',
    isAdmin: true,
    members: [
      {
        logo: '/imgs/左边栏/头像-1.svg',
        name: 'likezhen',
        isAdmin: true
      },
      {
        logo: '/imgs/左边栏/头像-2.svg',
        name: 'kkkkk',
        isAdmin: false
      }
    ]
  },
  msg: '获取成功'
})
// 获取群组信息接口-失败
Mock.mock('/false/api/group', 'get', {
  status: 500,
  msg: '获取失败'
})

// 加入课题组接口-成功
Mock.mock('/true/api/group', 'put', {
  status: 200,
  data: {
    groupUUID: '1234567899',
    groupDesc: '欢迎来到我的课题组',
    groupName: 'xxx课题组',
    isAdmin: false,
    members: [
      {
        logo: '/imgs/左边栏/头像-1.svg',
        name: 'likezhen',
        isAdmin: true
      },
      {
        logo: '/imgs/左边栏/头像-2.svg',
        name: 'kkkkk',
        isAdmin: false
      }
    ]
  },
  msg: '加入成功'
})

// 加入课题组接口-失败
Mock.mock('/false/api/group', 'put', {
  status: 500,
  msg: '加入失败'
})

// 添加成员接口-成功
Mock.mock('/true/api/group/addMember', 'put', {
  status: 200,
  data: {
    groupUUID: '1234567899',
    groupDesc: '欢迎来到我的课题组',
    groupName: 'xxx课题组',
    isAdmin: true,
    members: [
      {
        logo: '/imgs/左边栏/头像-1.svg',
        name: 'likezhen',
        isAdmin: true
      },
      {
        logo: '/imgs/左边栏/头像-2.svg',
        name: 'kkkkk',
        isAdmin: false
      },
      {
        logo: '/imgs/左边栏/头像-3.svg',
        name: '群主新加的',
        isAdmin: false
      }
    ]
  },
  msg: '添加成功'
})

// 添加成员接口-失败
Mock.mock('/false/api/group/addMember', 'put', {
  status: 500,
  msg: '添加失败'
})

// 移除成员接口-成功
Mock.mock('/true/api/group', 'delete', {
  status: 200,
  data: {
    groupUUID: '1234567899',
    groupDesc: '欢迎来到我的课题组',
    groupName: 'xxx课题组',
    isAdmin: true,
    members: [
      {
        logo: '/imgs/左边栏/头像-1.svg',
        name: 'likezhen',
        isAdmin: true
      }
    ]
  },
  msg: '移除成功'
})

// 移除成员接口-失败
Mock.mock('/false/api/group', 'delete', {
  status: 500,
  msg: '移除失败'
})

// 查询一个项目具体信息接口-成功
Mock.mock('/true/api/project', 'post', {
  status: 200,
  data: {
    projectId: 1,
    projectName: '1234567899',
    isGroup: false,
    reactions: [
      {
        id: 1,
        name: '我们得出两条不可争辩的真理：第一条是，具有决定性的机动越简单，就越有把握成功；第二条是，在战斗过程中随机应变采取突然的机动，往往比事先预定的计划容易获得成功。',
        updateDate: '2022-12-12',
        tags: ['2222', '3333']
      },
      {
        id: 2,
        name: '实验2',
        updateDate: '2022-12-12',
        tags: ['1111', '2222', '3333']
      },
      {
        id: 3,
        name: '实验3',
        updateDate: '2022-12-12',
        tags: ['1111', '2222', '3333']
      },
      {
        id: 4,
        name: '实验4',
        updateDate: '2022-12-12',
        tags: ['1111', '2222', '3333']
      },
      {
        id: 5,
        name: '实验5',
        updateDate: '2022-12-12',
        tags: ['1111', '2222', '3333']
      }
    ]
  },
  msg: '获取成功'
})

// 查询一个项目具体信息接口-失败
Mock.mock('/false/api/project', 'post', {
  status: 500,
  msg: '获取失败'
})
