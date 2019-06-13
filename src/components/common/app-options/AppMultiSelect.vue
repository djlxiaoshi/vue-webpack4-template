<template>
  <el-popover width="300">
    <div class="multi-select-wrap">
      <div class="header">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          style="margin-left: 5px">
          全选
        </el-checkbox>
        <el-input
          size="mini"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchText">
        </el-input>
      </div>
      <div class="body" v-if="option.list && option.list.length">
        <el-checkbox-group v-model="selected" @change="selectChange($event)">
          <el-checkbox
            v-for="item in option.list"
            v-if="!item['_hidden']"
            :disabled="item['_disabled']"
            :label="item.value"
            :key="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="footer">
        <el-button type="primary" size="mini" plain style="padding: 4px;" @click="ensure()">确定</el-button>
      </div>
    </div>
    <el-button slot="reference" size="mini">{{ title }}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'AppMultiSelect',
  data () {
    return {
      selected: [],
      searchText: '',
      checkAll: false,
      isIndeterminate: false
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          list: [],
          defaultSelectedNumber: 1
        };
      }
    },
    title: {
      type: String,
      default: '数据筛选'
    }
  },
  created () {
    if (this.option.list && Array.isArray(this.option.list)) {
      this.init();
    }
  },
  mounted () {
  },
  methods: {
    init () {
      this.setDefaultSelected();
      this.setDisabled();
      this.setCheckAllBoxStatus();
    },
    setDefaultSelected () {
      const option = this.option;
      const valueName = 'value';
      const list = (option.list && Array.isArray(option.list)) ? option.list : [];
      let selected = option.selected;
      if (!selected || !Array.isArray(selected) || !selected.length) {
        selected = [];
        if (option['defaultSelectedIndexes']) {
          selected = list.reduce((rs, item, index) => {
            /* eslint-disable no-extra-boolean-cast */
            if (!!~option['defaultSelectedIndexes'].indexOf(index)) {
              rs.push(item[valueName]);
            }
            return rs;
          }, []);
        } else if (option['defaultSelectedNumber']) {
          selected = list.reduce((rs, item, index) => {
            if (index < option['defaultSelectedNumber']) {
              rs.push(item[valueName]);
            }
            return rs;
          }, []);
        } else {
          // 如果没有配置任何与默认选中相关的配置，则设置第一项为默认选中项
          if (option.list && option.list.length) {
            selected = [this.option.list[0][valueName]];
          }
        }
      } else {
        selected = this.option.selected;
      }
      this.option.selected = this.selected = selected;
    },
    setDisabled () {
      let number = 0;
      if (this.option['noLessThanNumber'] && typeof this.option['noLessThanNumber'] === 'number' && this.option['noLessThanNumber'] > 0) number = this.option['noLessThanNumber'];
      this.option.list.forEach(item => {
        /* eslint-disable no-extra-boolean-cast */
        if (!!~this.selected.indexOf(item['value'])) {
          this.$set(item, '_disabled', this.selected.length <= number); // 加入响应式系统
        }
      });
    },
    selectChange () {
      this.setCheckAllBoxStatus();
      this.setDisabled();
      this.option.selected = this.selected;
    },
    handleCheckAllChange (isCheckAll) {
      let allSelected = [];
      let number = this.option['noLessThanNumber'] || 0;
      if (isCheckAll) {
        allSelected = this.option.list.map(item => item['value']);
      } else {
        allSelected = this.option.list.slice(0, number).map(item => item.value);
      }
      this.option.selected = this.selected = allSelected;
      this.setCheckAllBoxStatus();
      this.setDisabled();
    },
    setCheckAllBoxStatus () {
      this.setCheckAll();
      this.setIsIndeterminate();
    },
    setCheckAll () {
      if (!this.option.selected || !this.option.list) {
        return false;
      }
      this.checkAll = this.selected.length === this.option.list.length;
    },
    setIsIndeterminate () {
      this.isIndeterminate = this.selected.length > 0 && this.selected.length < this.option.list.length;
    },
    ensure () {
      this.$emit('multiSelectChange', this.selected);
    }
  },
  watch: {
    searchText (text) {
      text = text.trim();
      this.option.list.forEach(item => {
        if (text === '') {
          item['_hidden'] = false;
          return;
        }
        const labelName = this.option['labelName'] || 'label';
        const label = (item[labelName] + '').trim();
        item['_hidden'] = !~label.indexOf(text);
      });
    },
    option () {
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
  .multi-select-wrap {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;
      .el-input {
        width: 200px;
      }
    }
    .body {
      margin: 5px auto;
      /deep/ .el-checkbox-group {
        label {
          margin: 5px;
        }
      }
    }
    .footer {
      text-align: right;
      padding-top: 10px;
      border-top: 1px solid rgb(220, 223, 230);
    }
  }
</style>
