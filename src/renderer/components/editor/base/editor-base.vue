<template>
  <div style="width: 350px">
    <div :id="id1"
      :class="class1">
    </div>
    <!-- <div style="padding: 5px 0; color: #ccc">中间隔离带</div> -->
    <div :id="id2"
      :class="class2">
      <!--可使用 min-height 实现编辑区域自动增加高度-->
      <!-- <template v-html="text" /> -->

    </div>

  </div>
</template>

<script>
import Wangeditor from 'wangeditor';

import './index.less';

export default {
  props: {
    id1: {
      type: String,
      required: true,
    },
    id2: {
      type: String,
      required: true,
    },
    class1: {
      type: String,
      required: true,
    },
    class2: {
      type: String,
      required: true,
    },

    menus: {
      type: Array,
      required: true,
    },
    debug: Boolean,
    pasteIgnoreImg: {
      type: Boolean,
      default: true,
    },
    pasteFilter: Boolean,
    pasteTextHandle: String,
    disabledMenus: Array,
    uploadParams: Object,
    uploadHeaders: Object,
  },

  computed: {
  },

  data () {
    return {
      editor: null,
    };
  },
  methods: {
    // 筛选编辑器菜单
    filterMenu (menus) {
      if (menus instanceof Array) {
        return menus.map((item, key) => {
          if (item === 'source') {
            return null;
          }
          return item;
        });
      }
      return null;
    },
    // 筛选不可用菜单
    filterDisabledMenu (menus, disabledMenus) {
      let menusToString = menus.join(',');
      disabledMenus.forEach((res) => {
        menusToString = menusToString.replace(res, '').replace(',,', ',');
      });
      if (menusToString.length && menusToString[0] === ',') {
        menusToString.substr(1, menusToString.length);
      }
      return menusToString.split(',');
    },

    // 获取Html内容
    getHtml () {
      return this.editor.txt.html();
    },

    // 获取Text内容
    getText () {
      return this.editor.txt.text();
    },
    // 设置内容(html)
    setHtml (text) {
      this.editor.txt.html(text);
    },
    // 清空编辑器
    clearEditor () {
      this.editor.txt.clear();
    },
    // 创建编辑器
    createEditor () {
      if (this.editor) return;
      this.editor = new Wangeditor(`#${this.id1}`, `#${this.id2}`);

      // 是否开启debug模式
      this.editor.customConfig.debug = this.debug;


      // 筛选菜单
      if (this.menus !== undefined && this.menus instanceof Array && this.menus.length) {
        // 配置菜单，默认全部，对source进行过滤
        this.editor.customConfig.menus = this.filterMenu(this.menus);
      } else if (this.disabledMenus) {
        // 禁用菜单
        this.editor.customConfig.menus = this.filterDisabledMenu(wangEditor.customConfig.menus, this.disabledMenus);
      } else {
        this.editor.customConfig.menus = this.filterMenu(wangEditor.customConfig.menus);
      }

      // this.editor.customConfig.pasteFilterStyle = true;

      if (this.pasteFilter !== undefined) {
        // 配置粘贴过滤，默认为false
        this.editor.customConfig.pasteFilter = this.pasteFilter;
      }
      // 自定义处理粘贴的文本内容

      if (this.pasteIgnoreImg !== undefined) {
        // 忽略粘贴内容中的图片
        this.editor.customConfig.pasteIgnoreImg = this.pasteIgnoreImg;
      }

      this.editor.customConfig.pasteTextHandle = (content) => {
        // const reg = /<a[^>]*href=['"]([^"]*)['"].*?[^>]*>(.*?)<\/a>/g;
        const reg = /<a([^>]*?)href=['"]([^'"]*?)['"]([^>]*?)>(.*?)<\/a>/ig;
        const regex = new RegExp(reg, 'gi');
        console.log('​this.editor.customConfig.pasteTextHandle -> reg', content.replace(regex, ''));
        return content.replace(regex, '不允许插入超链接..');
      };


      // this.editor.customConfig.onchange = (html) => {
      //
      // };

      this.editor.customConfig.onblur = (html) => {
        // html 即编辑器中的内容
        this.$root.bus.$emit('editorOnblur', html);
      };

      this.editor.customConfig.linkCheck = (text, link) => '不允许插入超链接';


      this.editor.customConfig.uploadImgHooks = {
        before: (xhr, editor, files) => {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: (xhr, editor, result) => {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          // this.$message.success({
          //   // name: 'upload_pic_success',
          //   content: '插入图片成功！',
          //   // top: 50,
          //   duration: 3
          // })
        },
        fail: (xhr, editor, result) => {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          this.$message.error({
            // name: 'upload_pic_fail',
            content: '插入图片失败！',
            // top: 50,
            duration: 3,
          });
        },
        error: (xhr, editor) => {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          this.$message.error({
            // name: 'upload_pic_error',
            content: '上传图片失败！',
            // top: 50,
            duration: 3,
          });
        },
        timeout: (xhr, editor) => {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          this.$message.error({
            // name: 'upload_pic_timeout',
            content: '上传图片超时！',
            // top: 50,
            duration: 3,
          });
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: (insertImg, result, editor) => {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          if (result && result.length > 0) {
            result.forEach(element => {
              const url = element.http_path;
              insertImg(url);
            });
          } else {
            this.$Message.error({
              // name: 'upload_pic_error_div',
              content: '上传图片返回格式错误！',
              // top: 50,
              duration: 3,
            });
          }

          // result 必须是一个 JSON 格式字符串！！！否则报错
        },
      };

      this.editor.customConfig.zIndex = 1;

      this.editor.create();
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.createEditor();
    });
  },
};
</script>
