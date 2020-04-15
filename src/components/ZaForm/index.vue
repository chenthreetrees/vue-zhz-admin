<template>
  <el-form
    ref="ZaForm"
    :rules="formOptions.rules"
    :model="formData"
    :style="{ width: width }"
    status-icon
    label-position="right"
    label-width="100px"
  >
    <el-row :gutter="40" style="width:100%;">
      <el-col
        v-for="(item, index) in formOptions.forms"
        :key="index"
        :span="item.span || formOptions.span"
      >
        <el-form-item
          v-if="item.template && item.template === 'label'"
          :label="item.label"
          :label-width="item.labelWidth || '100px'"
          size="medium"
          class="form-label"
        />
        <el-form-item v-else :label="item.label" :prop="item.prop" :label-width="item.labelWidth || '100px'" class="form-wrap">
          <template v-if="item.template && item.template === 'date-picker'">
            <el-date-picker
              v-model="formData[item.prop]"
              :type="item.type"
              :disabled="readOnly || item.disabled"
              :placeholder="item.placeholder"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :format="item.valueFormat || 'yyyy-MM-dd hh:mm'"
              :value-format="item.valueFormat || 'yyyy-MM-dd hh:mm'"
              align="right"
            />
          </template>
          <template v-else-if="item.template && item.template === 'suffix-text'">
            <el-input
              v-model="formData[item.prop]"
              :disabled="readOnly || item.disabled"
              :placeholder="item.placeholder"
              :type="item.type || 'text'"
            >
              <span slot="suffix">{{ item.suffix }}</span>
            </el-input>
          </template>
          <template v-else-if="item.template && item.template === 'click'">
            <el-input
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              readonly
              :disabled="readOnly || item.disabled"
              @click.native="readOnly || item.disabled?null:inputClick(item)"
            >
              <SvgIcon v-if="item.icon" slot="suffix" :icon-class="item.icon" />
            </el-input>
          </template>
          <template v-else-if="item.template && item.template === 'region'">
            <ZaRegion
              :province="formData.province"
              :city="formData.city"
              :county="formData.county"
              :last-level="item.lastLevel"
              @region-change="regionChange($event,item)"
            />
          </template>
          <template v-else-if="item.template && item.template === 'select'">
            <el-select
              v-model="formData[item.prop]"
              clearable
              :disabled="readOnly || item.disabled"
              :multiple="item.multiple"
              :value-key="item.labelKey || 'label'"
              :placeholder="item.placeholder || '请选择'"
              @change="selectChange($event,item)"
            >
              <el-option
                v-for="(option,i) in extendData[item.optionName?item.optionName:item.prop]"
                :key="i"
                :label="option[item.labelKey || 'label']"
                :value="item.valueIsObject?option:(item.valueKey?option[item.valueKey]:option.label)"
              />
            </el-select>
          </template>
          <template v-else-if="item.template && item.template === 'number'">
            <el-input
              v-model.number="formData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="readOnly || item.disabled"
              :type="item.type || 'text'"
            >
              <span slot="suffix">{{ item.suffix }}</span>
            </el-input>
          </template>
          <template v-else-if="item.template && item.template === 'img'">
            <ImageUploader
              :url="formData[item.prop]"
              :read-only="readOnly"
              @event-upload="uploadFile($event,item)"
            />
          </template>
          <template v-else-if="item.template && item.template === 'upload'">
            <FileUploader
              :accept="item.accept"
              :tip="item.tip"
              :action="item.action"
              type="normal"
              @event-upload="uploadFile($event,item)"
            />
          </template>
          <el-input
            v-else
            v-model="formData[item.prop]"
            :placeholder="item.placeholder"
            :disabled="readOnly || item.disabled"
            :type="item.type || 'text'"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import SvgIcon from '@/components/SvgIcon'
import ZaRegion from '@/components/ZaRegion'
import FileUploader from '@/components/FileUploader'
import ImageUploader from '@/components/ImageUploader'
export default {
  components: { SvgIcon, ZaRegion, FileUploader, ImageUploader },
  props: {
    formData: {
      type: Object,
      default: null
    },
    formOptions: {
      type: Object,
      default: null
    },
    width: {
      type: String,
      default: '960px'
    },
    extendData: {
      type: Object,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputClick(item) {
      this.$emit('input-click', item)
    },
    regionChange(region, item) {
      this.$emit('region-change', { region: region, item: item })
    },
    selectChange(option, item) {
      this.$emit('select-change', { option: option, item: item })
    },
    uploadFile(option, item) {
      this.$emit('upload-event', { option: option, item: item })
    },
    validate() {
      return this.$refs.ZaForm.validate()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.form-wrap {
  .el-input__suffix {
    right: 12px;
  }
}
.form-label{
  .el-form-item__label {
    font-size: 16px;
    color: #C0C4CC;
  }
}
</style>
