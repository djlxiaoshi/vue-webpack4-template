## app-table 组件配置说明
```text
{
  tableColumns: [
    { 
      label: '', // 表头中文名
      field: '', // 表头英文字段名
      fixed: 'right | left', // 左右固定列配置
      width: 30, // 列宽度,
      operate: true, // 配置这个字段后会显示操作列
      slotName: 'custom-tmpl', // 配置这个字段后允许用户插入模板
      formatter: Function // 表格数据格式化函数
    }
  ],
  tableData: [], // 表格数据,
  height: 100, // 表格高度
  border: true // 表格有无边框
  title: '表格题目', // 表格题目
  tableRows: 10, // 表格一页行数
  sortBy: '', // 排序  详细见element-ui table组件
  hasDetails: false, // 是否显示详情操作按钮
  hasEdit: false, // 是否显示编辑操作按钮
  hasDelete: false, // 是否显示删除操作按钮,
  options: [], // 筛选器配置  详见app-options组件配置文件
}
```

## 事件
```text
onDetails: Function // 点击详情按钮触发事件
onEdit: Function // 点击编辑按钮触发事件
onDelete: Function // 点击删除按钮触发事件
optionsReady: Function // 数据筛选器加载完毕 触发ready事件，如果筛选器不包含异步请求数据，会马上就行触发
optionsSelectedChange: Function // 筛选器数据变化触发事件
cascadeItemChange: Function // 级联菜单选择项变更时触发事件
```
