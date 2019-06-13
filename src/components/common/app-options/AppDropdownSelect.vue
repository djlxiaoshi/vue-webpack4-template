<template>
  <el-select
    v-model="selected"
    placeholder="请选择"
    size="mini"
    @change="selectChange">
    <el-option
      v-for="item in option.list"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'AppDropdownSelect',
  data () {
    return {
      selected: ''
    };
  },
  props: {
    option: {
      default: {
        selected: ''
      }
    }
  },
  created () {
    // 同步时初始化（即传递了list列表）
    if (this.option.list && Array.isArray(this.option.list)) {
      this.init();
    }
  },
  methods: {
    init () {
      this.setDefaultSelected();
    },
    setDefaultSelected () {
      let selected = this.option.selected;
      if (!this.option.selected) {
        if (this.option.defaultSelectedIndex && typeof this.option.defaultSelectedIndex === 'number' && this.option.defaultSelectedIndex < this.option.list.length) {
          selected = this.option.list[this.option.defaultSelectedIndex].value;
        } else {
          selected = this.option.list[0].value;
        }
      }
      this.option.selected = this.selected = selected;
    },
    selectChange (value) {
      this.$emit('dropdownSelectChange', value);
    }
  },
  watch: {
    option () {
      // 数据异步请求完成后初始化
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>

</style>
