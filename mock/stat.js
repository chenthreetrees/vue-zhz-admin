
export default [
  {
    url: '/stat/index',
    type: 'post',
    response: config => {
      return {
        errno: 0,
        data: {
          'detectionPercentPass': '100',
          'detectionProjectClassify': [
            {
              'text': '生物安全',
              'num': 2,
              'passNum': '2',
              'unPassNum': '0'
            }
          ],
          'lawDetectionNum': 0,
          'detectionPercentOk': '0',
          'yearDataChange': {
            'dataChange': [
              '11 月',
              '12 月',
              '1 月',
              '2 月',
              '3 月',
              '4 月'
            ],
            'dataItems': [
              {
                'text': '检测总量',
                'num': [
                  0,
                  0,
                  0,
                  0,
                  0,
                  2
                ]
              },
              {
                'text': '合格',
                'num': [
                  0,
                  0,
                  0,
                  0,
                  0,
                  2
                ]
              }
            ],
            'dataSource': [
              '检测总量',
              '合格'
            ]
          },
          'detectionProjectTop10': [
            {
              'text': '黄曲霉毒素M1',
              'num': 2,
              'percentPass': null,
              'percentOk': null
            }
          ],
          'detectionUnitTop10': [
            {
              'text': '阿勇科技',
              'num': 2,
              'percentPass': '100',
              'percentOk': '0'
            }
          ],
          'deviceMapData': [
            {
              'text': '福建省',
              'num': 2
            }
          ],
          'quickDetectionNum': 2
        }
      }
    }
  },
  {
    url: '/stat/indexCity',
    type: 'post',
    response: config => {
      return {
        errno: 0,
        data: [
          {
            'text': '厦门市',
            'num': 2
          }
        ]
      }
    }
  },
  {
    url: '/dv/device/list',
    type: 'post',
    response: config => {
      return {
        'errno': 0,
        'data': {
          'items': [
            {
              'id': 162,
              'level': '00002',
              'createDate': '2020-04-13 10:44:40',
              'updateDate': '2020-04-14 14:52:31',
              'delFlag': 0,
              'deviceName': '农残检测仪',
              'deviceType': 0,
              'deviceNo': '20200413',
              'deviceSerialNumber': '20200413',
              'checkTime': null,
              'factory': '中合众',
              'belongUnitId': 59,
              'belongUnit': '阿勇科技',
              'belongUnitLevel': '00002',
              'saveAddress': '创业大厦',
              'inWarehouseTime': '2020-04-14 00:00:00',
              'deviceStatus': 0,
              'description': '111',
              'adminAccount': 'admin',
              'adminPassword': 'admin'
            },
            {
              'id': 163,
              'level': '00002',
              'createDate': '2020-04-14 14:13:27',
              'updateDate': null,
              'delFlag': 0,
              'deviceName': '多功能检测设备',
              'deviceType': 1,
              'deviceNo': '123',
              'deviceSerialNumber': '53333',
              'checkTime': null,
              'factory': '梦珂',
              'belongUnitId': 59,
              'belongUnit': '阿勇科技',
              'belongUnitLevel': '00002',
              'saveAddress': 'jimei',
              'inWarehouseTime': null,
              'deviceStatus': 0,
              'description': '',
              'adminAccount': 'cws111',
              'adminPassword': '123456'
            },
            { 'id': 165,
              'level': '00004',
              'createDate': '2020-04-15 14:18:59',
              'updateDate': null,
              'delFlag': 0,
              'deviceName': '农残检测仪',
              'deviceType': 0,
              'deviceNo': '1001001',
              'deviceSerialNumber': '100100101',
              'checkTime': null,
              'factory': '厦门中合众科技有限公司',
              'belongUnitId': 67,
              'belongUnit': '厦门某某农业局',
              'belongUnitLevel': '00004',
              'saveAddress': '福建省厦门市思明区',
              'inWarehouseTime': '2020-04-15 00:00:00',
              'deviceStatus': 0,
              'description': '',
              'adminAccount': 'admin',
              'adminPassword': 'admin'
            }
          ],
          'total': 3
        }
      }
    }
  }
]
