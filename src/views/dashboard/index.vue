<template>
  <el-scrollbar wrap-class="self-scroll" :class="isScreenFull?'dashboard-wrap-screenfull':'dashboard-wrap'">
    <div v-if="isScreenFull" style="position:relative;" class="dashboard-title center-column">
      <div style="top:18px;position:absolute;">
        设备数据管理平台实时监测
      </div>
      <Screenfull is-quit style="right:48px;top:36px;position:absolute;" />
    </div>

    <div class="dashboard-container" :class="{'screenfull-margin':isScreenFull}">
      <el-row :gutter="30" class="row">
        <el-col :span="7" class="left-container">
          <div class="card-line left-card">
            <div class="card-panel">
              <div class="card-inner count">
                <div class="count-col">
                  <div class="item">
                    <span class="desc">快检数</span>
                    <div class="num-wrap" style="color:#e24a4a;">
                      <count-to
                        :start-val="0"
                        :end-val="info.quickDetectionNum"
                        :duration="2600"
                        class="num"
                      />
                      次
                    </div>
                  </div>
                  <div class="item center-row">
                    <span class="desc">合格率</span>
                    <div class="num-wrap" style="color:#57e35d;">
                      <count-to
                        :start-val="0"
                        :end-val="Number(info.detectionPercentPass)"
                        :duration="2600"
                        class="num"
                      />
                      %
                    </div>
                  </div>
                </div>
                <div class="count-col">
                  <div class="item center-row">
                    <span class="desc">法检数</span>
                    <div class="num-wrap" style="color:#ffff61;">
                      <count-to
                        :start-val="0"
                        :end-val="info.lawDetectionNum"
                        :duration="2600"
                        class="num"
                      />
                      次
                    </div>
                  </div>
                  <div class="item center-row" style="color:#ff66c3;">
                    <span class="desc">合规率</span>
                    <div class="num-wrap">
                      <count-to
                        :start-val="0"
                        :end-val="Number(info.detectionPercentOk)"
                        :duration="2600"
                        class="num"
                      />
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-line card-margin left-card">
            <div class="card-panel">
              <div class="card-inner">
                <Chart
                  id="sta1"
                  ref="sta1"
                  :option="config.statOption1"
                  :chart-style="statStyle"
                />
              </div>
            </div>
          </div>
          <div class="card-line card-margin left-card">
            <div class="card-panel">
              <div class="card-inner">
                <Chart
                  id="sta2"
                  ref="sta2"
                  :option="config.statOption2"
                  :chart-style="statStyle"
                />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10" class="mid-container">
          <div class="card-line date-card">
            <div class="card-panel">
              <div class="card-inner data self-input">
                时间段：
                <el-date-picker
                  v-model="time"
                  style="margin:0 12px;flex:1;"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  @change="handleMonthChange"
                />
                <el-button type="primary" @click="load">
                  查询
                </el-button>
              </div>
            </div>
          </div>
          <div class="card-line card-margin main-card">
            <div class="card-panel">
              <div class="card-inner">
                <Chart
                  id="map"
                  ref="map"
                  :events="mapEvents"
                  :geo-json="geoJson"
                  :option="config.mapOption"
                  chart-style="{width:100%;height:100%;min-height:670px;padding:0 24px;}"
                  @click-event="handleMapClick"
                />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="right-container">
          <div class="card-line right-card">
            <div class="card-panel">
              <div class="card-inner">
                <div class="search-wrap">
                  数据检索
                  <el-input v-model="searchValue" placeholder="请输入内容" class="search self-input">
                    <template slot="append">
                      查询
                    </template>
                  </el-input>

                  <Chart
                    id="sta5"
                    ref="sta5"
                    :option="config.statOption5"
                    chart-style="{flex:1;height:100%;min-height:156px;}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card-line card-margin right-card">
            <div class="card-panel ">
              <div class="card-inner">
                <Chart
                  id="sta3"
                  ref="sta3"
                  :option="config.statOption3"
                  :chart-style="statStyle"
                />
              </div>
            </div>
          </div>
          <div class="card-line card-margin right-card">
            <div class="card-panel">
              <div class="card-inner">
                <Chart
                  id="sta4"
                  ref="sta4"
                  :option="config.statOption4"
                  :chart-style="statStyle"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script>
import CountTo from 'vue-count-to'
import Chart from '@/components/ECharts'
import indexConf from './config/indexConf'
import { mapGetters } from 'vuex'
import { ChinaData, ProvinceData } from 'china-map-geojson'
import Screenfull from '@/components/Screenfull'
import { getLastMonths } from '@/utils/moment'
import geoMap from './config/geoMap'
import { index, indexCity } from '@/api/zhz/stat'

