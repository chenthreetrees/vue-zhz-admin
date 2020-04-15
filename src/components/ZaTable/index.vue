<template>
  <div class="table-wrap">
    <ZaSearchBar
      v-if="$attrs['search-options']"
      v-bind="$attrs"
      :search-data="$attrs['search-data']"
      :extend-data="$attrs['extend-data']"
      :search-options="$attrs['search-options']"
      style="margin-bottom:12px;"
      v-on="$listeners"
    />
    <MenuBar
      v-if="$attrs.table"
      v-bind="$attrs"
      :trs="$attrs.table.tr"
      :menu-options="$attrs['menu-options']"
      v-on="$listeners"
    />
    <Table
      v-bind="$attrs"
      :table="$attrs.table"
      :data="$attrs.data"
      :loading="$attrs.loading"
      height="100%"
      v-on="$listeners"
    />
    <Pagination
      v-show="$attrs.total > 0"
      v-bind="$attrs"
      :total="$attrs.total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="pagination"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MenuBar from './MenuBar'
import Table from './Table'
import ZaSearchBar from '@/components/ZaSearchBar'
export default {
  components: { Pagination, MenuBar, ZaSearchBar, Table },
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    pagination() {
      this.$emit('pagination')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.table-wrap {
  height: $mainH;
  width: 100%;
  display: flex;
  padding:6px 12px 24px;
  flex-direction: column;
}
</style>
