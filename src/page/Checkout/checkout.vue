<template>
  <div class="checkout">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w" style="padding-top: 40px;">
      <!-- 收货地址 -->
      <y-shelf :title="$t('checkout.address_info')">
        <div slot="content">
          <ul class="address-item-list clearfix">
            <li v-for="(item,i) in addList"
                :key="i"
                class="address pr"
                :class="{checked:addressId === item.addressId}"
                @click="chooseAddress(item.addressId, item.userName, item.tel, item.countryId, item.countryName, item.streetName, item.email)">
           <span v-if="addressId === item.addressId" class="pa">
             <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
             <path
               d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
               fill="#6A8FE5" p-id="1025">
               </path>
             </svg>
             </span>
              <p>{{$t("checkout.user_name")}}: {{item.userName}} {{item.isDefault ? $t("checkout.default_address") : ''}}</p>
              <p class="street-name ellipsis">{{$t("checkout.address_info")}}: {{item.countryName}}, {{item.streetName}}</p>
              <p>{{$t("checkout.email")}}: {{item.email}}</p>
              <p>{{$t("checkout.phone_num")}}: {{item.tel}}</p>
              <div class="operation-section">
                <span class="update-btn" style="font-size:12px" @click="update(item)">{{$t("checkout.modify")}}</span>
                <span class="delete-btn" style="font-size:12px" :data-id="item.addressId" @click="del(item.addressId)">{{$t("checkout.delete")}}</span>
              </div>
            </li>

            <li class="add-address-item" @click="update()">
              <img src="../../../static/svg/jia.svg" alt="">
              <p>{{$t("checkout.use_new_address")}}</p>
            </li>
          </ul>
        </div>
      </y-shelf>
      <!-- 购物清单 -->
      <y-shelf :title="$t('cart.shopping_list')">
        <div slot="content">
          <div class="box-inner ui-cart">
            <div>
              <!--标题-->
              <div class="cart-table-title">
                <span class="name">{{$t("cart.product_info")}}</span>
                <span class="subtotal">{{$t("cart.sum")}}</span>
                <span class="num">{{$t("cart.count")}}</span>
                <span class="price">{{$t("cart.price")}}</span>
                <span class="size">{{$t("goods.size")}}</span>
                <span class="color">{{$t("goods.color")}}</span>

              </div>
              <!--列表-->
              <div class="cart-table" v-for="(item,i) in cartList" :key="i" v-if="item.checked === '1'">
                <div class="cart-group divide pr" :data-productid="item.productId">
                  <div class="cart-top-items">
                    <div class="cart-items clearfix">
                      <!--图片-->
                      <div class="items-thumb fl">
                        <img :alt="item.productName"
                             :src="item.productImg">
                        <a @click="goodsDetails(item.productId)" :title="item.productName" target="_blank"></a>
                      </div>
                      <!--信息-->
                      <div class="name hide-row fl" style="width: 615px !important;">
                        <div class="name-table" style="width: 375px">
                          <a @click="goodsDetails(item.productId)" :title="item.productName" target="_blank"
                             v-text="item.productName"></a>
                          <!-- <ul class="attribute">
                            <li>白色</li>
                          </ul> -->
                        </div>
                        <div class="size">{{item.sizeDesc}}</div>
                        <div class="color">{{item.color}}</div>
                      </div>
                      <!--商品数量-->
                      <div>
                        <!--总价格-->
                        <div class="subtotal" style="font-size: 14px">{{$t("cart.cash_symbol")}} {{item.salePrice * item.buyNum}}</div>
                        <!--数量-->
                        <div class="item-cols-num">
                          <span v-text="item.buyNum"></span>
                        </div>
                        <!--价格-->
                        <div class="price">{{$t("cart.cash_symbol")}} {{item.salePrice}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 合计 -->
            <div class="cart-bottom-bg fix-bottom">
              <div class="fix-bottom-inner" style="float: left; width: 100%">
                <div style="display: flex;align-items: center;float: left;width: 30%">
                  <span style="width: 100px;">{{$t("checkout.express_fee")}}</span>
                  <h4 ><em>{{$t("cart.cash_symbol")}}{{checkExpressPrice}}</em></h4>
                </div>
                <div class="shipping" style="float: right;width: 70%">
                  <div class="shipping-box" style="padding-right:20px;width:85%; text-align: right">

                    <div class="shipping-total shipping-price"><h4
                      class="highlight">{{$t("cart.total_price")}}：<em>{{$t("cart.cash_symbol")}}{{checkPrice}}</em>
                    </h4>
                    </div>
                  </div>
                  <y-button class="big-main-btn"
                            :classStyle="submit?'disabled-btn':'main-btn'"
                            style="margin: 0;width: 130px;height: 50px;line-height: 50px;font-size: 16px; width: 15%"
                            :text="submitOrder"
                            @btnClick="_submitOrder" >
                  </y-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </y-shelf>

      <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
        <div slot="content" class="md" :data-id="msg.addressId">
          <div>
            <input type="text" :placeholder="$t('checkout.user_name')" v-model="msg.userName">
          </div>
          <div>
            <input type="number" :placeholder="$t('checkout.phone_num')" v-model="msg.tel">
          </div>
          <div>
            <el-select v-model="msg.countryName" @change="selectCountry()" style="width: 385px">
              <el-option v-for="country in countries" :key="country.countryName" :lable="country.countryName" :value="country.countryName">{{country.countryName}}</el-option>
            </el-select>
          </div>
          <div>
            <input type="text" :placeholder="$t('checkout.address')" v-model="msg.streetName">
          </div>
          <div>
            <input type="text" :placeholder="$t('checkout.email')" v-model="msg.email">
          </div>
          <div>
            <el-checkbox class="auto-login" v-model="msg.isDefault">{{$t("checkout.default_address")}}</el-checkbox>
          </div>
          <y-button :text="$t('checkout.save')"
                    class="btn"
                    :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                    @btnClick="save({userId:userId,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,email:msg.email,isDefault:msg.isDefault,countryId:msg.countryId})">
          </y-button>
        </div>
      </y-popup>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import { getCartList, addressList, addressUpdate, addressAdd, addressDel, productDet, submitOrder, orderMinPrice, getAllExpressFees, getAllCountries } from '/api/goods'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YHeader from '/common/header'
  import YFooter from '/common/footer'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        cartList: [],
        addList: [],
        addressId: '0',
        popupOpen: false,
        popupTitle: this.$t('checkout.address_management'),
        num: '', // 立刻购买
        productId: '',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          countryId: '',
          countryName: '',
          streetName: '',
          email: '',
          isDefault: false
        },
        userName: '',
        tel: '',
        countryId: '',
        countryName: '',
        streetName: '',
        email: '',
        userId: '',
        orderTotal: 0,
        submit: false,
        submitOrder: this.$t('checkout.submit_order'),
        minOrderPrice: 0,
        expressFees: [],
        expressPriceTotal: 0,
        countries: [],
        currentColor: '',
        availableSizeItem: []
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.countryName && msg.streetName && msg.email
      },
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            totalPrice += (item.buyNum * item.salePrice)
          }
        })
        this.orderTotal = (totalPrice + parseFloat(this.expressPriceTotal)).toFixed(4)
        return this.orderTotal
      },
      checkExpressPrice () {
        let totalPrice = 0
        let countryId = 0
        let expressPrice = 0
        this.addList.forEach(address => {
          if (this.addressId === address.addressId) {
            countryId = address.countryId
          }
        })
        this.expressFees.forEach(expressFee => {
          if (countryId === expressFee.countryId) {
            expressPrice = expressFee.price
          }
        })
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            totalPrice += (item.weight * item.buyNum * expressPrice)
          }
        })
        this.expressPriceTotal = totalPrice.toFixed(4)
        return this.expressPriceTotal
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      _getCartList () {
        getCartList({userId: this.userId}).then(res => {
          this.cartList = res.result
          this._getItemPriceList()
        })
      },
      _getItemPriceList () {

      },
      _addressList () {
        addressList({userId: this.userId}).then(res => {
          let data = res.result
          if (data.length) {
            this.addList = data
            this.addressId = data[0].addressId || '1'
            this.userName = data[0].userName
            this.tel = data[0].tel
            this.countryId = data[0].countryId
            this.countryName = data[0].countryName
            this.streetName = data[0].streetName
            this.email = data[0].email
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          this._addressList()
        })
      },
      _addressAdd (params) {
        addressAdd(params).then(res => {
          if (res.success === true) {
            this._addressList()
          } else {
            this.message(res.message)
          }
        })
      },
      _addressDel (params) {
        addressDel(params).then(res => {
          this._addressList()
        })
      },
      _getAllExpressFees (params) {
        getAllExpressFees(params).then(res => {
          if (res.success === true) {
            this.expressFees = res.result
          } else {
            this.expressFees = []
          }
        })
      },
      _getAllCountries (params) {
        getAllCountries(params).then(res => {
          if (res.success === true) {
            this.countries = res.result
          } else {
            this.countries = []
          }
        })
      },
      // 提交订单后跳转付款页面
      _submitOrder () {
        this.submitOrder = this.$t('checkout.order_submitting')
        this.submit = true
        var array = []
        if (this.addressId === '0') {
          this.message(this.$t('checkout.select_address'))
          this.submitOrder = this.$t('checkout.submit_order')
          this.submit = false
          return
        }
        if (this.cartList.length === 0) {
          this.message(this.$t('checkout.invalid_operation'))
          this.submitOrder = this.$t('checkout.submit_order')
          this.submit = false
          return
        }
        if (this.orderTotal < this.minOrderPrice) {
          this.message(this.$t('checkout.min_order_price') + this.minOrderPrice)
          this.submitOrder = this.$t('checkout.submit_order')
          this.submit = false
          return
        }
        for (var i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked === '1') {
            array.push(this.cartList[i])
          }
        }
        let params = {
          userId: this.userId,
          tel: this.tel,
          userName: this.userName,
          countryId: this.countryId,
          countryName: this.countryName,
          streetName: this.streetName,
          email: this.email,
          goodsList: array,
          orderTotal: this.orderTotal,
          expressFee: this.expressPriceTotal
        }
        submitOrder(params).then(res => {
          if (res.success === true) {
            this.payment(res.result)
          } else {
            this.message(res.message)
            this.submitOrder = '提交订单'
            this.submit = false
          }
        })
      },
      orderMinPrice () {
        let params = {
          params: {

          }
        }
        orderMinPrice(params).then(res => {
          if (res.success === true) {
            this.minOrderPrice = res.result
          }
        })
      },
      // 付款
      payment (orderId) {
        // 需要拿到地址id
        this.$router.push({
          path: '/order/payment',
          query: {
            'orderId': orderId,
            'expressFee': this.expressPriceTotal
          }
        })
      },
      // 选择地址
      chooseAddress (addressId, userName, tel, countryId, countryName, streetName, email) {
        this.addressId = addressId
        this.userName = userName
        this.tel = tel
        this.countryId = countryId
        this.countryName = countryName
        this.streetName = streetName
        this.email = email
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = this.$t('checkout.address_management')
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.countryId = item.countryId
          this.msg.countryName = item.countryName
          this.msg.streetName = item.streetName
          this.msg.email = item.email
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = this.$t('checkout.add_new_address')
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.countryId = ''
          this.msg.countryName = ''
          this.msg.streetName = ''
          this.msg.email = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
      // 保存
      save (p) {
        this.popupOpen = false
        if (p.addressId) {
          this._addressUpdate(p)
        } else {
          delete p.addressId
          this._addressAdd(p)
        }
      },
      // 删除
      del (addressId) {
        this._addressDel({addressId})
      },
      selectCountry () {
        for (let i = 0; i < this.countries.length; i++) {
          if (this.msg.countryName === this.countries[i].countryName) {
            this.msg.countryId = this.countries[i].id
          }
        }
      },
      _productDet (productId) {
        productDet({params: {productId}}).then(res => {
          let item = res.result
          item.checked = '1'
          item.productImg = item.productImageBig
          item.buyNum = this.num
          let finalPrice = item.salePrice
          if (item.itemPrices) {
            item.itemPrices.forEach(itemPrice => {
              if (item.buyNum >= itemPrice.minNum && (itemPrice.maxNum === 0 || item.buyNum <= itemPrice.maxNum)) {
                finalPrice = itemPrice.price
              }
            })
          }
          item.productPrice = finalPrice
          item.salePrice = finalPrice
          this.cartList.push(item)
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      let query = this.$route.query
      if (query.productId && query.num) {
        this.productId = query.productId
        this.num = query.num
        this.currentColor = query.color
        this.availableSizeItem = query.availableSizeItem
        this._productDet(this.productId)
      } else {
        this._getCartList()
      }
      this._addressList()
      this.orderMinPrice()
      this._getAllExpressFees()
    },
    mounted () {
      this._getAllCountries()
    },
    components: {
      YShelf,
      YButton,
      YPopup,
      YHeader,
      YFooter
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  // 收货地址
  .address-item-list {
    padding: 30px 13px 0;
    .address {
      padding: 19px 14px 0 19px;
      p {
        line-height: 26px;
      }
    }
    li.checked {
      border-color: #6A8FE5;
      position: relative;
      background: #fff;
      .pa {
        right: 15px;
        top: 18px;
      }
      &:hover {
        background: #fff;
      }
    }
    li {
      position: relative;
      overflow: hidden;
      float: left;
      width: 276px;
      height: 158px;
      margin: 0 0 30px 16px;
      border: 1px solid #E5E5E5;
      //border-radius: 3px;
      background: #FAFAFA;
      line-height: 14px;
      text-align: left;
      word-wrap: break-word;
      word-break: normal;
      color: #626262;
      cursor: pointer;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
      &:hover {
        background: #F2F2F2;
        .operation-section {
          visibility: visible;
          transform: translate(0, 0);
        }
      }
      &.add-address-item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          margin-top: 5px;
        }
      }
      .operation-section {
        visibility: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 28px;
        background: #E1E1E1;
        border-top: 1px solid #E1E1E1;
        transition: all .2s ease;
        transform: translate(0, 29px);
        border-top: 1px solid #E1E1E1;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 11;
        span {
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          &:hover {
            background: #F2F2F2;
          }
        }

        span + span {
          border-left: 1px solid #E1E1E1;
        }

      }
    }
  }

  .s-content {
    .md {
      > div {
        text-align: left;
        margin-bottom: 15px;
        > input {
          width: 100%;
          height: 50px;
          font-size: 18px;
          padding: 10px 20px;
          border: 1px solid #ccc;
          //border-radius: 6px;
          box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
          line-height: 46px;
        }
      }
    }

    .btn {
      margin: 0;
      width: 100%;
      height: 50px;
      font-size: 14px;
      line-height: 48px
    }
  }

  .ui-cart {
    img {
      width: 80px;
      height: 80px;
    }

    .cart-table-title {
      position: relative;
      z-index: 1;
      line-height: 38px;
      height: 38px;
      padding: 0 0 0 30px;
      font-size: 12px;
      background: #eee;
      border-bottom: 1px solid #dbdbdb;
      border-bottom-color: rgba(0, 0, 0, .08);
      .name {
        float: left;
        text-align: left;
      }
      span {
        width: 137px;
        float: right;
        text-align: center;
        color: #838383;
      }
    }
    .cart-group.divide {
      .cart-items {
        border-top: 1px dashed #eee;
      }
    }
    .cart-items {
      position: relative;
      //height: 140px;
      margin-left: 74px;
      .subtotal {
        font-weight: 700;
      }
      .item-cols-num,
      .price,
      .subtotal {
        overflow: hidden;
        float: right;
        width: 137px;
        text-align: center;
        color: #666;
        line-height: 140px;
      }
      .color {
        overflow: hidden;
        float: right;
        width: 100px;
        text-align: center;
        color: #666;
        line-height: 140px;
        padding-right: 77px;
      }
      .size {
        overflow: hidden;
        float: right;
        width: 100px;
        text-align: center;
        color: #666;
        line-height: 140px;
      }
      /*数量*/
      .subtotal,
      .item-cols-num {
        padding-top: 50px;
        line-height: 40px;
      }
      .select {
        width: 112px;
        height: 40px;
        padding-top: 4px;
        margin: 0 auto;
        line-height: 40px;
        .down {
          background-position: 0 -60px;
        }
        .down.down-disabled:hover {
          background-position: 0 -300px;
          cursor: not-allowed;
        }
        .num {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 36px;
          height: 18px;
          margin: 7px 0 0;
          border: none;
          //border-radius: 3px;
          line-height: 18px;
          text-align: center;
          font-size: 14px;
          transition: all .2s ease-out;
        }
      }

    }
    .down.down-disabled {
      background-position: 0 -300px;
      cursor: not-allowed;
    }
  }

  .cart-group.divide .cart-top-items:first-child .cart-items {
    border-top: none;
  }

  .items-choose {
    position: absolute;
    left: -74px;
    top: 0;
    width: 74px;
    height: 20px;
    padding: 60px 0 0 31px;
    font-size: 12px;
    color: #999;
  }

  .items-thumb {
    position: relative;
    margin-top: 30px;
    overflow: hidden;
    width: 80px;
    height: 80px;
  }

  .cart-items .items-thumb > a, .ui-cart .cart-items .items-thumb > i {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid #fff;
    //border-radius: 3px;
    border: 0 solid rgba(255, 255, 255, .1);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
  }

  .name {
    width: 380px;
    margin-left: 20px;
    color: #323232;
    display: table;
    a {
      color: #333;
      font-size: 16px;
    }
  }

  .name-table {
    display: table-cell;
    vertical-align: middle;
    height: 140px;
  }

  .fix-bottom {
    padding: 22px 29px 19px 30px;
    height: 90px;
    width: 100%;
    z-index: 1;
    background-position: center;
    background: #fdfdfd;
    background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
    background: linear-gradient(#fdfdfd, #f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0, 0, 0, .04);
    .cart-bottom-bg {
      height: 80px;
      border-top: 1px solid #D9D9D9;
      //border-radius: 0 0 8px 8px;
    }
    .fix-bottom-inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .shipping {
      display: flex;
      align-items: center;
    }
    em {
      display: inline-block;
      position: relative;
      top: 3px;
      margin-top: -4px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
    }
  }

  .attribute, .name p {
    color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 17px;
  }


</style>
