import Mock from 'mockjs'

// 接口随机响应时间
Mock.setup({ timeout: '200-600' })

// 登录接口-成功
Mock.mock('/true/api/home/login', 'post', {
  status: 200,
  data: {
    // 个人信息
    userId: 1,
    email: 'likezhen@qq.com',
    username: 'likezhen',
    firstLogin: true,
    school: '门头沟大学',
    major: '化学',
    filed: '有机',

    // 群组信息
    groupId: '11223344',
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
        name: 'Li',
        isAdmin: false
      },
      {
        logo: '/imgs/左边栏/头像-3.svg',
        name: 'Hong',
        isAdmin: false
      }
    ]
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
      userId: 1,
      email: 'likezhen@qq.com',
      username: 'likezhen',
      firstLogin: true,
      school: '门头沟大学',
      major: '化学',
      filed: '有机',

      // 群组信息
      groupId: '11223344',
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
          name: 'Li',
          isAdmin: false
        },
        {
          logo: '/imgs/左边栏/头像-3.svg',
          name: 'Hong',
          isAdmin: false
        }
      ]
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

// 获取个人项目列表接口-失败

// 获取群组项目列表接口-成功

// 获取群组项目列表接口-失败
Mock.mock('/false/api/main/group/project', 'get', {
  status: 500,
  msg: '修改失败'
})
