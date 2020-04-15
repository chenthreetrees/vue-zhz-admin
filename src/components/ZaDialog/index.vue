<template>
  <el-dialog
    :title="title || typeTitle"
    :visible="true"
    :width="width"
    :show-close="false"
    append-to-body
  >
    <slot />
    <div v-if="hasBottomBtn" slot="footer" class="dialog-footer">
      <el-button v-if="showCancel" @click="handleCancel">
        取消
      </el-button>
      <el-button type="primary" @click="handleConfirm">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'create'
    },
    permission: {
      type: Array,
      default: null
    },
    hasBottomBtn: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    typeTitle() {
      if (this.type === 'create') {
        return '创建'
      } else if (this.type === 'update') {
        return '编辑'
      }
      return '创建'
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel-event')
    },
    handleConfirm() {
      this.$emit('confirm-event', this.type)
    }
  }
}
</script>
<style scoped>
.dialog-container{
  background:rgb(17,42,117);
}
</style>
