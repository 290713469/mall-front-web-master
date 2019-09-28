<template>
  <div class="w">
    <y-shelf :title="$t('payment.payment_scussess_header')" style="text-align: center">
      <div slot="content" class="content">
        <p><i class="el-icon-circle-check icon-success"></i> {{$t("payment.payment_success_msg")}}<br>{{$t("cart.total_number")}} <span class="price"><em style="font-size: 27px">{{$t("cart.cash_symbol")}}</em>{{price}}</span></p>
        <div style="margin-top: 20px;">
          <router-link to="/user">
            <y-button :text="$t('payment.review_order')" style="width: 150px;height: 50px;line-height: 48px;font-size: 20px"
                      classStyle="main-btn"></y-button>

          </router-link>
          <router-link to="/home">
            <y-button :text="$t('payment.continue_shopping')" style="width: 195px;height: 50px;line-height: 48px;font-size: 20px"
                      classStyle="main-btn"></y-button>

          </router-link>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        price: 10
      }
    },
    components: {
      YShelf,
      YButton
    },
    created () {
      this.price = this.$route.query.price
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    padding: 150px 0;
    font-size: 30px;
  }

  .icon-success {
    font-size: 33px;
    color: #01b401;
  }

  span.price {
    color: #d44d44;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
  }
</style>
