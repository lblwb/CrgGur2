<template>
  <div class="MainBodyRequestsWidgets">
    <div class="MainBodyRequestsWidgetsWrapper">
      <InfoCntBlockBtn
        :counter="infoBlock.sending_cnt"
        :titleCount="infoBlock.sending_cnt.toString()"
        titleDescCount="Сейчас в пути"
        descInfo="Скоро будут к вам доставлены"
        @callClick="$router.push({name:'order-cargo-me'})"
        style="margin-bottom: 12px;"
      />
      <InfoCntBlockBtn
        :counter="infoBlock.pending_cnt"
        :titleCount="infoBlock.pending_cnt.toString()"
        titleDescCount="Ожидаются"
        descInfo="Заявки на рассмотрении"
        @callClick="$router.push({name:'order-cargo-me'})"
      />

      <!--      @callClick="$router.push({name:'order-cargo-me-filter-status',
              params:{
                status: 'pending'
              }})"  -->
    </div>
  </div>
</template>

<script>

import InfoCntBlockBtn from "~/components/twa/body/widget/InfoCntBlockBtn.vue";

export default {
  name: "MainReqCountBlock",
  data() {
    return {
      infoBlock: {
        sending_cnt: 0,
        pending_cnt: 0,
      }
    }
  },
  methods: {
    async fetchCurrencyData() {
      const {user} = await this.$axios.$get("/api/tg/user_info/");

      const order_status_counts = user.status_counts;
      //
      if (order_status_counts !== null) {
        this.infoBlock = {};

        // console.log(order_status_counts.find((item) => item.status === 'pending_accept'))

        try {
          this.infoBlock['sending_cnt'] = order_status_counts.find((item_st) => item_st.status === 'delivery').count
        } catch (e) {
          this.infoBlock['sending_cnt'] = 0;
        }
        //
        try {
          this.infoBlock['pending_cnt'] = order_status_counts.find((item_st) => item_st.status === 'pending_accept').count
        } catch (e) {
          this.infoBlock['pending_cnt'] = 0;
        }
      }

    }
  },
  mounted() {
    this.fetchCurrencyData()
  },
  components: {InfoCntBlockBtn}
}
</script>

<style scoped>
.MainBodyRequestsWidgetsWrapper {
  /*display: flex;
  flex-flow: row;*/
  gap: 0 12px;
  box-sizing: border-box;
}
</style>
