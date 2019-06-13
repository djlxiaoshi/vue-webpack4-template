## app-options 组件配置说明
```text
{
  type: dropdown | singleSelect | multiSelect | cascade, // 分别对应 下拉选择 单选 多选 级联选择
  selected: 1 | [] // 设置默认选择项 如果是dropdown和singleSelected值为基本类型  如果是级联或者多选 值为一个数组
  defaultSelectedIndex: 15 // 默认选择第几项  作用于dropdown和singleSelect
  defaultSelectedIndexes: [15, 35] // 默认选择第哪几项 作用于multiSelect
  defaultSelectedNumber: [15, 35] // 默认选择前项 作用于multiSelect  权重 selected > defaultSelectedIndexes > defaultSelectedNumber
  noLessThanNumber: 2, // 默认选择前项 作用于multiSelect
  list: [{label: '', value: ''}]  // 选项 list 权重 大于 query 
}
```

## 事件

```text
optionsReady: Function // 数据筛选器加载完毕 触发ready事件，如果筛选器不包含异步请求数据，会马上就行触发
optionsSelectedChange: Function // 筛选器数据变化触发事件
cascadeItemChange: Function // 级联菜单选择项变更时触发事件
```