export default {
  components: { CountTo, Chart, Screenfull },
  data() {
    return {
      info: {},
      config: indexConf,
      listQuery: {
        time1: '',
        time2: ''
      },
      searchValue: '',
      time: getLastMonths(6),
      geoJson: [],
      statStyle: '{width:100%;height:100%;min-height:244px;padding:0 24px;}',
      mapEvents: [{ name: 'restore', funcName: 'click-event' }],
      mapData: null
    }
  },
  computed: {
    ...mapGetters([
      'isScreenFull',
      'sidebar'
    ])
  },
  watch: {
    sidebar: {
      handler(newVal, oldVal) {
        this.resizeHandle()
      },
      deep: true
    }
  },
  created() {
    this.geoJson.push({ name: 'china', json: ChinaData })
    for (const key in ProvinceData) {
      const data = {
        name: key,
        json: ProvinceData[key]
      }
      this.geoJson.push(data)
    }
    this.listQuery.time1 = getLastMonths(6)[0]
    this.listQuery.time2 = getLastMonths(6)[1]
    this.load()
  },
  methods: {
    handleMonthChange(val) {
      if (val) {
        this.listQuery.time1 = val[0]
        this.listQuery.time2 = val[1]
      } else {
        this.listQuery.time1 = getLastMonths(6)[0]
        this.listQuery.time2 = getLastMonths(6)[1]
      }
    },
    load() {
      index(this.listQuery).then(res => {
        const indexData = res.data.data
        this.info = indexData
        const dataItems = indexData.detectionProjectClassify
        const yearDataChange = indexData.yearDataChange
        const detectionProjectTop10 = indexData.detectionProjectTop10
        const detectionUnitTop10 = indexData.detectionUnitTop10
        this.mapData = indexData.deviceMapData.map((item) => {
          const data = {
            name: item.text,
            value: item.num
          }
          return data
        })
        this.setProjectStat(dataItems)
        this.setChangeStat(yearDataChange)
        this.setPieStat(detectionProjectTop10, this.config.statOption3, 'text')
        this.setPieStat(detectionUnitTop10, this.config.statOption4, 'text')
        this.setMapData(geoMap, this.mapData)
      })
    },
    loadCity(provinceName) {
      const data = { provinceName: provinceName }
      indexCity(data).then(res => {
        const indexCityData = res.data.data
        this.config.mapOption.geo.map = this.config.nameMap[provinceName]
        this.config.mapOption.title.text = `${provinceName}设备分布热力图`
        const cityData = indexCityData.map((item) => {
          const data = {
            name: item.text === '市辖区' ? provinceName : item.text,
            value: item.num
          }
          return data
        })
        this.setMapData(this.getCityGeo(provinceName), cityData)
      })
    },
    setProjectStat(dataItems) {
      this.config.statOption1.yAxis.data = []
      this.config.statOption1.series[0].data = []
      this.config.statOption1.series[1].data = []
      this.config.statOption1.grid.height = (dataItems.length * 75 / 6) + '%'
      dataItems.forEach(item => {
        this.config.statOption1.yAxis.data.push(item.text)
        const data1 = {
          name: item.text,
          value: item.passNum,
          passNum: item.passNum,
          unPassNum: item.unPassNum
        }
        const data2 = {
          name: item.text,
          value: item.unPassNum,
          passNum: Number(item.passNum),
          unPassNum: Number(item.unPassNum)
        }
        this.config.statOption1.series[0].data.push(data1)
        this.config.statOption1.series[1].data.push(data2)
      })
    },
    setChangeStat(yearDataChange) {
      const xAxisData = yearDataChange.dataChange
      const dataItems = yearDataChange.dataItems
      const dataSource = yearDataChange.dataSource
      this.config.statOption2.xAxis.data = xAxisData
      this.config.statOption2.legend.data = dataSource
      this.config.statOption2.series = []
      const startColors = ['rgba(255,255,97,1)',
        'rgba(87,227,93,1)',
        'rgba(255,102,195,1)']
      const endColors = ['rgba(255,255,97,0)',
        'rgba(87,227,93,0)',
        'rgba(255,102,195,0)']
      dataItems.forEach((item, index) => {
        const source = {
          name: item.text,
          smooth: true,
          type: 'line',
          data: item.num,
          label: {
            color: '#fff'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: startColors[index % 3] // 0% 处的颜色
              }, {
                offset: 1, color: endColors[index % 3] // 100% 处的颜色
              }]
            }
          }
        }
        this.config.statOption2.series.push(source)
      })
    },
    setPieStat(caseData, option, key) {
      option.series.data = []
      caseData.forEach((item, index) => {
        const pieData = this.getPieData(item, key)
        option.series.data.push(pieData)
      })
    },
    getPieData(item, key) {
      return {
        name: item[key],
        value: item.num,
        label: {
          color: '#fff',
          position: 'outside',
          bleedMargin: 5,
          formatter: function(params) {
            const value = params.value
            if (value > 0) {
              return `${params.percent}%`
            } else {
              return ''
            }
          }
        },
        labelLine: {
          show: item.num > 0,
          lineStyle: {
            color: '#fff'
          }
        }
      }
    },
    setMapData(geoArr, data) {
      this.$set(this.config.mapOption.series[0], 'data', this.convertData(geoArr, data))
      this.$set(this.config.mapOption.series[1], 'data', this.convertData(geoArr, data.sort(function(a, b) {
        return b.value - a.value
      }).slice(0, 5)))
    },
    convertData(geoArr, data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = this.getGeo(geoArr, data[i])
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    getGeo(geoArr, data) {
      const result = []
      for (let j = 0; j < geoArr.length; j++) {
        const geo = geoArr[j]
        if (data.name.indexOf(geo.name) !== -1) {
          result.push(geo.log)
          result.push(geo.lat)
          return result
        }
      }
    },
    getCityGeo(province) {
      for (let j = 0; j < geoMap.length; j++) {
        const provinceGeo = geoMap[j]
        if (province === provinceGeo.name) {
          return provinceGeo.children
        }
      }
    },
    handleMapClick(params) {
      if (params.type === 'restore') {
        this.config.mapOption.geo.map = 'china'
        this.config.mapOption.title.text = '全国设备分布热力图'
        this.setMapData(geoMap, this.mapData)
      } else if (params.componentType === 'series') {
        if (!this.config.nameMap[params.name]) { return }
        this.loadCity(params.name)
      }
    },
    resizeHandle() {
      setTimeout(() => {
        this.$refs.sta1.getChart().resize()
        this.$refs.sta2.getChart().resize()
        this.$refs.sta3.getChart().resize()
        this.$refs.sta4.getChart().resize()
        this.$refs.sta5.getChart().resize()
        this.$refs.map.getChart().resize()
      }, 200)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.self-input input.el-input__inner{
  border-radius:0px;
  background-color: transparent;
  border: 1px solid #3757b5;
  color: #fff;
}

.self-input .el-date-editor.el-input__inner{
  border-radius:0px;
  background-color: transparent;
  border: 1px solid #3757b5;
  color: #fff;
}
.self-input .el-date-editor .el-range-separator{
  color: #3757b5;
}
.self-input .el-date-editor .el-range-input{
  color: #fff;
}
.self-input .el-date-editor .el-range__icon{
  color: #3757b5;
}
.self-input input{
  background-color: transparent;
}

// .self-input input::-webkit-input-placeholder {
//   color: #3757b5;
// }
.self-input .el-button--primary{
    background-color: #3757b5;
    border-color: #3757b5;
}
.self-input .el-input-group__append{
    background-color: #3757b5;
    color: #fff;
    border: 0;
    border-radius: 0px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
$cardColor:#112a75;
$lineColor:#4e7afb;
$borderColor:#1e3e9c;
$smallCardH:244px;

.dashboard-wrap{
  width: 100%;
  height: $mainH;
}
.dashboard-wrap-screenfull{
  width: 100%;
  height: 100vh;
}
.screenfull-margin{
  margin-top:24px;
}
.dashboard-title{
  width: 100%;
  height: 90px;
  color: #fff;
  font-size: 24px;
  margin-top: 24px;
}
.card-line{
  background: $borderColor;
}
.card-margin{
  margin-top: 30px;
}
.card-panel{
  height: 100%;
  background: linear-gradient($lineColor, $lineColor) left top,
  linear-gradient($lineColor, $lineColor) left top,
  linear-gradient($lineColor, $lineColor) right top,
  linear-gradient($lineColor, $lineColor) right top,
  linear-gradient($lineColor, $lineColor) left bottom,
  linear-gradient($lineColor, $lineColor) left bottom,
  linear-gradient($lineColor, $lineColor) right bottom,
  linear-gradient($lineColor, $lineColor) right bottom;
  background-repeat: no-repeat;
  background-size: 2px 12px, 12px 2px;
  padding: 2px;
}
.card-inner{
  height: 100%;
  background: $cardColor;
}
.row{
  height:100%;
}
.dashboard-container {
  padding: 16px;
  min-width: 1700px;
  height: 100%;
  .left-container{
    height: 100%;
    display: flex;
    flex-flow: column;
    .left-card{
      flex:1;
    }
    .count{
      min-height: $smallCardH;
      padding: 16px;
      display: flex;
      .count-col{
        flex: 1;
        display: flex;
        flex-flow: column;
        padding: 6px;
        .item{
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 12px;
          cursor: pointer;
          border: 2px solid $borderColor;
          .num-wrap{
            flex: 1;
            text-align: center;
            .num {
              font-size: 42px;
              text-align: center;
            }
          }
          .desc {
            width: 20px;
            color: #fff;
            margin: 0 12px;
            margin-top: 0 auto;
            line-height: 20px;
            font-size: 18px;
          }
        }
        .item:last-child{
          margin-top: 12px;
        }
      }
    }
  }
  .mid-container{
    height: 100%;
    display: flex;
    flex-flow: column;
    .date-card{
      height: 100px;
      .data{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 24px;
        color: #fff;
      }
    }
    .main-card{
      flex: 1;
    }
  }
  .right-container{
    height: 100%;
    display: flex;
    flex-flow: column;
    .right-card{
      flex:1;
    }
    .search-wrap{
      display: flex;
      flex-flow: column;
      height:100%;
      width:100%;
      font-size: 16px;
      color: #fff;
      padding: 12px 48px;
      .search{
        margin-top: 10px;
      }
    }
  }
}
</style>
