<template>
  <div class="app-table">
    <div class="toolbar">
      <span class="title">{{ title }}</span>
      <AppOptions
        v-bind="$attrs"
        v-on="listeners"
      ></AppOptions>
      <el-input placeholder="请输入内容" v-model="searchText" size="mini" class="search"></el-input>
      <slot name="custom-toolbar"></slot>
    </div>
    <el-table
      v-loading="loading"
      :data="currentPageData"
      :sortable="true"
      :border="border"
      :height="height"
      :header-cell-style="{
        'background': '#EBEEF5',
        'padding': '5px 0'
      }">
      <el-table-column
        v-for="columns in tableColumns"
        :key="columns['field']"
        :fixed="columns['fixed']"
        :prop="columns['field']"
        :label="columns['label']"
        :min-width="columns['width'] + 'px'"
        :show-overflow-tooltip="true"
        :sortable="columns['field'] !== 'operate'"
        :sort-by="sortBy"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <div v-if="columns['field'] === 'operate'">
            <el-button type="info" icon="el-icon-message" class="etl-btn mini" @click="details(scope.row)" v-if="hasDetails" title="详情"></el-button>
            <el-button type="warning" icon="el-icon-edit" class="etl-btn mini" @click="edit(scope.row)" v-if="hasEdit" title="编辑"></el-button>
            <el-button type="danger" icon="el-icon-delete" class="etl-btn mini" @click="del(scope.row)" v-if="hasDelete" title="删除"></el-button>
            <slot name="operate" :row="scope.row"></slot>
          </div>
          <div v-else>
            <template v-if="columns['slotName']">
              <slot :name="columns['slotName']" :row="scope.row"></slot>
            </template>
            <template v-else-if="columns['formatter']">
              {{ columns['formatter'](scope.row[columns['field']], scope.row )}}
            </template>
            <template v-else>
              <span :class="{'-include': setIncludeColor(scope.row[columns['field']])}"> {{ scope.row[columns['field']] }} </span>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <footer class="footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="tableRows"
        :total="computedTableData.length"
        @current-change="pageChange($event)"
      >
      </el-pagination>
    </footer>
  </div>
</template>

<script>
  import { getTableDataSize } from 'gettabledatasize';
  export default {
    name: 'AppTable',
    data () {
      return {
        currentPageData: [],
        computedTableData: [],
        total: this.tableData.length,
        searchText: '',
        noSearchFields: ['operate'] // 不参与查询的字段
      };
    },
    props: {
      tableColumns: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => []
      },
      height: {
        type: Number
      },
      loading: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      tableRows: {
        type: Number,
        default: 10
      },
      formatterHandler: {
        type: Function
      },
      sortBy () {
        return {
          type: String | Array | Function
        };
      },
      hasDetails: {
        type: Boolean,
        default: false
      },
      hasEdit: {
        type: Boolean,
        default: false
      },
      hasDelete: {
        type: Boolean,
        default: false
      }
    },
    created () {
      getTableDataSize(this.tableColumns, this.tableData, {
        columnRedundancyWidth: 60
      });
    },
    mounted () {
      this.setCurrentPageTableData(this.tableData, 0, this.tableRows);
    },
    methods: {
      pageChange (page) {
        const data = this.computedTableData;
        const start = (page - 1) * this.tableRows;
        const end = page * this.tableRows;
        this.setCurrentPageTableData(data, start, end);
        this.$emit('onPageChange', page);
      },
      setCurrentPageTableData (tableData, start, end) {
        this.currentPageData = tableData.slice(start, end);
      },
      details (row) {
        this.$emit('onDetails', row);
      },
      edit (row) {
        this.$emit('onEdit', row);
      },
      del (row) {
        this.$emit('onDelete', row);
      },
      setIncludeColor (value) {
        value = value + '';
        if (this.searchText.trim() === '') return false;
        return !!~value.indexOf(this.searchText.trim());
      }
    },
    computed: {
      listeners () {
        return {
          ...this.$listeners
        };
      }
    },
    watch: {
      searchText (value) {
        value = value.trim();
        if (value === '') {
          this.computedTableData = this.tableData;
        } else {
          this.computedTableData = this.tableData.filter(row => {
            return this.tableColumns.some(column => {
              if (!this.noSearchFields.includes(column['field'])) {
                if (!row[column['field']]) return false;
                // 强制将每个字段转换为string类型
                return !!~(row[column['field']] + '').indexOf(value);
              }
              return false;
            });
          });
        }
        const data = this.computedTableData;
        this.setCurrentPageTableData(data, 0, this.tableRows);
      },
      tableData (data) {
        this.setCurrentPageTableData(data, 0, this.tableRows);
        // 由于数据是异步获取的，所以要在这里做监听
        this.computedTableData = data;
      }
    }
  };
</script>

<style lang="less" scoped>
  .app-table {
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    font-size: 12px;
    .el-table {
      font-size: 12px;
      .el-table__row {
        .-include {
          color: #F56C6C;
        }
      }
      /deep/ .el-table__header-wrapper {
        .el-table__header {
          thead {
            .cell {
              font-weight: 500 !important;
              color: rgb(96, 98, 102) !important;
            }
          }
        }
      }
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: 35px;
      padding: 0 10px;
      .title {
        margin-right: 10px;
        min-width: 100px;
        text-align: left;
      }
      >.-toolbar-right{
        margin-left: auto;
      }
      .custom-toolbar-wrap {
        margin: 0 0 0 10px;
      }
      .search{
        max-width: 200px;
        height: 28px;
        margin: 0 0 0 auto;
        /deep/ .el-input__inner {
          border-color: #DCDFE6;
          &:focus {
            border-color: #DCDFE6;
          }
        }
      }
      .custom-toolbar {
        margin-left:10px;
      }
    }
    /deep/ .el-table td{
      padding: 7px 0;
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
    }
  }
</style>
