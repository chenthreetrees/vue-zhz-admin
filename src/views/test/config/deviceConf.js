/**
 *
 * table的属性配置如下：(详细请参考components/SfTable)
 *   hasMergeRowOrColumn  是否合并单元格，默认为false
 *   hasShowSummary  是否显示表位合计行，默认为false
 *   border  是否带有纵向边框，默认为false
 *   hasSelect  有无选中功能，默认为false
 *   hasIndex  有无序号功能，默认为false
 *   hasOperation  有无操作功能，默认为false
 *   hasExpand  有无展开行功能，默认为false
 *   tr表头属性配置如下：
 *     id: '',//唯一标识
 *     label: '',//标签名
 *     prop: '',//属性名
 *     sortable: false,//是否可以排序
 *     formatter: function(row){}, //列的格式化数据
 *     className: 'classname', //列的样式
 *     width：'',//列宽
 *     min-width: '',//最小列宽,
 *     show: true //show有三种值：false隐藏当前列，true常规表格列，template自定义表格列
 *   operation操作列属性配置如下：
 *     label
 *     width
 *     className
 *     data：[
 *        // 操作列数据
 *        {
 *          label: '编辑', // 按钮文字
 *          Fun: 'handleSubmit', // 点击按钮后触发的父组件事件
 *          size: 'mini', // 按钮大小
 *          id: '1', // 按钮循环组件的key值
 *          classname: 'show', // 按钮的类名
 *          permission: [], // 权限
 *          isShow: function(row) {
 *            return true
 *          }
 *        }
 *     ]
 *   expands操作列属性配置如下：
 *     expands: [
 *          // 展开行数据
 *          {
 *            id: '1',
 *            label: 'label',
 *            prop: 'prop'
 *          }
 *        ]
 *
 * ===============================================
 *
 * form表单的配置：(详细请参考components/SfForm)
 *    formOptions: {
 *      span: 24,//宽度为24份，span=24表示1行，12表示2行
 *      rules:{},//对应el-form的rules属性
 *      forms: [{
 *        label: '日期',
 *        prop: 'date',
 *        placeholder: '', //input的placeholder
 *        span: 15, //会覆盖上一级的span，单独对该行作用
 *        template: 'date-picker',//该字段用以表示form-item的类型
 *        type: '', //date-picker组件的type属性
 *        format: '' //date-picker组件的format属性
 *      },
 *      {
 *        label: '注册资本',
 *        prop: 'amount',
 *        template: 'suffix-text',//带后缀文字的输入框
 *        suffix: '万元'//后缀
 *      },
 *      {
 *        label: '地址',
 *        prop: 'address',
 *        template: 'click'//点击跳转的form-item，不可输入
 *      },
 *      {
 *        label: '省份',
 *        template: 'region' //区域选择框
 *      }]
 *    }
 *
 * 下面的模板代码，给出最简单的常用配置
 **/
