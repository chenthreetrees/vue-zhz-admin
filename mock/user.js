const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    perms: ['*']
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    perms: ['*']
  }
}

export default [
  // user login
  {
    url: '/auth/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username].token

      // mock error
      if (!token) {
        return {
          errno: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        errno: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/auth/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          errno: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        errno: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/auth/logout',
    type: 'post',
    response: _ => {
      return {
        errno: 0,
        data: 'success'
      }
    }
  }
]
