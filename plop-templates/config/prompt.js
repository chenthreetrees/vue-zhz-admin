const {
  notEmpty
} = require('../utils.js')

module.exports = {
  description: 'generate a config',
  prompts: [{
    type: 'input',
    name: 'dir',
    message: 'need dir? enter please'
  },
  {
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const dir = '{{dir}}'
    const actions = [{
      type: 'add',
      path: dir ? `src/views/${dir}/${name}.js` : `src/views/${name}.js`,
      templateFile: 'plop-templates/config/index.hbs'
    }]

    return actions
  }
}
