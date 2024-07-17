<template>
  <TwaMainLt>
    <template #Body>
      <div class="CatalogBodyWrapper">
        <!--        Settings-->
        <InfoCntBlockBtn
          :counter="0"
          :showProgress="false"
          :titleCount="!modeExecDriver ? 'Стать водителем' : 'Стать Клиентом'"
          titleDescCount=""
          :descInfo="!modeExecDriver ? 'Переход в режим водителя' :'Переход в режим клиента' "
          @callClick="changeTypeProfile"
        />
      </div>
    </template>
  </TwaMainLt>
</template>

<script>
import TwaMainLt from "~/layout/twaMainLt.vue";
import InfoCntBlockBtn from "~/components/twa/body/widget/InfoCntBlockBtn.vue";
import {mapGetters} from "vuex";

export default {
  name: "settings",
  methods: {
    changeTypeProfile() {
      alert('Вы стали водителем!')
    }
  },
  computed: {
    ...mapGetters({
      'modeExecDriver': 'user/account/getModeExecUsr',
      'userData': 'user/account/getInfUserData'
    })
  },
  components: {InfoCntBlockBtn, TwaMainLt}
}
</script>

<style scoped>
.CatalogBodyWrapper {

}
</style>
