<template>
  <div class="w" style="padding-bottom: 100px;">
    <y-shelf :title="$t('payment.method_of_payment')">
      <div slot="content">
        <!--<div class="pay-type">
          <div id="paypal-button-container"></div>
         <PayPal
            amount="orderTotal.toFixed(4)"
            currency="USD"
            :client="payPal" env="production" @payment-completed="paySuc()" style="padding-top: 25px;">
          </PayPal>
         &lt;!&ndash;<PayPal
            amount="0.01"
            currency="USD"
            :client="payPal" env="production" @payment-completed="paySuc()" style="padding-top: 25px;">
          </PayPal>&ndash;&gt;
        </div>-->
        <div class="box-inner order-info">
          <h3>提交订单成功，请选择支付方式</h3>
         <!-- <p class="payment-detail">请在 <span>2 小时内</span>完成支付，超时订单将自动取消。</p>-->
        </div>
        <!--支付方式-->
        <div class="pay-type">
          <div class="p-title">支付方式</div>
          <div class="pay-item">
            <div :class="{active:payType==1}" @click="payType=1"><img src="/static/images/alipay@2x.png" alt=""></div>
            <div :class="{active:payType==2}" @click="payType=2"><img src="/static/images/weixinpay@2x.png" alt=""></div>
          </div>
        </div>
        <div>
          <div class="box-inner">

            <div >
              <span style="font-weight: bolder;">
                {{$t("cart.total_number")}}：
              </span>
              <em><span style="font-size: 21px">{{$t("cart.cash_symbol")}}</span>{{orderTotal.toFixed(4)}}</em>
              <!--<span>
                实际应付金额：
              </span>
              <em><span>¥</span>{{money}}</em>-->
              <y-button :text="payNow"
                        :classStyle="submit?'main-btn':'disabled-btn'"
                        style="width: 120px;height: 40px;font-size: 16px;line-height: 38px"
                        @btnClick="paySuc()"
              ></y-button>
            </div>
          </div>
        </div>

      </div>
    </y-shelf>
    <!--地址信息-->
    <div class="p-msg w">
      <div class="confirm-detail">
        <div class="info-title">{{$t("checkout.address_info")}}</div>
        <p class="info-detail">{{$t("checkout.user_name")}}：{{userName}}</p>
        <p class="info-detail">{{$t("checkout.phone_num")}}：{{tel}}</p>
        <p class="info-detail">{{$t("checkout.email")}}：{{email}}</p>
        <p class="info-detail">{{$t("checkout.detail_address")}}：{{countryName}}, {{streetName}}</p></div>
    </div>
    <div class="confirm-table-title">
      <div style="width: 550px">
        <span class="name" style="width: 550px !important;">{{$t("cart.product_info")}}</span>
      </div>

      <div>
        <span style="width: 150px !important;">{{$t("goods.color")}}</span>
        <span style="width: 100px !important;">{{$t("goods.size")}}</span>
        <span style="width: 100px !important;">{{$t("cart.price")}}</span>
        <span style="width: 100px !important;">{{$t("cart.count")}}</span>
        <span style="width: 100px !important;">{{$t("cart.sum")}}</span>
      </div>
    </div>
    <!--商品-->
    <div class="confirm-goods-table">
      <div class="cart-items" v-for="(item,i) in cartList" :key="i">
        <div class="name">
          <div class="name-cell ellipsis" style="width: 550px !important;">
            <a @click="goodsDetails(item.productId)" title="" target="_blank">{{item.productName}}</a>
          </div>
        </div>
        <div class="n-b">
          <span style="width: 150px !important;">{{item.color}}</span>
          <span style="width: 100px !important;">{{item.sizeDesc}}</span>

          <span style="width: 100px !important;">{{$t("cart.cash_symbol")}}{{item.salePrice}}</span>
          <span style="width: 100px !important;">{{item.productNum}}</span>
          <span style="width: 100px !important;">
            {{$t("cart.cash_symbol")}} {{item.salePrice * item.productNum}}
          </span>
        </div>
      </div>
    </div>
    <!--合计-->
    <div class="order-discount-line">
      <div style="display: flex;align-items: center;float: right;width: 20%">
        <span style="width: 100px;font-size: 14px;font-weight: bolder;">{{$t("checkout.express_fee")}}：</span>
        <h4 style="font-weight: bolder;"><em>{{$t("cart.cash_symbol")}}{{expressFee}}</em></h4>
      </div>
      <br/>
      <div style="display: flex;align-items: center;float: right;width: 20%">
        <span style="width: 100px;font-size: 14px;font-weight: bolder;">{{$t("cart.total_number")}}：</span>
        <h4 style="font-weight: bolder;"><em>{{$t("cart.cash_symbol")}}{{orderTotal.toFixed(4)}}</em></h4>
      </div>
      <!--<p><span style="padding-right:30px; width:70%"> 运费：</span><span style="font-weight: 700;">+ {{$t("cart.cash_symbol")}} {{expressFee}}</span></p>-->
      <!--<p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">{{$t("cart.total_number")}}：</span>
        <span style="font-size: 16px;font-weight: 500;line-height: 32px;">{{$t("cart.cash_symbol")}} {{orderTotal}}</span>
      </p>-->

    </div>
  </div>
