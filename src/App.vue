

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/header/Header.vue'

@Component({
  template: '#base-template',
  render (h: any) {
    return h('div', {
      'id': 'app',
    }, [
      h('studis-header'),
      h('b-container', {
        'class': 'main-content'
      },[
        h('router-view')
      ])
    ])
  },
  components: {
    'studis-header': Header
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-content {
  padding: 30px;
}
</style>
