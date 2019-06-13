<template>
  <div class="single-select-wrap" v-if="option.list && option.list.length">
    <el-radio-group
      v-model="option.selected"
      size="mini"
      @change="horizontalSelectChange($event)">
      <el-radio-button
        v-for="item in horizontalList"
        :key="option.valueName ? item[option.valueName] : item.value"
        :label="option.valueName ? item[option.valueName] : item.value">
        {{ option.labelName ? item[option.labelName] : item.label }}
      </el-radio-button>
    </el-radio-group>
    <el-popover
      placement="bottom-end"
      popper-class="single-select-popover"
      :visible-arrow="false"
      :value="false"
      trigger="click">
      <ul class="dropdown-wrap">
        <li
          v-for="item in verticalList"
          :key="option.valueName ? item[option.valueName] : item.value"
          :class="{'-active': option.selected === item[option.valueName || 'value']}"
          @click="verticalSelectChange(item[option.valueName || 'value'], item)">
          {{ option.labelName ? item[option.labelName] : item.label }}
        </li>
      </ul>
      <div class="down-icon" slot="reference" v-if="showVerticalSelect">
        <i class="el-icon-caret-bottom"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'AppSingleSelect',
  data () {
    return {
      horizontalList: [],
      verticalList: []
    };
  },
  props: ['option'],
  created () {
    // 同步时初始化（即传递了list列表）
    if (this.option.list && Array.isArray(this.option.list)) {
      this.init();
    }
  },
  methods: {
    init () {
      this.setDefaultSelected();
      this.splitOptionList();
    },
    setDefaultSelected () {
      if (!this.option.selected) {
        this.option.selected = this.option.list[0].value;
      }
    },
    getItemByValue (value) {
      let item;
      let itemIndex;
      this.option.list.some((_item, index) => {
        if (_item['value'] === value) {
          item = _item;
          itemIndex = index;
          return true;
        } else {
          return false;
        }
      });
      return { item, itemIndex };
    },
    splitOptionList () {
      const { itemIndex } = this.getItemByValue(this.option.selected);
      if (this.option.horizontalCount || typeof this.option.horizontalCount === 'number' || this.option.horizontalCount < 0) {
        // 当默认选择项在水平位置
        if (itemIndex < this.option.horizontalCount - 1) {
          if (this.option.horizontalCount < this.option.list.length) {
            this.horizontalList = this.option.list.slice(0, this.option.horizontalCount);
            this.verticalList = this.option.list.slice(this.option.horizontalCount, this.option.list.length);
          }
        } else {
          // 默认选择项在垂直位置
          this.horizontalList = this.option.list.slice(0, this.option.horizontalCount - 1);
          this.horizontalList.push(this.option.list[itemIndex]);
          this.verticalList = this.option.list.slice(this.option.horizontalCount - 1, this.option.list.length);
        }
      } else {
        this.horizontalList = this.option.list.slice();
      }
    },
    horizontalSelectChange (value) {
      this.$emit('singleSelectChange', value);
    },
    verticalSelectChange (value, item) {
      if (this.option.selected === value) return;
      this.option.selected = value;
      this.horizontalList[this.horizontalList.length - 1] = item;
      this.$emit('singleSelectChange', value);
    }
  },
  computed: {
    showVerticalSelect () {
      if (!this.option.horizontalCount) { return false; }
      return this.option.list.length > this.option.horizontalCount;
    }
  },
  watch: {
    option () {
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
  .single-select-wrap {
    display: flex;
    align-items: stretch;
    /deep/ .el-radio-group {
      .el-radio-button:last-child , .el-radio-button:first-child {
        .el-radio-button__inner {
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
          border-radius: 0;
        }
      }
    }
    .down-icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 100%;
      border: 1px solid #dcdfe6;
      border-left: none;
    }
  }
</style>

<style lang="less">
  .single-select-popover {
    margin-top: 0 !important;
    padding: 5px;
    li {
      padding: 3px 5px;
      cursor: pointer;
      font-size: 12px;
    }
    .-active {
      color: #fff;
      background: #409EFF;
    }
  }
</style>
