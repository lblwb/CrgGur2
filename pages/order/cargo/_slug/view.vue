<template>
  <TwaMainLt>
    <template #Body>
      <div class="CargoView">
        <div class="CargoViewBody">
          <div class="CargoViewBodyHeading">
            <div class="bodyHeadingTitle">
              Заявка #{{ orderItem.idx }}
            </div>
          </div>


          <div class="CargoViewOrderAction" style="margin-bottom: 16px">
            <div class="orderActionBtn">
              <button style="" v-if="showOffers">
                <span class="orderActionBtnWrapper"
                      style="">
                  <span class="orderActionBtnIcon" style="display:flex;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 8L14 16M10 16L14 8M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                      stroke="#728AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="orderActionBtnTitle">
                  Отмена заявки
                </span>
                </span>

              </button>
            </div>
          </div>

          <div class="CargoViewOrder">
            <CargoOrdersBlockItem :order="orderItem"/>
          </div>
          <div class="CargoViewOrderOffers" v-if="showOffers">
            <OrderOffersBlockItem :offersItems="offersByOrder"/>
          </div>
           <div class="CargoViewOrderYouOffers" v-else>
            <UserOrderOfferBlock :orderItem="orderItem"/>
          </div>

        </div>
      </div>
    </template>
  </TwaMainLt>
</template>
<script>

import TwaMainLt from "~/layout/twaMainLt.vue";
import CargoOrdersBlockItem from "~/components/app/Main/Orders/Block/CargoOrdersBlockItem.vue";
import OrderOffersBlockItem from "~/components/app/Main/Orders/Offers/OrderOffersBlockItem.vue";
import UserOrderOfferBlock from "~/components/app/Main/Orders/Offers/UserOrderOfferBlock.vue";

export default {
  name: "orderCargoSlug",
  data() {
    return {
      offersByOrder: [],
      orderItem: {},
      showOffers: false
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
    async fetchOrderView() {
      try {
        const {order, offers, offers_show} = await this.$axios.$get(`/api/orders/show/${this.$route.params.slug}/`);
        console.log(order);
        const order_data = order && order != null ? order : [];
        const offers_order_data = offers && offers != null ? offers : [];
        this.orderItem = order_data;
        this.offersByOrder = offers_order_data;
        this.showOffers = offers_show;
      } catch (e) {
        console.log("cargo-view-show:", e);
        // return {ordersMeList: []}
      }
    }
  },
  mounted() {
    this.fetchOrderView()
  },
  components: {UserOrderOfferBlock, OrderOffersBlockItem, CargoOrdersBlockItem, TwaMainLt}
}
</script>


<style scoped>
.CargoViewBodyHeading {
  margin-bottom: 16px;
}

.CargoViewBodyHeading .bodyHeadingTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #000000;
  max-width: 76vw;
}

.orderActionBtn button {
  background: transparent;
  border: solid 1px #F0F0F0;
  padding: 8px 10px;
  border-radius: 10px;
}

.orderActionBtn button .orderActionBtnWrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 8px;
}

.orderActionBtn button .orderActionBtnIcon {
  display: flex;
}

.orderActionBtn button .orderActionBtnTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: #000000;
}

.CargoViewOrder {
  margin-bottom: 16px;
}
</style>
