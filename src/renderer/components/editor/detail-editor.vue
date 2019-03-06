<template>
  <Wangeditor ref="my_editor"
    :id1="id1"
    :id2="id2"
    :class1="class1"
    :class2="class2"
    :menus="menus"> </Wangeditor>

</template>

<script>
import Wangeditor from './base';

export default {
  name: 'detailEditor',
  components: {
    Wangeditor,
  },
  data () {
    return {
      id1: 'detail_editor',
      id2: 'detail_editor_text',
      class1: 'editor-header',
      class2: 'editor-text',
      html: '',
      menus: [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'emoticon', // 表情
        'image', // 插入图片
        'quote', // 引用
        'italic', // 斜体
        'underline', // 下划线
        // 'strikeThrough', // 删除线
        // 'foreColor', // 文字颜色
        // 'backColor', // 背景颜色
        // 'list', // 列表
        // 'justify', // 对齐方式
      ],
    };
  },
  methods: {
    getHtml () {
      return this.$refs.my_editor.getHtml();
      // console.log(this.$refs.my_editor.getHtml())
    },
    setHtml (value) {
      this.$refs.my_editor.setHtml(value);
    },

  },
};
</script>
