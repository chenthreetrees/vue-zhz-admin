const colors = ['#57e35d', '#41b9f5', '#ff66c3', '#ffff61', '#f77d6d', '#7decf0', '#01ba01', '#fec777', '#df75fa', '#e24a4a']
const config = {
  statOption1: {
    title: {
      text: '检测项目分类数量',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      top: 16
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        color: '#fff'
      },
      right: 5,
      top: 30,
      orient: 'vertical',
      data: ['合格', '不合格']
    },
    tooltip: {
      trigger: 'item',
      showContent: true
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: {
        lineStyle: {
          color: '#fff'
        },
        show: false
      },
      minorTick: {
        show: false
      }
    },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: {
        lineStyle: {
          color: '#fff'
        },
        show: false
      },
      minInterval: 1,
      boundaryGap: [0, '10%']
    },
    grid: { left: 80, top: 50, height: '75%', width: '50%' },
    series: [
      {
        name: '合格',
        type: 'bar',
        barWidth: 15,
        stack: '总量',
        itemStyle: {
          color: '#54e8d2'
        },
        label: {
          show: false
        },
        data: []
      },
      {
        name: '不合格',
        type: 'bar',
        barWidth: 15,
        stack: '总量',
        itemStyle: {
          color: '#b388ff'
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 14,
          formatter: function(params) {
            if (params.data.passNum > 0 || params.data.unPassNum > 0) {
              return params.data.passNum + params.data.unPassNum
            } else {
              return ''
            }
          }
        },
        data: []
      }
    ]
  },
  statOption2: {
    color: colors,
    title: {
      text: '近六个月检测数据变化情况',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      top: 16
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        color: '#fff'
      },
      right: 5,
      top: 30,
      orient: 'vertical',
      data: []
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLabel: { show: true, color: '#fff' },
      axisLine: {
        lineStyle: {
          color: '#4e7afb'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#4e7afb'
        }
      },
      axisLabel: { show: true, color: '#fff' },
      axisTick: { show: false },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#4e7afb'
        }
      },
      minInterval: 1
    },
    grid: { left: 20, top: 60, height: '60%', width: '75%' },
    series: []
  },
  statOption3: {
    color: colors,
    title: {
      text: '检测项目Top10',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      top: 16
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        color: '#fff'
        // rich: {
        //   a: {
        //     width: 60
        //   }
        // }
      },
      // formatter: '{a|{name}}',
      right: 5,
      top: 20,
      orient: 'vertical',
      type: 'scroll',
      pageIconColor: '#fff',
      pageIconSize: 10
    },
    tooltip: {
      trigger: 'item',
      showContent: true
    },
    grid: { left: 20, y: 100 },
    series: {
      type: 'pie',
      roseType: 'radius',
      radius: ['15%', '55%'],
      center: ['30%', '60%'],
      data: []
    }
  },
  statOption4: {
    color: colors,
    title: {
      text: '检测单位检测数量Top10',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      top: 16
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        color: '#fff'
      },
      right: 5,
      top: 20,
      orient: 'vertical',
      type: 'scroll',
      pageIconColor: '#fff',
      pageIconSize: 10
    },
    tooltip: {
      trigger: 'item',
      showContent: true
    },
    grid: { left: 20, y: 100 },
    series: {
      type: 'pie',
      // roseType: 'radius',
      minAngle: 5,
      radius: ['15%', '55%'],
      center: ['30%', '60%'],
      data: []
    }
  },
  statOption5: {
    series: [{
      type: 'wordCloud',

      // The shape of the "cloud" to draw. Can be any polar equation represented as a
      // callback function, or a keyword present. Available presents are circle (default),
      // cardioid (apple or heart shape curve, the most known polar equation), diamond (
      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

      shape: 'circle',

      // A silhouette image which the white area will be excluded from drawing texts.
      // The shape option will continue to apply as the shape of the cloud to grow.

      // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
      // Default to be put in the center and has 75% x 80% size.

      left: 'center',
      top: 'center',
      width: '100%',
      height: '80%',
      right: null,
      bottom: null,

      // Text size range which the value in data will be mapped to.
      // Default to have minimum 12px and maximum 60px size.

      sizeRange: [12, 36],

      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

      rotationRange: [-90, 90],
      rotationStep: 45,

      // size of the grid in pixels for marking the availability of the canvas
      // the larger the grid size, the bigger the gap between words.

      gridSize: 8,

      // set to true to allow word being draw partly outside of the canvas.
      // Allow word bigger than the size of the canvas to be drawn
      drawOutOfBound: false,

      // Global text style
      textStyle: {
        normal: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color can be a callback function or a color string
          color: function() {
            // Random color
            return 'rgba(55,87,181)'
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      // Data is an array. Each array item must have name and value property.
      data: [{
        'name': '农药残留',
        'value': 26
      },
      {
        'name': '生物安全',
        'value': 19
      },
      {
        'name': '食品',
        'value': 18
      },
      {
        'name': '生态环境',
        'value': 16
      },
      {
        'name': '保健品',
        'value': 15
      },
      {
        'name': '兽药残留',
        'value': 12
      }]
    }]
  },
  mapOption: {
    title: {
      text: '全国设备分布热力图',
      textStyle: {
        color: '#fff'
      },
      left: 20,
      top: 20
    },
    toolbox: {
      feature: {
        restore: {
          title: '全国',
          iconStyle: {
            borderColor: 'rgb(78, 122, 251)'
          }
        }
      },
      right: 20,
      top: 20
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `设备数<br />${params.name}：${params.value[2]}`
      }
    },
    visualMap: {
      type: 'piecewise',
      bottom: 20,
      itemWidth: 12,
      itemHeight: 12,
      inRange: {
        color: ['#ffff61', '#57e35d', '#ff66c3'],
        symbol: 'circle'
      },
      pieces: [
        { min: 1, max: 15, label: '1 - 15台' },
        { min: 15, max: 30, label: '15 - 30台' },
        { min: 30, label: '30台以上' }
      ],
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      zoom: 1.1,
      roam: false,
      itemStyle: {
        borderColor: '#4e7afb',
        areaColor: 'rgb(27,54,145)'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#112a75'
        }
      }
    },
    series: [
      {
        name: '设备数',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: function(val) {
          const size = val[2] / 2
          return size < 4 ? 4 : size
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: function(val) {
          const size = val[2] / 2
          return size < 4 ? 4 : size
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          color: 'purple',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        zlevel: 1
      }]
  },
  nameMap: {
    '甘肃省': 'Gansu',
    '青海省': 'Qinghai',
    '四川省': 'Sichuan',
    '河北省': 'Hebei',
    '云南省': 'Yunnan',
    '贵州省': 'Guizhou',
    '湖北省': 'Hubei',
    '河南省': 'Henan',
    '山东省': 'Shandong',
    '江苏省': 'Jiangsu',
    '安徽省': 'Anhui',
    '浙江省': 'Zhejiang',
    '江西省': 'Jiangxi',
    '福建省': 'Fujian',
    '广东省': 'Guangdong',
    '湖南省': 'Hunan',
    '海南省': 'Hainan',
    '辽宁省': 'Liaoning',
    '吉林省': 'Jilin',
    '黑龙江省': 'Heilongjiang',
    '山西省': 'Shanxi_1',
    '陕西省': 'Shanxi_3',
    '台湾': 'Taiwan',
    // 4直辖市
    '北京市': 'Beijing',
    '上海市': 'Shanghai',
    '重庆市': 'Chongqing',
    '天津市': 'Tianjin',
    // 5自治区
    '内蒙古自治区': 'Neimenggu',
    '广西壮族自治区': 'Guangxi',
    '西藏自治区': 'Xizang',
    '宁夏回族自治区': 'Ningxia',
    '新疆维吾尔自治区': 'Xinjiang',
    // 2特别行政区
    '香港': 'Xianggang',
    '澳门': 'Aomen'
  }
}

export default config
