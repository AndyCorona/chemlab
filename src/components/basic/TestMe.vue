<script>
import { h } from 'vue'

export default {
  props: {
    list: Array
  },
  render: () => {
    return h(
      'div',
      {
        // 添加属性类名
        id: 'hello',
        class: 'wrapper',
        // 添加样式
        style: {
          height: '100%',
          border: '1px solid green',
          margin: '100px'
        },
        // 添加事件
        onClick: () => {
          console.log('点击事件执行')
        },
        onMouseover: () => {
          console.log('鼠标进入执行')
        },
        oncontextmenu: () => {
          console.log('右键点击事件执行')
        }
      }
    )
  }
}
</script>
