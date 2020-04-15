<template>
  <el-table
    ref="ZaTable"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
    :show-summary="table.hasShowSummary"
    :summary-method="table.getSummaries"
    :data="data"
    :border="table.border"
    :row-class-name="rowClassName"
    :span-method="objectSpanMethod"
    tooltip-effect="dark"
    :height="height"
    :style="{'width':width}"
    @selection-change="handleSelectionChange"
    @row-click="rowClick"
  >
    <el-table-column v-if="table.hasExpand" type="expand" align="center">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-for="item in table.expands" :key="item.id" :label="item.label">
            <span>{{ props.row[item.prop] }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-if="table.hasSelect" align="center" type="selection" width="55" />
    <el-table-column
      v-if="table.hasIndex"
      column-key="0"
      label="序号"
      width="80"
      align="center"
      type="index"
    />
    <template v-for="item in table.tr">
      <template v-if="item.children">
        <el-table-column :key="item.id" :label="item.label" align="center">
          <template v-for="column in item.children">
            <el-table-column
              v-if="column.show !== false && column.show === 'template'"
              :key="column.id"
              :fixed="item.fixed"
              :sortable="column.sortable?column.sortable:true"
              :label="column.label"
              :class-name="column.className ? column.className : ''"
              :width="column.width ? column.width : ''"
              :min-width="column.minWidth ? column.minWidth : '120'"
              align="center"
            >
              <template slot-scope="scope">
                <slot :name="column.prop" :obj="scope" />
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.show !== false && column.show !== 'template'"
              :key="column.id"
              :fixed="item.fixed"
              :label="column.label"
              :sortable="column.sortable?column.sortable:true"
              :prop="column.prop"
              :formatter="column.formatter ? column.formatter : null"
              :class-name="column.className ? column.className : ''"
              :width="column.width ? column.width : ''"
              :min-width="column.minWidth ? column.minWidth : '120'"
              show-overflow-tooltip
              align="center"
            />
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="item.show !== false && item.show === 'template'"
        :key="item.id + Math.random()"
        :fixed="item.fixed"
        :sortable="item.sortable?item.sortable:true"
        :label="item.label"
        :class-name="item.className ? item.className : ''"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : '120'"
        align="center"
      >
        <template slot-scope="scope">
          <slot :name="item.prop" :obj="scope" />
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.show !== false && item.show !== 'template'"
        :key="item.id + Math.random()"
        :fixed="item.fixed"
        :label="item.label"
        :sortable="item.sortable?item.sortable:true"
        :prop="item.prop"
        :formatter="item.formatter ? item.formatter : null"
        :class-name="item.className ? item.className : ''"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : '120'"
        show-overflow-tooltip
        align="center"
      />
    </template>
    <el-table-column
      v-if="operVisiable"
      :label="table.operation.label"
      :width="table.operation.width ? table.operation.width : ''"
      :min-width="table.operation.minWidth ? table.operation.minWidth : '120'"
      :class-name="table.operation.className ? table.operation.className : ''"
      :fixed="table.operation.fixed || 'right'"
      align="center"
      column-key="operation"
    >
      <template slot-scope="scope">
        <template v-for="item in table.operation.data">
          <el-button
            v-if="item.isShow ? item.isShow(scope.row) : true"
            :key="item.id"
            v-permission="item.permission ? item.permission : ['*']"
            :class="item.classname ? item.classname : 'small-padding'"
            :size="item.size ? item.size : 'mini'"
            :type="item.type ? item.type : 'text'"
            @click.stop="handleOperation(scope.$index, scope.row, item.id)"
          >
            {{ item.label }}
          </el-button>
        </template>
        <el-dropdown v-if="table.operation.more" @command="handleCommand">
          <el-button
            :class="table.operation.more.classname ? table.operation.more.classname : 'small-padding'"
            :size="table.operation.more.size ? table.operation.more.size : 'mini'"
            :type="table.operation.more.type ? table.operation.more.type : 'text'"
          >
            更多<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in table.operation.more.items"
              :key="item.command"
              :command="{index:scope.$index,row:scope.row,command:item.command}"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
  props: {
    height: {
      type: String || Number,
      default: ''
    },
    width: {
      type: String || Number,
      default: '100%'
    },
    loading: {
      // 加载中动画
      type: Boolean,
      default: false
    },
    data: {
      // 表格数据 —— 如需添加行class，处理数据时则需要传入class名， class需为数组
      type: Array,
      default: null
    },
    table: {
      type: Object,
      default() {
        return {
          hasMergeRowOrColumn: false, // 是否合并单元格
          hasShowSummary: false, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          hasSelect: false, // 有无选中功能
          hasIndex: false, // 有无序号功能
          hasOperation: false, // 有无操作功能
          hasExpand: false, // 有无展开行功能
          tr: [
            // 表头数据 —— className:列的class名
            {
              id: '1',
              label: 'label',
              prop: 'prop',
              sortable: false,
              formatter: function(row) { },
              className: 'classname',
              minWidth: '80',
              show: true // show有三种值：false隐藏当前列，true常规表格列，template自定义表格列
            }
          ],
          operation: {
            // 操作功能
            label: '操作', // 操作列的行首文字
            width: '200', // 操作列的宽度
            className: '', // 操作列的class名
            data: [
              // 操作列数据
              {
                label: '通过', // 按钮文字
                Fun: 'handleSubmit', // 点击按钮后触发的父组件事件
                size: 'mini', // 按钮大小
                id: '1', // 按钮循环组件的key值
                classname: 'show', // 按钮的类名
                permission: [], // 权限
                isShow: function(row) {
                  return true
                }
              }
            ]
          },
          expands: [
            // 展开行数据
            {
              id: '1',
              label: 'label',
              prop: 'prop'
            }
          ],
          getSummaries(param) {
            // 自定义表位合计行数据
            // *** 此函数传入param参数
            // *** 最后返回一个数组，合计行会显示数组中的内容
            return []
          }
        }
      }
    }
  },
  computed: {
    operVisiable() {
      if (!this.table.operation) { return false }
      let hasPerm = false
      if (this.table.operation.data) {
        hasPerm = this.table.operation.data.some(item => {
          return checkPermission(item.permission ? item.permission : ['*'])
        })
      }
      return this.table.hasOperation && (hasPerm || this.table.operation.more)
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
    },
    handleOperation(rowIndex, row, id) {
      const data = this.table.operation.data
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          const funName = data[i].Fun ? data[i].Fun : 'operation-event'
          this.$emit(funName, id, row, rowIndex)
        }
      }
    },
    handleCommand(item) {
      this.$emit(this.table.operation.more.Fun, item.row, item.command, item.rowIndex)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (!this.hasMergeRowOrColumn) {
        return
      } else {
        this.$emit('onMergeRowOrColumn', { row, column, rowIndex, columnIndex })
      }
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(Row, Event, Column) {
      if (
        !Column ||
        Column.type === 'selection' ||
        Column.columnKey === 'operation' ||
        Column.type === 'expand'
      ) {
        return
      }
      const data = {
        row: Row,
        event: Event,
        column: Column
      }
      this.$emit('onRowClick', data)
    },
    // 行类名的回调函数
    // 在表格数据中添加class字段即为表格行类名，配合css可对表格行中的自定义标签进行样式优化
    rowClassName(rowdata) {
      const data = this.data
      let className = data[rowdata.rowIndex].class
        ? data[rowdata.rowIndex].class
        : ''
      if (className.length === 0) {
        return
      }
      className = className.join(' ')
      return className
    }
  }
}
</script>

