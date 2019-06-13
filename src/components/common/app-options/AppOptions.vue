<template>
  <div class="app-options-bar" v-if="options.length">
    <div v-for="(option, index) in options" :key="index" class="option">
      <template v-if="option.type === 'dropdown'">
        <AppDropdownSelect :option="option" @dropdownSelectChange="selectChange($event, index, option, options)"></AppDropdownSelect>
      </template>
      <template v-if="option.type === 'cascade'">
        <AppCascadeSelect
          :option="option"
          @cascadeSelectChange="selectChange($event, index, option, options)"
          @cascadeItemChange="cascadeItemChange($event, index, option, options)"
        ></AppCascadeSelect>
      </template>
      <template v-if="option.type === 'singleSelect'">
        <AppSingleSelect :option="option" @singleSelectChange="selectChange($event, index, option, options)"></AppSingleSelect>
      </template>
      <template v-if="option.type === 'multiSelect'">
        <AppMultiSelect :option="option" @multiSelectChange="selectChange($event, index, option, options)"></AppMultiSelect>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppOptions',
  data () {
    return {
    };
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.init();
  },
  methods: {
    selectChange (value, index, option, options) {
      this.$emit('optionsSelectedChange', { value, index, option, options });
    },
    formatList (list, labelName, valueName) {
      if (!list || !list.length || !Array.isArray(list)) return [];
      else {
        return list.map(item => {
          return { label: item[labelName], value: item[valueName] };
        });
      }
    },
    init () {
      const TotalSyncCount = this.getSyncCount();
      let count = 0;
      if (TotalSyncCount === 0) {
        this.$emit('optionsReady', this.options);
      }
      this.options.forEach(option => {
        if (option.query && typeof option.query === 'object') {
          const url = option.query.url;
          const params = option.query.params;
          // 清空设置的list
          this.$http.get(url, params || {}, false).then(data => {
            const formatList = this.formatList(data.data, option['labelName'] || 'label', option['valueName'] || 'value');
            this.$set(option, 'list', formatList);
            if (option.sync) {
              count++;
              if (count === TotalSyncCount) {
                this.$emit('optionsReady', this.options);
              }
            }
          });
        }
      });
    },
    cascadeItemChange ({ value, index, option, options }) {
      this.$emit('cascadeItemChange', { value, index, option, options });
    },
    getSyncCount () {
      return this.options.filter(option => {
        return option.sync;
      }).length;
    }
  },
  watch: {
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      };
    }
  }
};
</script>

<style lang="less" scoped>
  .app-options-bar {
    display: flex;
    .option {
      margin: 0 5px;
    }
  }
</style>