</template>
<script>
  import PayPal from 'vue-paypal-checkout'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { getOrderDet, payMent } from '/api/goods'
  import { getStore, setStore } from '/utils/storage'
  export default {
    data () {
      return {
        payType: 1,
        addList: {},
        cartList: [],
        addressId: 0,
        productId: '',
        num: '',
        userId: '',
        orderTotal: 0,
        expressFee: 0,
        userName: '',
        tel: '',
        countryName: '',
        streetName: '',
        email: '',
        payNow: this.$t('payment.pay_now'),
        submit: true,
        nickName: '',
        money: '1.00',
        info: '',
        orderId: '',
        type: '',
        moneySelect: '1.00',
        isCustom: false,
        maxLength: 30,
        payPal: {
          sandbox: 'Advq-graUr-ZBqOF2_AGNdQ5mOIFnE5Fc3bNnzClE7VwK5hRlIe2LCzz1FxkW16bLLt8T7PQXR7K-DSt',
          production: 'AXCXmkfjUH1b_HZw2v59Idc2NQ39Kl0a88cOedhfwbCXsjuvmeZ3DV5V2chP3oR8a26wVyIm4C8M1jGP'
        }
      }
    },
    computed: {
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            totalPrice += (item.productNum * item.salePrice)
          }
        })
        return totalPrice
      }
    },
    methods: {
      checkValid () {
        if (this.nickName !== '' && this.money !== '' && this.isMoney(this.money) && this.email !== '' && this.isEmail(this.email)) {
          this.submit = true
        } else {
          this.submit = false
        }
      },
      messageFail (m) {
        this.$message.error({
          message: m
        })
      },
      changeSelect (v) {
        if (v !== 'custom') {
          this.money = v
        } else {
          this.isCustom = true
          this.money = ''
        }
        this.checkValid()
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      _getOrderDet (orderId) {
        let params = {
          params: {
            orderId: this.orderId
          }
        }
        getOrderDet(params).then(res => {
          this.cartList = res.result.goodsList
          this.userName = res.result.addressInfo.userName
          this.tel = res.result.addressInfo.tel
          this.countryName = res.result.addressInfo.countryName
          this.streetName = res.result.addressInfo.streetName
          this.email = res.result.addressInfo.email
          this.orderTotal = res.result.orderTotal
        })
      },
      paySucTest () {
        this.$router.push({path: '/order/paysuccess', query: {price: this.orderTotal}})
      },
      paySuc () {
        this.payNow = '支付中...'
        this.submit = false
        if (this.payType === 1) {
          this.type = 'alipay'
        } else if (this.payType === 2) {
          this.type = 'wechat_pay'
        } else {
          this.type = '其它'
        }
        this.info = this.cartList[0].title
        var payType = this.payType
        payMent({
          nickName: this.nickName,
          // money: this.money,
          money: 0.1,
          info: this.info,
          orderId: this.orderId,
          payType: this.type
        }).then(res => {
          if (res.success === true) {
            setStore('payNum', res.result)
            setStore('setTime', 90)
            setStore('price', this.money)
            if (payType === 1) {
              const div = document.createElement('div')
              div.innerHTML = res.result
              document.body.appendChild(div)
              document.forms[0].submit()
              // this.$router.push({path: '/order/alipay'})
            } else if (payType === 2) {
              this.$router.push({path: '/order/wechat'})
            } else {
              this.$router.push({path: '/order/alipay'})
            }
          } else {
            this.payNow = '立刻支付'
            this.submit = true
            this.messageFail(res.message)
          }
        })
      },
      isMoney (v) {
        if (v < 0.1) {
          return false
        }
        var regu = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var re = new RegExp(regu)
        if (re.test(v)) {
          return true
        } else {
          return false
        }
      },
      isEmail (v) {
        var regu = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        var re = new RegExp(regu)
        if (re.test(v)) {
          return true
        } else {
          return false
        }
      }
    },
    created () {
      this.userId = getStore('userId')
      this.orderId = this.$route.query.orderId
      this.expressFee = this.$route.query.expressFee
      if (this.orderId) {
        this._getOrderDet(this.orderId)
      } else {
        this.$router.push({path: '/'})
      }
    },
    components: {
      YShelf,
      YButton,
      PayPal
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .w {
    padding-top: 39px;
  }

  .order-info {
    padding: 60px 0 55px;
    color: #333;
    background: #fff !important;
    h3 {
      padding-bottom: 14px;
      line-height: 36px;
      text-align: center;
      font-size: 36px;
      color: #212121;
    }
    .payment-detail {
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #999;
    }
  }

  /*支付类型*/
  .pay-type {
    margin: 0 auto;
    width: 90%;
    padding-bottom: 30px;
    .p-title {
      font-size: 18px;
      line-height: 40px;
      padding: 0 10px;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #ccc;
      }
    }

  }

  .pay-type {
    .pay-item {
      display: flex;
      align-items: center;
      div {
        margin-top: 20px;
        width: 175px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        //border-radius: 6px;
        margin-right: 10px;
        background: #FAFAFA;
        &.active {
          border-color: #6A8FE5;
          background: #fff;
        }
        img {
          display: block;
          height: 34px;
          margin: 8px auto;
        }
      }
    }
  }

  .box-inner {
    line-height: 60px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
    em {
      margin-left: 5px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
      margin-right: 20px;
      span {
        margin-right: 4px;
        font-size: 16px;

      }
    }
  }

  .confirm-detail {
    padding: 0 30px 25px;
    border-top: 1px solid #d5d5d5;
    .info-title {
      height: 14px;
      margin: 30px 0 17px;
      line-height: 14px;
      font-weight: bolder;
      color: #333;
    }
    .info-detail {
      line-height: 24px;
      color: #666;
    }
  }

  .confirm-table-title {
    padding: 3px 0 0 33px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 175px;
      text-align: left;
    }
    .price {
      padding-left: 80px;
    }
    .color {
      padding-left: 80px;
    }
    .size {
      padding-left: 80px;
    }
    .num {
      padding-left: 75px;
    }
    .subtotal {
      padding-left: 72px;
    }
  }

  .confirm-goods-table {
    border-top: 1px solid #D5D5D5;
    .cart-items {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        color: #333;
      }
    }
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 175px;
        text-align: center;
      }
    }
  }

  .order-discount-line {
    padding: 22px 30px 53px;
    border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .name {
    width: 40%;
  }

  .name-cell {
    padding-left: 33px;
  }

  .input {
    width:30%;
    margin:0 0 1vw 38px;
  }

  .pay-info {
    margin-top: -2vw;
    text-align: center;
  }

  .money-select {
    width: 31%;
    padding-left: 10px;
    margin-bottom: 1vw;
  }

</style>
