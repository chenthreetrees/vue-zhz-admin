<template>
  <div class="menu-wrap">
    <div class="btn">
      <el-button
        v-if="menuOptions.hasCreate"
        v-permission="menuOptions.createPermission ? menuOptions.createPermission : ['*']"
        type="primary"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        v-if="menuOptions.hasImport"
        v-permission="menuOptions.importPermission ? menuOptions.importPermission : ['*']"
        type="primary"
        @click="handleImport"
      >
        导入
      </el-button>
      <el-button
        v-if="menuOptions.hasDelete"
        v-permission="menuOptions.deletePermission ? menuOptions.deletePermission : ['*']"
        type="danger"
        @click="handleDelete"
      >
        删除
      </el-button>
      <template v-for="(other,index) in menuOptions.otherBtns">
        <el-button
          :key="index"
          v-permission="other.permission ? other.permission : ['*']"
          type="primary"
          @click.stop="handleOther(other.id,other)"
        >
          {{ other.label }}
        </el-button>
      </template>
    </div>
    <el-popover
      placement="bottom-start"
      width="200"
      trigger="click"
    >
      <el-checkbox-group
        v-model="trSelect"
      >
        <el-checkbox v-for="(tr,index) in trs" :key="index" :label="tr" style="width:100%;" @change="selectChange($event,tr)">
          {{ tr.label }}
        </el-checkbox>
      </el-checkbox-group>
      <div slot="reference" class="drop">
        <svg-icon icon-class="list" />
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    trs: {
      type: Array,
      default: null
    },
    menuOptions: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      drop: false,
      trSelect: this.trs
    }
  },
  watch: {
    trs(value) {
      this.trSelect = value
    }
  },
  methods: {
    selectChange(value, tr) {
      for (let i = 0; i < this.trs.length; i++) {
        const item = this.trs[i]
        if (item.id === tr.id) {
          item.show = value
          return
        }
      }
    },
    handleCreate() {
      this.$emit('create-event')
    },
    handleDelete() {
      this.$emit('delete-event')
    },
    handleImport() {
      this.$emit('import-event')
    },
    handleOther(id, other) {
      const funName = other.Fun ? other.Fun : 'other-event'
      this.$emit(funName, id, other)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$lineColor:#1e3e9c;
.menu-wrap{
  display:flex;
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  border: 1px solid $lineColor;
  background:rgb(17,42,117);
  .btn{
    flex: 1;
  }
  .drop{
    width: 36px;
    height: 36px;
    margin-right: 16px;
    color:#fff;
    line-height: 36px;
    text-align: center;
    border-radius: 2px;
    background: #3757b5;
    cursor: pointer;
  }
}

</style>
