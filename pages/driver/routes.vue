<template>
  <TwaMainLt>
    <template #Body>
      <div class="orderCargoMeBodyTabMain" style="overflow: hidden">

        <div class="orderCargoMeBodyWrapper" style="max-height: 78vh; overflow-y: auto; overflow-x: hidden">
          <div class="orderCargoMeBodyList" v-if="ordersList.length > 0" style="display:grid; gap: 14px">
            <CargoOrdersBlockItem v-for="(order, index) in ordersList" :order="order" :key="order.idx"/>
            <!--     -->
          </div>
          <div class="orderCargoMeNotOrders" v-else>
            <div class="orderCargoMeNotOrdersBlock">
              <div class="orderCargoMeNotOrdersBlockTitle">
                Ждем новые заявки на перевозку...
              </div>
            </div>
            <div class="orderCargoMeNotOrdersBtn" @click="$router.push({name:'driver-routes'})"
                 style="padding: 18px 24px; border: solid 1px var(--accent-block-color); border-radius: 16px;">
              <div class="orderCargoMeNotOrdersBtnWrapper"
                   style="display: flex; align-items: center; justify-content: space-between;">
                <div class="orderCargoMeNotOrdersBtnTitle">
                  Обновить
                </div>
                <div class="orderCargoMeNotOrdersBtnIcon">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13M3 13C3 12.4696 3.21071 11.9609 3.58579 11.5858C3.96086 11.2107 4.46957 11 5 11C5.53043 11 6.03914 11.2107 6.41421 11.5858C6.78929 11.9609 7 12.4696 7 13M3 13H1V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H11V13M7 13H13M13 13C13 13.5304 13.2107 14.0391 13.5858 14.4142C13.9609 14.7893 14.4696 15 15 15C15.5304 15 16.0391 14.7893 16.4142 14.4142C16.7893 14.0391 17 13.5304 17 13M13 13C13 12.4696 13.2107 11.9609 13.5858 11.5858C13.9609 11.2107 14.4696 11 15 11C15.5304 11 16.0391 11.2107 16.4142 11.5858C16.7893 11.9609 17 12.4696 17 13M17 13H19V7M19 7H11M19 7L16 2H11"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </template>
  </TwaMainLt>
</template>
<script>
import TwaMainLt from "~/layout/twaMainLt.vue";
import TabList from "~/components/twa/body/widget/Tab/TabList.vue";
import TabListItem from "~/components/twa/body/widget/Tab/TabListItem.vue";
import CargoOrdersBlockItem from "~/components/app/Main/Orders/Block/CargoOrdersBlockItem.vue";

export default {
  name: "driverRoutes",
  data() {
    return {
      ordersList: []
    }
  },
  methods: {
    getStatus(status_type) {

      switch (status_type) {
        case "sending_accepted":
          return {
            title: "В пути",
            type: status_type
          }
        case "pending_accepted":
          return {
            title: "Подтверждается",
            type: status_type
          }

        case "no_payment":
          return {
            title: "Не оплачен",
            type: status_type
          }

        case "canceled":
          return {
            title: "Отменен",
            type: status_type
          }
        default:
          break;
      }
    },
    async fetchOrderRoutes() {
      try {
        const {orders} = await this.$axios.$get("/api/orders/search/pendings/");
        this.ordersList = orders;
      } catch (e) {
        console.log("cargo-me:", e);
        // return {ordersMeList: []}
      }
    }
  },
  // async asyncData({$axios}) {
  //
  // },
  async mounted() {
    await this.fetchOrderRoutes();
    // await this.selectTab('1');
  },
  components: {CargoOrdersBlockItem, TabListItem, TabList, TwaMainLt},
}
</script>


<style scoped>


.orderCargoMeBody .orderCargoMeBodyList .listBlockItem {
  border: 1px solid #EFF3FF;
  background: #FCFCFC;
  border-radius: 10px;
  padding: 14px 24px;
  margin-bottom: 14px;
}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeading {
  margin-bottom: 12px;
}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingTitle {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.18px;
  color: #717171;
}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingStatus {

}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingStatus .listBlockItemHeadingStatusBudge {
  border: solid 1px #eee;
  border-radius: 14px;
  padding: 6px 10px;
  /**/
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.12px;
}


.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingStatus .listBlockItemHeadingStatusBudge.__sending_accepted {
  border-radius: 14px;
  background: var(--accent-second-color);
  color: var(--text-primary-color);
}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingStatus .listBlockItemHeadingStatusBudge.__pending_accepted {

}

.orderCargoMeBody .orderCargoMeBodyList .listBlockItem .listBlockItemHeadingStatus .listBlockItemHeadingStatusBudge.__canceled {
  color: #000;
  border: 1px solid #000;
}

/**/
.orderCargoMeNotOrdersBlock {
  background: #EFF3FF;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 14px;
}

.orderCargoMeNotOrdersBlock .orderCargoMeNotOrdersBlockTitle {
  color: var(--text-second-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.14px;
}

</style>
