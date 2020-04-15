<template>
  <fieldset class="field-wrap">
    <legend>
      <div class="legend-card">
        搜索条件
      </div>
    </legend>
    <div v-if="searchOptions" class="search-wrap">
      <el-row :gutter="40">
        <el-col
          v-for="(item, index) in searchOptions.items"
          :key="index"
          style="margin:4px 0px;"
          :span="item.span || searchOptions.span"
        >
          <template v-if="expand || index < searchOptions.showCount">
            <el-select
              v-if="item.template && item.template === 'select'"
              v-model="searchData[item.prop]"
              :multiple="item.multiple"
              :value-key="item.labelKey || 'label'"
              :placeholder="item.placeholder || '请选择'"
              :clearable="item.clearable || true"
              @change="selectChange($event,item)"
            >
              <el-option
                v-for="(option,i) in extendData[item.optionName?item.optionName:item.prop]"
                :key="i"
                :label="option[item.labelKey || 'label']"
                :value="item.valueIsObject?option:(item.valueKey?option[item.valueKey]:option.label)"
              />
            </el-select>
            <div v-else-if="item.template && item.template === 'date-picker'" class="center-row">
              <span v-if="item.label" style="font-size:14px;color:#fff;padding-right:12px;">{{ item.label }}</span>
              <el-date-picker
                v-model="searchData[item.prop]"
                :type="item.type"
                :placeholder="item.placeholder"
                range-separator="至"
                style="width:240px;"
                :start-placeholder="item.startPlaceholder || '开始日期'"
                :end-placeholder="item.endPlaceholder || '结束日期'"
                :format="item.valueFormat || 'yyyy-MM-dd hh:mm'"
                :value-format="item.valueFormat || 'yyyy-MM-dd hh:mm'"
                align="right"
                class="date-input"
              />
            </div>
            <el-input
              v-else-if="item.template && item.template === 'click'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              readonly
              @click.native="inputClick(item)"
            >
              <SvgIcon v-if="item.icon" slot="suffix" :icon-class="item.icon" />
            </el-input>
            <el-input
              v-else
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              :type="item.type || 'text'"
              :clearable="item.clearable || true"
            />
          </template>
        </el-col>
      </el-row>
      <div class="btn">
        <div>
          <el-button type="success" @click="handleSearch">
            查询
          </el-button>
          <el-button type="primary" @click="handleReset">
            重置
          </el-button>
        </div>
        <div v-if="searchOptions.items.length > searchOptions.showCount" class="arrow" @click="expand=!expand">
          <i :class="expand?'el-icon-arrow-up':'el-icon-arrow-down'" />
        </div>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  props: {
    searchData: {
      type: Object,
      default: null
    },
    searchOptions: {
      type: Object,
      default: null
    },
    extendData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      expand: false
    }
  },
  methods: {
    selectChange(option, item) {
      this.$emit('search-change', { option: option, item: item })
    },
    inputClick(item) {
      this.$emit('input-click', item)
    },
    handleReset() {
      this.$emit('reset-event')
    },
    handleSearch() {
      this.$emit('search-event')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$lineColor:#0a1c54;
// $lineColor:transparent;//#102974
$legendBg:#1e3e9c;
.field-wrap{
  background: rgb(17,42,117);
  border: 1px solid #1e3e9c;
  .legend-card{
    background: $lineColor;
    background: linear-gradient(-75deg, transparent 4px, $lineColor 0) bottom right,
    linear-gradient(75deg, transparent 4px, $lineColor 0) bottom left;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    padding:6px 24px;
    transform:translateY(-1px);
  }
  legend{
    color: #fff;
    background:$legendBg;
    background: linear-gradient(-75deg, transparent 4px, $legendBg 0) bottom right,
    linear-gradient(75deg, transparent 4px, $legendBg 0) bottom left;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    margin-left: 12px;
    padding: 1px;
    position:relative;
  }
  .search-wrap{
    display:flex;
    width: 100%;
    padding: 0 12px;
    // .content{
      // flex:1;
    // }
    .btn{
      display:flex;
      flex:1;
      margin: 4px 24px;
      min-width: 25%;
      height: 36px;
      justify-content: space-between;
      .arrow{
        width: 36px;
        height: 36px;
        color: #fff;
        margin-left: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 2px;
        background: #3757b5;
        cursor: pointer;
      }
    }
  }
}

</style>
