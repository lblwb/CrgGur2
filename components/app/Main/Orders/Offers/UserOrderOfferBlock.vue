<template>
  <div class="deliveryBodyOfferInfoBlock">
    <div class="deliveryBodyCargsItem">
      <div class="deliveryBodyCargsItemBlock">
        <div class="deliveryBodyCargsItemHeading">
          <div class="cargsItemHeadingTitle">
            Ваше предложение:
          </div>
        </div>

        <div class="deliveryBodyCargsItemBlockNotAvail" style="font-size: 16px;">
          <div class="blockListItem" style="font-size: 16px; color: var(--btn-text-color); margin-bottom: 16px;">
            Вы еще не добавили своё предложение.
          </div>
          <div class="blockListItemAction" style="width: 100%;">
            <div class="blockListItemActionBtnWrapper" style="">
              <div class="blockListItemBtn">
                <button @click="createOffer"
                  style="padding: 10px 14px; width: 100%; background: transparent;color: var(--accent-block-color); background: var(--accent-comp-high-color); border-radius: var(--btn-brd-rds-main);border: solid 1px var(--accent-comp-high-color);font-size: 12px;font-weight: 500;">
                  Добавить отклик
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserOrderOfferBlock',
  props: ['orderItem'],

  methods: {
    getFormatDate(date) {
      try {
        if (date !== undefined && date !== null) {
          console.log(date);
          const currentDate = new Date(date);
          return currentDate.toLocaleDateString('en-GB').replace(/\//g, '-');
        } else {
          throw `"not avial date": ${date}`;
        }
      } catch (e) {
        console.error(e);
        return "--";
      }
    },
    createOffer(){
      alert("Не удалость создать, cors error!");
    }
  }
};
</script>

<style scoped>

.deliveryBodyCargsItem .deliveryBodyCargsItemBlock {
  background: #FFFFFF;
  padding: 16px;
  width: 100%;
  height: auto;
  border-radius: var(--main-border-radius)
}

.CargoWidgetBlock .CargoWidgetBlockWrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 8px;
}

.cargsItemHeadingTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 24px;
}
</style>
