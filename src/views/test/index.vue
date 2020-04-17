<template>
  <BaseTable
    ref="table"
    :form-data="formData"
    :search-data="searchData"
    :config-url="configUrl"
    @initFormData="initFormData"
    @updateFormData="updateFormData"
    @initSearchData="initSearchData"
    @oper-event="handleOper"
    @input-event="handleInput"
  >
    <template v-slot:deviceName="{obj}">
      {{ obj.row.deviceName }}
    </template>
    <template v-slot:deviceNo="{obj}">
      {{ obj.row.deviceNo }}
    </template>
  </BaseTable>
</template>

<script>
import BaseTable from '@/views/table/BaseTable'
export default {
  name: 'Test',
  components: { BaseTable },
  data() {
    return {
      configUrl: 'test/config/deviceConf.js',
      formData: {
        deviceName: '',
        deviceType: '',
        deviceNo: '',
        deviceSerialNumber: '',
        factory: '',
        belongUnit: '',
        belongUnitLevel: '',
        saveAddress: '',
        inWarehouseTime: '',
        description: '',
        adminAccount: '',
        adminPassword: ''
      },
      searchData: {
        deviceType: '',
        deviceName: '',
        deviceStatus: '',
        belongUnit: '',
        belongUnitLevel: '',
        deviceNo: '',
        deviceSerialNumber: '',
        inWarehouseTime: '',
        saveAddress: ''
      }
    }
  },
  methods: {
    initFormData() {
      this.formData = this.$options.data().formData
    },
    initSearchData() {
      this.searchData = this.$options.data().searchData
    },
    updateFormData(row) {
      this.formData = Object.assign({}, this.formData, row)
    },
    handleOper(id, row) {
      if (id === '2') {
        this.$refs.table.handleUpdate(row)
      }
    },
    handleInput(item) {
      console.log('input is running', item)
    }
  }
}
</script>

