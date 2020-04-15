<template>
  <el-dialog
    :visible.sync="isShowImageDialog"
    @closed="clearImg"
  >
    <img :src="imgs" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;">
  </el-dialog>
</template>

<script>
export default {
  name: 'ImgPreview',
  data() {
    return {
      imgs: '',
      isShowImageDialog: false
    }
  },
  methods: {
    clearImg() {
      this.imgs = null
    }
  }
}
</script>
