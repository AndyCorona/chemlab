import Mock from 'mockjs'

// 接口随机响应时间
Mock.setup({ timeout: '200-600' })

// ########## 登录页面
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
  data: {},
  msg: '注册成功'
})

// 注册接口-失败
Mock.mock('/false/api/home/register', 'post', {
  status: 500,
  // 用户名已存在 || 邮箱已存在
  msg: '用户名已存在'
})

// 忘记密码-获取验证码接口-成功
Mock.mock('/true/api/home/code', 'post', {
  status: 200,
  data: {},
  msg: '获取成功'
})

// 忘记密码-获取验证码接口-失败
Mock.mock('/false/api/home/code', 'post', {
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
  data: {},
  msg: '修改成功'
})

// 修改密码接口-失败
Mock.mock('/false/api/home/update', 'post', {
  status: 500,
  msg: '修改失败'
})

// ########## 用户页面
// 退出登录接口-成功
Mock.mock('/true/api/main/logout', 'get', {
  status: 200,
  data: {},
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
  msg: '个人信息获取失败'
})

// 个人中心修改基本信息接口-成功
Mock.mock('/true/api/main/basic', 'post', {
  status: 200,
  data: {},
  msg: '修改成功'
})

// 个人中心修改基本信息接口-失败
Mock.mock('/false/api/main/basic', 'post', {
  status: 500,
  msg: '修改失败'
})

// 个人中心修改个人信息接口-成功
Mock.mock('/true/api/main/me', 'post', {
  status: 200,
  data: {},
  msg: '修改成功'
})

// 个人中心修改个人信息接口-失败
Mock.mock('/false/api/main/me', 'get', {
  status: 500,
  msg: '修改失败'
})

// 获取个人 | 群组项目列表接口-成功
Mock.mock('/true/api/main/project', 'post', {
  status: 200,
  data: [{ id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }, { id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }, { id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }, { id: 1, name: '项目1' }, { id: 2, name: '项目2' }, { id: 3, name: '项目3' }, { id: 4, name: '项目4' }, { id: 5, name: '项目5' }, { id: 6, name: '项目6' }, { id: 7, name: '项目7' }, { id: 8, name: '项目8' }],
  msg: '获取成功'
})

// 获取个人 | 群组项目列表接口-失败
Mock.mock('/false/api/main/project', 'post', {
  status: 500,
  msg: '获取失败'
})

// ########## 项目页面
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
    id: 1
  },
  msg: '创建成功'
})

// 新建个人 | 群组项目接口-失败
Mock.mock('/false/api/project', 'put', {
  status: 500,
  msg: '创建失败'
})

// 查询一个项目具体信息接口-成功
Mock.mock(/\/true\/api\/project.*/, 'get', {
  status: 200,
  data: {
    id: 1,
    name: '个人项目（固定数据哦）',
    isGroup: false,
    reactions: [
      {
        id: 1,
        name: '实验1',
        updateDate: '2022-12-12',
        tags: ['正则重中之重重中之重', '正则重中之重重中之重']
      },
      {
        id: 2,
        name: '实验2',
        updateDate: '2022-12-12',
        tags: ['正则重中之重重中之重', '正则重中之重重中之重', '正则重中之重重中之重']
      },
      {
        id: 3,
        name: '实验3',
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
        id: 7,
        name: '实验7',
        updateDate: '2022-12-12',
        tags: ['1', '2', '3']
      }
    ]
  },
  msg: '获取成功'
})

// 查询一个项目具体信息接口-失败
Mock.mock(/\/false\/api\/project.*/, 'get', {
  status: 500,
  msg: '获取失败'
})

// 重命名个人 | 群组项目接口-成功
Mock.mock('/true/api/project', 'post', {
  status: 200,
  data: {},
  msg: '修改成功'
})

// 重命名个人 ｜ 群组项目接口-失败
Mock.mock('/false/api/project', 'post', {
  status: 500,
  msg: '修改失败'
})

