<template>
  <div>
    <ZaTable
      v-bind="$attrs"
      :table="config.table"
      :data="tableData"
      :loading="listLoading"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      :search-options="config.searchOptions"
      :extend-data="extendData"
      :menu-options="config.menuOptions"
      @delete-event="handleDelete"
      @import-event="handleImport"
      @create-event="handleCreate"
      @reset-event="handleReset"
      @search-event="handleSearch"
      @other-event="handleOther"
      @operation-event="handleOper"
      @input-click="handleInputClick"
      @selection-change="handleTableSelect"
      @pagination="load"
    />
    <FormDialog
      v-if="dialogFormVisible"
      v-bind="$attrs"
      :form-options="config.formOptions"
      :extend-data="extendData"
      :type="dialogType"
      @cancel-event="dialogFormVisible = false"
      @confirm-event="handleConfirm"
      @input-click="handleInputClick"
      @region-change="handleRegionChange"
      @select-change="handleFormSelect"
      @upload-event="handleUpload"
    />
    <ImportDialog
      v-if="importVisible"
      :template-url="templateUrl"
      :import-url="requestUrl.importUrl"
      :accept="config.menuOptions.accept"
      :tip='config.menuOptions.tip'
      drag
      @cancel-event="importVisible=false"
      @import-event="importCompleted"
    />
  </div>
</template>

<script>

import tableRequest from '@/api/mixins/tableRequest'
import ZaTable from '@/components/ZaTable'
import FormDialog from '@/components/ZaDialog/FormDialog'
import extendData from './extendData'
import ImportDialog from '@/components/ZaDialog/ImportDialog'
export default {
  components: { ZaTable, FormDialog,ImportDialog },
  mixins: [tableRequest],
  props: {
    configUrl: {
      type: String,
      default: ''
    },
    isTransfer:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      config: {},
      dialogType: 'create',
      dialogFormVisible: false,
      importVisible:false,
      extendData: extendData,
      selectRows:[]
    }
  },
  created() {
    import(`@/views/${this.configUrl}`)
      .then((myModule) => {
        const config = myModule.default
        this.config = config
        this.requestUrl = config.requestUrl
        this.listQuery = Object.assign({}, this.listQuery, config.listQuery)
        this.load()
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    handleCreate() {
      this.$emit('initFormData')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },
    handleDelete(){
      if(this.selectRows.length > 0){
        const ids = []
        this.selectRows.forEach(row => {
          ids.push(row.id)
        })
        this.remove(ids).then(res => {
          this.$emit('delete-completed')
        })
      }else{
        this.$message({
          message: '请先选择要删除的数据',
          type: 'warning'
        })
      }
    },
    handleImport(){
      this.importVisible = true
    },
    importCompleted() {
      this.importVisible = false
      this.load()
    },
    handleReset(){
      this.$emit('initSearchData')
    },
    handleSearch(){
      const items = this.config.searchOptions.items
      items.forEach(item => {
        const key = item.queryKey?item.queryKey:item.prop
        if(key instanceof Array){
          key.forEach((element,index) => {
            const arr = this.$attrs['search-data'][item.prop]
            if(!arr || arr.length <= 0){
              this.$set(this.listQuery,element,this.config.listQuery[element])
            }else{
              const value = arr[index]
              if(value){
                this.$set(this.listQuery,element,value)
              }else{
                this.$set(this.listQuery,element,this.config.listQuery[element])
              }
            }
          })
        }else{
          const value = this.$attrs['search-data'][item.prop]
          if(value !== ''){
            this.$set(this.listQuery,key,value)
          }else{
            this.$set(this.listQuery,key,this.config.listQuery[key])
          }
        }
      })
      
      this.load()
    },
    handleOther(id){
      this.$emit('other-event',id,this.selectRows)
    },
    handleOper(id, row) {
      this.$emit('oper-event',id,row)
    },
    handleUpdate(row) {
      this.$emit('updateFormData',row)
      this.dialogType = 'update'
      this.dialogFormVisible = true
    },
    handleConfirm(type) {
      if(this.isTransfer){
        this.$emit('confirm-event',type)
      }else{
        if (type === 'create') {
          this.insert(this.$attrs['form-data']).then(res => {
            this.dialogFormVisible = false
          })
        } else if (type === 'update') {
          this.update(this.$attrs['form-data']).then(res => {
            this.dialogFormVisible = false
          })
        }
      }

    },
    handleTableSelect(value){
      this.selectRows = value
    },
    handleInputClick(item){
      this.$emit('input-event',item)
    },
    handleRegionChange(result){
      this.$emit('region-change',result)
    },
    handleFormSelect(result){
      console.log('handleFormSelect is running')
    },
    handleUpload(data){
      this.$emit('upload-event',data)
    },
    addExtendData(key,arr){
      this.extendData[key] = arr
    }
  }
}
</script>

