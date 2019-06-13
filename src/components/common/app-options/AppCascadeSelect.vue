<template>
  <el-cascader
    size="mini"
    :options="option.list"
    v-model="option.selected"
    @active-item-change="cascadeItemChange"
    @change="selectChange">
  </el-cascader>
</template>

<script>
export default {
  name: 'AppCascadeSelect',
  data () {
    return {};
  },
  props: ['option'],
  methods: {
    cascadeItemChange (value) {
      this.$emit('cascadeItemChange', value);
    },
    selectChange (value) {
      this.$emit('cascadeSelectChange', value);
    }
  }
};
</script>

<style lang="less" scoped>

</style>
