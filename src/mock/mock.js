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
    isActivated: false,
    firstLogin: true,
    school: '上海科技大学',
    major: '化学',
    filed: '发光材料',

    // 群组信息
    groupId: '11223344',
    groupDesc: '欢迎来到我的课题组',
    groupName: 'xxx课题组',
    isAdmin: false,
    members: [
      {
        logo: 'xxx.img',
        name: 'Ye'
      },
      {
        logo: 'xxx.img',
        name: 'Li'
      },
      {
        logo: 'xxx.img',
        name: 'Hong'
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
