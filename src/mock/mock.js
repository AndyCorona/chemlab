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

// 获取个人 | 群组项目列表接口-成功
Mock.mock(/\/true\/api\/main\/project.*/, 'get', {
  status: 200,
  data: [{ id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }, { id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }, { id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }, { id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }],
  msg: '获取成功'
})

// 获取个人 | 群组项目列表接口-失败
Mock.mock(/\/false\/api\/main\/project/, 'get', {
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

// 新建个人 | 群组项目接口-成功
Mock.mock('/true/api/project', 'put', {
  status: 200,
  data: {
    projectId: 1,
    projectName: '项目1(固定数据哦)',
    isGroup: false,
    reactions: []
  },
  msg: '创建成功'
})

// 新建个人 | 群组项目接口-失败
Mock.mock('/false/api/project', 'put', {
  status: 500,
  msg: '创建失败'
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
Mock.mock('/true/api/project', 'get', {
  status: 200,
  data: {
    projectId: 1,
    projectName: '个人项目（固定数据哦）',
    isGroup: false,
    reactions: [
      {
        id: 1,
        name: '正则重中之重重中之重正则重中之重重中之重正则重中之重重中之重',
        updateDate: '2022-12-12',
        tags: ['正则重中之重重中之重', '正则重中之重重中之重']
      },
      {
        id: 2,
        name: '111111111122222222223333333333',
        updateDate: '2022-12-12',
        tags: ['正则重中之重重中之重', '正则重中之重重中之重', '正则重中之重重中之重']
      },
      {
        id: 3,
        name: 'aaaaaaaaaazzzzzzzzzzoooooooooo',
        updateDate: '2022-12-12',
        tags: ['正则重中之重重中之重']
      },
      {
        id: 4,
        name: '实验4',
        updateDate: '2022-12-12',
        tags: ['1111111111', '2222222222', '9999999999']
      },
      {
        id: 5,
        name: '实验5',
        updateDate: '2022-12-12',
        tags: ['aaaaaaaaaa', 'zzzzzzzzzz', 'oooooooooo']
      },
      {
        id: 6,
        name: '实验6',
        updateDate: '2022-12-12',
        tags: []
      },
      {
        id: 6,
        name: '实验6',
        updateDate: '2022-12-12',
        tags: ['1', '2', '3']
      }
    ]
  },
  msg: '获取成功'
})

// 查询一个项目具体信息接口-失败
Mock.mock('/false/api/project', 'get', {
  status: 500,
  msg: '获取失败'
})

// 重命名个人 | 群组项目接口-成功
Mock.mock('/true/api/project', 'post', {
  status: 200,
  data: {
  },
  msg: '修改成功'
})

// 重命名个人 ｜ 群组项目接口-失败
Mock.mock('/false/api/project', 'post', {
  status: 500,
  msg: '修改失败'
})

// 删除反应接口-成功
Mock.mock('/true/api/reaction', 'delete', {
  status: 200,
  msg: '删除成功'
})

// 删除反应接口-失败
Mock.mock('/false/api/reaction', 'delete', {
  status: 500,
  msg: '删除失败'
})

// 获取一个反应下的具体内容接口-成功
Mock.mock('/true/api/reaction', 'get', {
  status: 200,
  data: {
    reactionId: 1,
    reactionName: '正则重中之重重中之重正则重中之重重中之重正则重中之重重中之重',
    date: '2022-12-12',
    tags: ['正则重中之重重中之重', '正则重中之重重中之重', '正则重中之重重中之重'],
    data: [
      { type: 'scheme', title: '这是一个图片模块', content: '/imgs/登录页/产品图标.png' },
      { type: 'text', title: '这是一个文本模块', content: '11111111' },
      { type: 'table', title: '这是一个表格模块', content: [[228, 228, 228, 228, 228], ['名称', '分子量', '质量', '产率', '备注'], ['苯甲酸', '191.3g/mol', '13g', '25%', '无'], ['苯甲酸2', '191.3g/mol', '13g', '25%', '无']] },
      { type: 'data', title: '这是一个数据模块', content: [[['222.zip', 'url1'], ['', '']], ['NMR', '谱图测试', '2022-12-12'], ['NMR', '谱图测试', '2022-12-12']] },
      { type: 'reference', title: '这是一个引用模块', content: [['https://www.baidu.com/s?tn=02003390_19_hao_pg&ie=utf-8&wd=baidu', 'https://www.baidu.com/s?tn=02003390_19_hao_pg&ie=utf-8&wd=baidu', ''], ['2022', 'Science', '这是一个题目'], ['2022', 'Science111111', '这是一个题目'], ['2022', '', '这是一个题目']] }
    ],
    versions: [
      {
        id: 1,
        updateDate: '2022-12-01 11:11:42'
      },
      {
        id: 2,
        updateDate: '2022-12-02 11:11:42'
      }, {
        id: 3,
        updateDate: '2022-12-12 11:11:42'
      }, {
        id: 4,
        updateDate: '2022-12-14 11:11:42'
      }, {
        id: 5,
        updateDate: '2022-12-12 11:11:42'
      }, {
        id: 6,
        updateDate: '2022-12-16 11:11:42'
      }, {
        id: 7,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 7,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 7,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 7,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 7,
        updateDate: '2022-12-19 11:11:42'
      }
    ]
  },
  msg: '获取成功'
})

// 获取一个反应下的具体内容接口-失败
Mock.mock('/false/api/reaction', 'get', {
  status: 500,
  msg: '获取失败'
})