// ########## 群组页面
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
    UUID: '1234567899',
    slogon: '欢迎来到我的课题组',
    name: 'xxx课题组',
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
    UUID: '1234567899',
    slogon: '欢迎来到我的课题组',
    name: 'xxx课题组',
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
    UUID: '1234567899',
    slogon: '欢迎来到我的课题组',
    name: 'xxx课题组',
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
    logo: '/imgs/左边栏/头像-3.svg',
    name: '群主新加的',
    isAdmin: false
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
  data: {},
  msg: '移除成功'
})

// 移除成员接口-失败
Mock.mock('/false/api/group', 'delete', {
  status: 500,
  msg: '移除失败'
})

// ########## 反应页面
// 删除反应接口-成功
Mock.mock('/true/api/reaction', 'delete', {
  status: 200,
  data: [
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
    }
  ],
  msg: '删除成功'
})

// 删除反应接口-失败
Mock.mock('/false/api/reaction', 'delete', {
  status: 500,
  msg: '删除失败'
})

// 新增反应接口-成功
Mock.mock('/true/api/reaction', 'put', {
  status: 200,
  data: {
    id: 100
  },
  msg: '添加成功'
})

// 新增反应接口-失败
Mock.mock('/false/api/reaction', 'put', {
  status: 500,
  msg: '添加失败'
})

// 更新反应接口-成功
Mock.mock('/true/api/reaction', 'post', {
  status: 200,
  data: {
    id: 10,
    updateDate: '1111-11-11 11:11:11'
  },
  msg: '保存成功'
})

// 更新反应接口-失败
Mock.mock('/false/api/reaction', 'post', {
  status: 500,
  msg: '保存失败'
})

// 分享反应接口-成功
Mock.mock('/true/api/reaction/share', 'post', {
  status: 200,
  data: {},
  msg: '分享成功'
})

// 分享反应接口-失败
Mock.mock('/false/api/reaction/share', 'post', {
  status: 500,
  msg: '分享失败'
})

// 获取一个反应下的具体内容接口-成功
Mock.mock(/\/true\/api\/reaction.*/, 'get', {
  status: 200,
  data: {
    id: 1,
    vid: 1,
    name: '正则重中之重重中之重正则重中之重重中之重正则重中之重重中之重',
    date: '2022-12-12',
    tags: ['正则重中之重重中之重', '正则重中之重重中之重', '正则重中之重重中之重'],
    data: [
      { type: 'scheme', title: '这是一个图片模块', content: ['', '/imgs/登录页/产品图标.png'] },
      { type: 'text', title: '这是一个文本模块', content: ['11111111'] },
      { type: 'table', title: '这是一个表格模块', content: [[228, 228, 228, 228, 228], ['名称', '分子量', '质量', '产率', '备注'], [['苯甲酸', '191.3g/mol', '13g', '25%', '无'], ['苯甲酸2', '191.3g/mol', '13g', '25%', '无']]] },
      { type: 'data', title: '这是一个数据模块', content: [[['222.zip', 'uuiduudiuudiuudiuudiuuuiduuiduuiduudi', ''], ['', '', '']], [['NMR', '谱图测试', '2022-12-12'], ['NMR', '谱图测试', '2022-12-12']]] },
      { type: 'reference', title: '这是一个引用模块', content: [['https://www.baidu.com/s?tn=02003390_19_hao_pg&ie=utf-8&wd=baidu', 'https://www.baidu.com/s?tn=02003390_19_hao_pg&ie=utf-8&wd=baidu', ''], [['2022', 'Science', '这是一个题目'], ['2022', 'Science111111', '这是一个题目'], ['2022', '', '这是一个题目']]] }

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
        id: 8,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 9,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 10,
        updateDate: '2022-12-19 11:11:42'
      }
    ]
  },
  msg: '获取成功'
})

