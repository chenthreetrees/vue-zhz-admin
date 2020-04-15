<template>
  <div class="center-row">
    <el-select
      v-model="region.province"
      value-key="label"
      placeholder="请选择省份"
      @change="handleProvinceChange"
    >
      <el-option v-for="item in provinces" :key="item.id" :label="item.label" :value="item" />
    </el-select>
    <el-select
      v-if="level > 1 && citys.length > 0"
      v-model="region.city"
      value-key="label"
      style="margin-left:12px;"
      placeholder="请选择城市"
      @change="handleCityChange"
    >
      <el-option v-for="item in citys" :key="item.id" :label="item.label" :value="item" />
    </el-select>
    <el-select
      v-if="level > 2 && countys.length > 0"
      v-model="region.county"
      value-key="label"
      style="margin-left:12px;"
      placeholder="请选择区县"
      @change="handleCountyChange"
    >
      <el-option v-for="item in countys" :key="item.id" :label="item.label" :value="item" />
    </el-select>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: {
    level: {
      type: Number,
      default: 3
    },
    province: {
      type: Object,
      default: null
    },
    city: {
      type: Object,
      default: null
    },
    county: {
      type: Object,
      default: null
    },
    lastLevel: {// 是否在最后一层选择完成才返回结果
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: '/dv/region/treeList'
    }
  },
  data() {
    return {
      region: {
        province: this.province,
        city: this.city,
        county: this.county
      },
      provinces: [],
      citys: [],
      countys: []
    }
  },
  created() {
    this.loadRegions(0, 0)
    if (this.region.province != null) {
      this.loadRegions(1, this.region.province.id)
      if (this.region.city != null) {
        this.loadRegions(2, this.region.city.id)
      }
    }
  },
  methods: {
    loadRegions(type, nodeId) {
      this.getRegionNodes(type, nodeId).then(res => {
        let data = res.data.data
        data = data.map(item => {
          return {
            id: item.id,
            label: item.label,
            leaf: item.leaf
          }
        })
        if (type === 0) {
          this.provinces = data
        } else if (type === 1) {
          this.citys = data
        } else if (type === 2) {
          this.countys = data
        }
      })
    },
    handleProvinceChange(value) {
      this.loadRegions(1, value.id)
      this.region.city = null
      this.region.county = null
      this.citys = []
      this.countys = []
      this.emitResult(1)
    },
    handleCityChange(value) {
      this.loadRegions(2, value.id)
      this.region.county = null
      this.countys = []
      this.emitResult(2)
    },
    handleCountyChange(value) {
      this.emitResult(3)
    },
    emitResult(level) {
      if (this.lastLevel) {
        if (this.level <= level) {
          this.$emit('region-change', this.region, level)
        }
      } else {
        this.$emit('region-change', this.region, level)
      }
    },
    getRegionNodes(type, nodeId) {
      return request({
        url: this.url,
        method: 'get',
        params: {
          type: type,
          pid: nodeId
        }
      })
    }
  }
}

</script>
