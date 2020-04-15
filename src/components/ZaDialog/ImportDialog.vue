<template>
  <el-dialog
    :title="title"
    :visible="true"
    :width="width"
    :show-close="false"
    :append-to-body="true"
  >
    <FileUploader
      v-bind="$attrs"
      :accept="$attrs.accept"
      :tip="$attrs.tip"
      :action="$attrs.action"
      :drag="$attrs.drag"
      type="import"
      @event-upload="uploadFile"
    />
    <div slot="footer" class="dialog-footer">
      <el-button v-if="showDownLoad" type="primary" @click="templateDownLoad">
        模板下载
      </el-button>
      <el-button @click="handleCancel">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import FileUploader from '@/components/FileUploader'
import { MessageBox } from 'element-ui'
import request from '@/utils/request'
export default {
  components: { FileUploader },
  props: {
    title: {
      type: String,
      default: '导入'
    },
    width: {
      type: String,
      default: '500px'
    },
    templateUrl: {
      type: String,
      default: ''
    },
    importUrl: {
      type: String,
      default: '/dv/system/uploadFile'
    },
    paramFun: {
      type: Function,
      default: null
    },
    showDownLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel-event')
    },
    uploadFile(option) {
      this.importFile(option).then(response => {
        MessageBox.confirm('导入成功，' +
                    '\n 导入条数：' + response.data.data.targetNum +
                    '\n 成功条数：' + response.data.data.success, '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false
        }).then(() => {
          this.$emit('import-event')
        })
      }).catch(res => {
        this.$notify.error({
          title: '错误',
          message: res.data.errmsg
        })
      })
    },
    templateDownLoad() {
      if (this.templateUrl) {
        // window.location.href = this.templateUrl
        window.open(this.templateUrl)
      }
    },
    importFile(option) {
      let param = null
      if (this.paramFun) {
        param = this.paramFun(option)
      } else {
        param = new FormData()
        param.append('file', option.file)
      }
      return request({
        url: this.importUrl,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: param
      })
    }
  }
}
</script>
