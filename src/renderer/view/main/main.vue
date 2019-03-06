<template>

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
