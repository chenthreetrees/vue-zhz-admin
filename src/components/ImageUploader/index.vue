<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
<template>
  <div>
    <el-upload
      :disabled="readOnly"
      :http-request="uploadImage"
      :show-file-list="false"
      :on-success="uploadAvatar"
      :accept="accept"
      action=""
      :class="{'avatar-uploader':!readOnly}"
    >
      <div v-if="img" style="position:relative;">
        <img :src="img" class="avatar">
        <span class="el-upload-list__item-preview" style="position:absolute;bottom: 0px;" @click.stop="dialogVisible = true">
          <i class="el-icon-zoom-in" style="color:#fff;" />
        </span>
      </div>
      <div v-else-if="readOnly" class="center" style="width:120px;height:120px;cursor: not-allowed;border:1px dashed #fff;color:#fff;">
        空
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <div class="center" style="width:100%;">
        <img :src="img" alt="" style="width: 100%;">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile } from '@/api/base'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '.png,.jpeg,.jpg'
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      img: this.url,
      disabled: false,
      dialogVisible: false
    }
  },
  methods: {
    uploadImage(option) {
      this.disabled = true
      const file = option.file
      uploadFile(file).then(response => {
        if (response.data.errno === 0) {
          this.img = response.data.data
          this.disabled = false
          this.$emit('event-upload', this.img)
        } else {
          this.disabled = false
        }
      })
    },
    uploadAvatar: function(res, file) {
      this.img = URL.createObjectURL(file.raw)
    }
  }
}
</script>
