<template>
  <el-upload
    :http-request="upload"
    :action="action"
    :limit="limit"
    :before-upload="beforeUpload"
    :accept="accept"
    :on-exceed="handleExceed"
    :drag="drag"
    :multiple="multiple"
    class="upload-demo"
  >
    <template v-if="type=='normal'">
      <el-button size="small" type="primary">
        点击上传
      </el-button>
      <div slot="tip" class="el-upload__tip">
        {{ tip }}
      </div>
    </template>
    <template v-else>
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">
        {{ tip }}
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'normal'
    },
    drag: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleExceed() {
      this.$notify.error({
        title: '失败',
        message: '只能上传' + this.limit + '个文件'
      })
    },
    beforeUpload(file) {
      const type = file.name.substring(file.name.lastIndexOf('.'))
      if (this.accept && this.accept.indexOf(type) === -1) {
        this.$notify.error({
          title: '失败',
          message: '文件格式不对'
        })
        return false
      }
      return true
    },
    upload(option) {
      this.$emit('event-upload', option)
    }
  }
}
</script>
