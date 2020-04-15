<template>
  <div :id="id" :style="chartStyle" />
</template>

<script>

import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    chartStyle: {
      type: String,
      default: '{width:400px;height:400px;}'
    },
    option: {
      type: Object,
      default: null
    },
    geoJson: {
      type: Array,
      default: null
    },
    events: {
      type: Array,
      default: null
    }
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        const chart = echarts.getInstanceByDom(document.getElementById(this.id))
        if (chart) {
          if (newVal) {
            this.option = newVal
          } else {
            this.option = oldVal
          }
          this.setOption(chart)
        } else {
          this.initChart()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
    /* 窗口变化时自适应 监听窗口变化 */
    window.addEventListener('resize', this.resizeHandle)
  },
  // 释放echarts对象
  beforeDestroy() {
    const charts = echarts.getInstanceByDom(document.getElementById(this.id))
    if (charts) {
      echarts.dispose(charts)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandle)
  },
  methods: {
    getChart() {
      // dom 不存在时不画
      if (!this.id) {
        return
      }
      // 不要重复初始化
      let chart = echarts.getInstanceByDom(document.getElementById(this.id))
      if (!chart) {
        chart = echarts.init(document.getElementById(this.id))
      }
      return chart
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      if (this.geoJson) {
        this.geoJson.forEach(json => {
          echarts.registerMap(json.name, json.json)
        })
      }
      const chart = this.getChart()
      chart.on('click', params => {
        this.$emit('click-event', params)
      })
      if (this.events && this.events.length > 0) {
        this.events.forEach(event => {
          chart.on(event.name, params => {
            this.$emit(event.funcName, params)
          })
        })
      }
      this.setOption(chart)
    },
    setOption(chart) {
      chart.setOption(this.option, true)
    },
    /* 窗口变化时自适应 调用echart的 resize() */
    resizeHandle() {
      setTimeout(() => {
        const chart = echarts.getInstanceByDom(document.getElementById(this.id))
        if (chart) {
          chart.resize()
        }
      }, 100)
    }
  }
}
</script>
