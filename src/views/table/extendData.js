const extendData = {
  deviceType: [
    {
      label: '食品药品',
      value: 0
    },
    {
      label: '生态环境',
      value: 1
    },
    {
      label: '生物安全',
      value: 2
    },
    {
      label: '农资检测',
      value: 3
    },
    {
      label: '其他',
      value: 4
    }
  ],
  deviceName: [
    { label: '农残检测仪' },
    { label: '手残式兽残检测仪' },
    { label: '台式兽残检测仪' },
    { label: '多功能检测设备' }
  ],
  deviceStatus: [
    {
      label: '在库',
      value: 0
    },
    {
      label: '已领用',
      value: 1
    }
  ],
  receiveStatus: [
    {
      label: '未还',
      value: 0
    },
    {
      label: '已逾期',
      value: 1
    },
    {
      label: '已还',
      value: 2
    },
    {
      label: '逾期还',
      value: 3
    }
  ],
  checkStatus: [
    {
      label: '待审核',
      value: 0
    },
    {
      label: '合规',
      value: 1
    },
    {
      label: '不合规',
      value: 2
    }
  ],
  detectionProjectClassify: [
    {
      label: '食品'
    },
    {
      label: '保健品'
    },
    {
      label: '生物安全'
    },
    {
      label: '生态环境'
    },
    {
      label: '农资检测'
    },
    {
      label: '其他'
    }
  ],
  checkResult: [
    {
      label: '待审核',
      value: 0
    },
    {
      label: '合规',
      value: 1
    },
    {
      label: '不合规',
      value: 2
    }
  ],
  logType: [
    {
      label: '系统登录',
      value: 0
    },
    {
      label: '检测数据',
      value: 1
    },
    {
      label: '数据统计',
      value: 2
    },
    {
      label: '设备管理',
      value: 3
    },
    {
      label: '系统配置',
      value: 4
    }
  ],
  sex: [
    {
      label: '男'
    },
    {
      label: '女'
    }
  ]
}

export default extendData
