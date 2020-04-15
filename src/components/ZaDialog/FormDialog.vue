
<template>
  <ZaDialog
    v-bind="$attrs"
    :title="$attrs.title"
    :type="type"
    :width="dialogWidth"
    :show-cancel="!readOnly"
    @cancel-event="handleCancel"
    @confirm-event="handleConfirm"
  >
    <el-scrollbar style="height:60vh;" wrap-class="self-scroll">
      <ZaForm
        ref="ZaForm"
        v-bind="$attrs"
        :form-data="formData"
        :read-only="readOnly"
        :form-options="formOptions"
        :extend-data="$attrs['extend-data']"
        :width="width"
        v-on="$listeners"
      />
    </el-scrollbar>
  </ZaDialog>
</template>

<script>
import ZaDialog from './index'
import ZaForm from '@/components/ZaForm'
export default {
  components: { ZaDialog, ZaForm },
  props: {
    type: {
      type: String,
      default: 'create'
    },
    formData: {
      type: Object,
      default: null
    },
    formOptions: {
      type: Object,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      eidtNum: 0
    }
  },
  computed: {
    dialogWidth() {
      const padding = 24 / this.formOptions.span * 40
      const width = this.formOptions.width ? this.formOptions.width + padding : 800 + padding
      return width + 'px'
    },
    width() {
      return this.formOptions.width ? this.formOptions.width + 'px' : '800px'
    }
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        this.eidtNum++
      },
      deep: true
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel-event')
    },
    handleConfirm(type) {
      if (this.type === 'update' && (this.readOnly || this.eidtNum === 0)) {
        this.$emit('cancel-event')
        return
      }
      this.$refs.ZaForm.validate().then(() => {
        this.$emit('confirm-event', type)
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '请完善信息！'
        })
      })
    }
  }
}
</script>
