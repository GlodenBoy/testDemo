<template>

  <div>

    <!-- 滚动条的bug -->
    <div>
      <a-button type="primary"
        @click="showModal">Open Modal</a-button>
      <a-modal title="Basic Modal"
        v-model="visible"
        @ok="handleOk">
        <div class="test1">
          <vue-scroll ref="vs">
            <vueEditor ref="vueWangeditor" />

            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>

            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </vue-scroll>
        </div>
      </a-modal>
    </div>

    <!-- 另一个antd的bug  嵌套会导致丢失样式 无法点击-->
    <div>
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link"
          href="#">
          Click me
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link"
              href="#">
              Click me
              <a-icon type="down" />
            </a>
            <div slot="overlay">
              <a-menu-item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </div>
          </a-dropdown>
        </a-menu>
      </a-dropdown>
    </div>
  </div>

</template>

<script>
import vueEditor from '_c/editor/detail-editor.vue';
import './main.less';

export default {
  name: 'Main',
  components: {
    vueEditor,
  },
  data () {
    return {
      visible: false,
    };
  },
  methods: {
    showModal () {
      this.visible = true;
    },
    handleOk (e) {
      console.log(e);
      this.visible = false;
    },
  },
  computed: {

  },

};
</script>
