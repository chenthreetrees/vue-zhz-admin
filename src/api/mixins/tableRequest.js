import {
  tableList,
  insertOrUpdate,
  doDelete
} from '@/api/table'
export default {
  data() {
    return {
      tableData: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      templateUrl: '',
      requestUrl: {
        loadUrl: '',
        insertUrl: '',
        updateUrl: '',
        deleteUrl: '',
        getUrl: ''
      }
    }
  },
  methods: {
    load() {
      return new Promise((resolve, reject) => {
        this.listLoading = true
        const url = this.requestUrl.getUrl ? this.requestUrl.getUrl : this.requestUrl.loadUrl
        const method = this.requestUrl.getUrl ? 'get' : 'post'
        tableList(url, this.listQuery, method).then(response => {
          this.tableData = response.data.data.items
          this.total = response.data.data.total
          this.templateUrl = response.data.data.template
          this.listLoading = false
          resolve(response)
        }).catch(response => {
          this.listLoading = false
          this.$notify.error({
            title: '错误',
            message: response.data.errmsg
          })
          reject(response)
        })
      })
    },
    remove(ids, reload = true) {
      return new Promise((resolve, reject) => {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doDelete(this.requestUrl.deleteUrl, ids).then(response => {
            this.$notify.success({
              title: '成功',
              message: `数据删除成功 ${response.data.data.successNum} 条,失败 ${response.data.data.failNum} 条`
            })
            if (reload) {
              this.load()
            }
            resolve(response)
          }).catch(response => {
            this.$notify.error({
              title: '错误',
              message: response.data.errmsg
            })
            reject(response)
          })
        })
      })
    },
    insert(formData, reload = true) {
      return new Promise((resolve, reject) => {
        insertOrUpdate(this.requestUrl.insertUrl, formData).then(response => {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          if (reload) {
            this.load()
          }
          resolve(response)
        }).catch(response => {
          this.$notify.error({
            title: '错误',
            message: response.data.errmsg
          })
          reject(response)
        })
      })
    },
    update(dataForm, reload = true) {
      return new Promise((resolve, reject) => {
        insertOrUpdate(this.requestUrl.updateUrl, dataForm).then(response => {
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          if (reload) {
            this.load()
          }
          resolve(response)
        }).catch(response => {
          this.$notify.error({
            title: '错误',
            message: response.data.errmsg
          })
          reject(response)
        })
      })
    },
    filter() {
      this.listQuery = Object.assign({}, this.listQuery, { page: 1, size: 10 })
      this.load()
    }
  }
}