// 获取一个反应下的具体内容接口-失败
Mock.mock(/\/false\/api\/reaction.*/, 'get', {
  status: 500,
  msg: '获取失败'
})
// ########## 模版页面
// 保存模版接口-成功
Mock.mock('/true/api/template', 'put', {
  status: 200,
  data: {
    id: 1,
    name: '模版3',
    data: ['scheme', 'text', 'table', 'table', 'table']
  },
  msg: '保存成功'
})

// 保存模版接口-失败
Mock.mock('/false/api/template', 'put', {
  status: 500,
  msg: '保存失败'
})

// 获取所有模版接口-成功
Mock.mock('/true/api/template', 'get', {
  status: 200,
  data: [
    {
      id: 1,
      name: '模版少',
      data: ['table']
    },
    {
      id: 2,
      name: '模版多',
      data: ['scheme', 'scheme', 'scheme', 'table', 'data', 'text']
    },
    {
      id: 3,
      name: '一样多，顺序相同',
      data: ['scheme', 'text', 'table', 'data', 'reference']
    },
    {
      id: 4,
      name: '一样多，顺序不同',
      data: ['reference', 'text', 'table', 'data', 'scheme']
    },
    {
      id: 5,
      name: '超过15个',
      data: ['scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme', 'scheme']
    }
  ],
  msg: '获取成功'
})

// 获取所有模版接口-失败
Mock.mock('/false/api/template', 'get', {
  status: 500,
  msg: '获取失败'
})
// 删除模版接口-成功
Mock.mock('/true/api/template', 'delete', {
  status: 200,
  data: {},
  msg: '删除成功'
})

// 删除模版接口-失败
Mock.mock('/false/api/template', 'delete', {
  status: 500,
  msg: '删除失败'
})
// ########## 版本页面
// 获取一个版本接口-成功
Mock.mock(/\/true\/api\/version.*/, 'get', {
  status: 200,
  data: {
    id: 1,
    vid: 2,
    name: '版本2',
    date: '2022-12-12',
    tags: ['2', '1', '3'],
    data: [
      { type: 'scheme', title: '这是一个图片模块', content: ['', '/imgs/登录页/产品图标.png'] },
      { type: 'text', title: '这是一个文本模块', content: ['11111111'] },
      { type: 'table', title: '这是一个表格模块', content: [[228, 228, 228, 228, 228], ['名称', '分子量', '质量', '产率', '备注'], [['苯甲酸', '191.3g/mol', '13g', '25%', '无'], ['苯甲酸2', '191.3g/mol', '13g', '25%', '无']]] }
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
        id: 8,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 9,
        updateDate: '2022-12-19 11:11:42'
      }, {
        id: 10,
        updateDate: '2022-12-19 11:11:42'
      }
    ]
  },
  msg: '获取成功'
})

// 获取一个版本接口-失败
Mock.mock(/\/false\/api\/version.*/, 'get', {
  status: 500,
  msg: '获取失败'
})

// ########## 上传功能
// 上传图片接口-成功
Mock.mock('/true/api/img', 'post', {
  status: 200,
  data: ['https://img2.baidu.com/it/u=1858159654,3667320335&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=496', 'https://img2.baidu.com/it/u=1858159654,3667320335&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=496'],
  msg: '上传成功'
})
// 上传图片接口-失败
Mock.mock('/false/api/img', 'post', {
  status: 500,
  msg: '上传失败'
})

// 上传文件接口-成功
Mock.mock('/true/api/file', 'post', {
  status: 200,
  data: ['uuiduudiuudiuudiuudiuuuiduuiduuiduudi1', 'uuiduudiuudiuudiuudiuuuiduuiduuiduudi2', 'uuiduudiuudiuudiuudiuuuiduuiduuiduudi1'],
  msg: '上传成功'
})
// 上传文件接口-失败
Mock.mock('/false/api/file', 'post', {
  status: 500,
  msg: '上传失败'
})

// ########## 下载功能
// 下载文件接口
Mock.mock('/true/api/download', 'post', {
  // 二进制文件流
})
