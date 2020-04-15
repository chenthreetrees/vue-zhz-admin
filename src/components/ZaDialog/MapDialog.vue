<template>
  <ZaDialog
    title="选择地址"
    width="960px"
    @cancel-event="handleCancel"
    @confirm-event="handleConfirm"
  >
    <div class="center-row">
      <ZaRegion
        :level="2"
        :province="province"
        :city="city"
        @region-change="regionChange"
      />
      <el-input
        v-model="keyword"
        style="margin-left:12px;"
        clearable
        class="filter-item search-wrap"
        placeholder="请输入关键字"
      />
    </div>

    <baidu-map
      ref="map"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      style="margin-top:12px;"
      @ready="handler"
    >
      <bm-view class="map" />
      <bm-marker
        v-if="result"
        :position="result.point"
        :dragging="true"
        :icon="icon"
        animation="BMAP_ANIMATION_BOUNCE"
        @dragstart="dragstart"
        @dragend="dragend"
      >
        <bm-info-window
          ref="msgWindow"
          :position="result.point"
          :show="msgWindowShow"
          :title="result.title"
          @close="msgWindowShow = false"
        >
          <p v-text="result.address" />
        </bm-info-window>
      </bm-marker>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :location="location"
        :panel="false"
        force-local
        select-first-result
        @infohtmlset="infohtmlset"
      />
    </baidu-map>
  </ZaDialog>
</template>

<script>
import ZaDialog from './index'
import ZaRegion from '@/components/ZaRegion'
export default {
  components: { ZaDialog, ZaRegion },
  props: {
    title: {
      type: String,
      default: ''
    },
    province: {
      type: Object,
      default: null
    },
    city: {
      type: Object,
      default: null
    },
    zoom: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      center: '',
      icon: { url: '/static/location_green.png', size: { width: 24, height: 24 }},
      result: null,
      location: '',
      keyword: '',
      msgWindowShow: false
    }
  },
  methods: {
    handler({ BMap, map }) {
      if (this.city && this.city.label && this.city.label !== '市辖区') {
        this.center = this.city.label
      } else if (this.province && this.province.label) {
        this.center = this.province.label
      }
    },
    infohtmlset(result) {
      if (result && result.point) {
        this.result = result
      }
    },
    dragstart(event) {
      this.msgWindowShow = false
    },
    dragend(event) {
      this.getAddress(event.point)
    },
    getAddress(point) {
      let url = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=xkPaXPsBxubNZukV6s4eHrfPr0VSCaGz&output=json&coordtype=bd09ll&extensions_town=true&location='
      url += point.lat
      url += ','
      url += point.lng
      this.$jsonp(url).then(res => {
        this.getAddressCallback(res)
      })
    },
    getAddressCallback(data) {
      this.result.title = data.result.formatted_address
      const detail = data.result.addressComponent
      this.result.address = detail.province + detail.city + detail.district + detail.town + detail.street
      this.msgWindowShow = true
    },
    regionChange(event, level) {
      if (event.city.label === '市辖区') {
        this.location = event.province.label
      } else {
        this.location = event.city.label
      }
      this.center = this.location
    },
    handleCancel() {
      this.$emit('cancel-event')
    },
    handleConfirm() {
      if (this.result) {
        this.$emit('confirm-event', this.result)
      } else {
        this.$notify.error({
          title: '失败',
          message: '请选择地址！'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