import { validateEmpty } from '@/utils/validate'
import { getOptionLabel } from '@/views/table/option'
import { dateformat } from '@/utils/moment'
const config = {
  requestUrl: {
    loadUrl: '/dv/device/list',
    insertUrl: '/dv/device/insertOrUpdate',
    updateUrl: '/dv/device/insertOrUpdate',
    deleteUrl: '/dv/device/delete'
  },
  listQuery: {
    belongUnit: '',
    deviceNo: '',
    deviceName: '',
    deviceSerialNumber: '',
    inWarehouseTime1: '',
    inWarehouseTime2: '',
    saveAddress: '',
    deviceStatus: -1,
    type: -1
  },
  searchOptions: {
    span: 6,
    showCount: 4,
    items: [
      {
        id: '1',
        placeholder: '设备类型',
        prop: 'deviceType',
        template: 'select',
        valueKey: 'value',
        queryKey: 'type'
      },
      {
        id: '2',
        placeholder: '设备名称',
        prop: 'deviceName',
        template: 'select'
      },
      {
        id: '3',
        placeholder: '设备状态',
        prop: 'deviceStatus',
        template: 'select',
        valueKey: 'value'
      },
      {
        id: '4',
        placeholder: '设备归属单位',
        prop: 'belongUnit',
        template: 'click',
        flag: 'search'
      },
      {
        id: '5',
        span: 5,
        placeholder: '设备编号',
        prop: 'deviceNo'
      },
      {
        id: '6',
        span: 5,
        placeholder: '设备序列号',
        prop: 'deviceSerialNumber'
      },
      {
        id: '7',
        span: 5,
        placeholder: '设备保管地址',
        prop: 'saveAddress'
      },
      {
        id: '8',
        span: 9,
        placeholder: '入库时间',
        label: '入库时间',
        prop: 'inWarehouseTime',
        template: 'date-picker',
        type: 'daterange',
        queryKey: ['inWarehouseTime1', 'inWarehouseTime2']
      }
    ]
  },
  menuOptions: {
    hasDelete: true,
    hasCreate: true,
    deletePermission: ['POST /admin/dv/device/delete'],
    createPermission: ['POST /admin/dv/device/insertOrUpdate']
  },
  table: {
    hasSelect: true,
    hasIndex: true,
    hasOperation: true,
    border: true,
    tr: [{
      id: '1',
      label: '设备类型',
      prop: 'deviceType',
      show: true,
      formatter: function(row) {
        return row ? getOptionLabel('deviceType', row.deviceType) : ''
      }
    },
    {
      id: '2',
      label: '设备名称',
      prop: 'deviceName',
      show: true
    },
    {
      id: '3',
      label: '设备编号',
      prop: 'deviceNo',
      show: true
    },
    {
      id: '4',
      label: '设备序列号',
      prop: 'deviceSerialNumber',
      show: true
    },
    {
      id: '5',
      label: '检定时间',
      prop: 'checkTime',
      show: true,
      formatter: function(row) {
        return row ? dateformat(row.checkTime) : ''
      }
    },
    {
      id: '6',
      label: '生产厂家',
      prop: 'factory',
      show: true
    },
    {
      id: '7',
      label: '设备归属单位',
      width: '140',
      prop: 'belongUnit',
      show: true
    },
    {
      id: '8',
      label: '设备保管地址',
      width: '140',
      prop: 'saveAddress',
      show: true
    },
    {
      id: '9',
      label: '入库时间',
      prop: 'inWarehouseTime',
      show: true
    },
    {
      id: '10',
      label: '创建人',
      prop: 'adminAccount',
      show: true
    },
    {
      id: '11',
      label: '创建时间',
      prop: 'createDate',
      show: true
    },
    {
      id: '12',
      label: '备注',
      prop: 'description',
      show: true
    },
    {
      id: '13',
      label: '状态',
      fixed: 'right',
      prop: 'deviceStatus',
      show: true,
      formatter: function(row) {
        return row ? getOptionLabel('deviceStatus', row.deviceStatus) : ''
      }
    }],
    operation: {
      // 操作功能
      label: '操作',
      data: [ // 操作列数据
        {
          label: '修改',
          id: '2',
          permission: ['POST /admin/dv/device/insertOrUpdate']
        }
      ]
    }
  },
  formOptions: {
    span: 24,
    forms: [
      {
        id: '1',
        label: '设备类型',
        prop: 'deviceType',
        template: 'select',
        valueKey: 'value'
      },
      {
        id: '2',
        label: '设备名称',
        prop: 'deviceName',
        template: 'select'
      },
      {
        id: '3',
        label: '设备编号',
        prop: 'deviceNo'
      },
      {
        id: '4',
        label: '设备序列号',
        prop: 'deviceSerialNumber'
      },
      {
        id: '5',
        label: '生产厂家',
        prop: 'factory'
      },
      {
        id: '6',
        labelWidth: '120px',
        label: '设备归属单位',
        prop: 'belongUnit',
        template: 'click'
      },
      {
        id: '7',
        labelWidth: '120px',
        label: '设备管理员账号',
        prop: 'adminAccount'
      },
      {
        id: '8',
        labelWidth: '120px',
        label: '设备管理员密码',
        prop: 'adminPassword'
      },
      {
        id: '9',
        labelWidth: '120px',
        label: '设备保管地址',
        prop: 'saveAddress'
      },
      {
        id: '10',
        label: '备注',
        prop: 'description'
      },
      {
        id: '11',
        label: '入库时间',
        prop: 'inWarehouseTime',
        template: 'date-picker',
        valueFormat: 'yyyy-MM-dd'
      }],
    rules: {
      deviceType: [validateEmpty('设备类型', 'change')],
      deviceName: [validateEmpty('设备名称', 'change')],
      deviceNo: [validateEmpty('设备编号')],
      deviceSerialNumber: [validateEmpty('设备序列号')],
      factory: [validateEmpty('生产厂家')],
      belongUnit: [validateEmpty('设备归属单位', 'change')],
      adminAccount: [validateEmpty('设备管理员账号')],
      adminPassword: [validateEmpty('设备管理员密码')],
      saveAddress: [validateEmpty('设备保管地址')]
    }
  }
}
export default config
