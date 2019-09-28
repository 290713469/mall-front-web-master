<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.productName">
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big" :alt="product.productName">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.productName}}</h4>
          <h6>
            <span>{{product.subTitle}}</span>
            <!--<span class="price">
              <em style="font-size: 21px">{{$t("cart.cash_symbol")}}</em><i>{{product.salePrice.toFixed(2)}}</i></span>-->
          </h6>
        </div>
        <div v-if="hasRangePrice" style="padding: 10px 0 8px 10px;">
          <div v-for="price in product.itemPrices" style="display: inline-block; float: left">
            <div style="float: left; width: 140px; height: 50px; padding-left: 10px; border: 1px solid #999999; text-align: left">
              <div style="padding-top: 5px">
                <span style="font-weight: bold">US$ {{price.price}}</span>
              </div>
              <div style="padding-top: 5px;">
                <span>{{price.priceRange}} Pieces</span>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div style="padding: 29px 0 8px 10px;">
          <!--<span style="font-weight: bold">{{$t("goods.color")}}:</span>-->
          <span v-for="color in product.itemColors" >
            <a :title="color.colorDesc" @click.stop.prevent="changeColor(color.colorDesc)" >
              <img :src="color.colorImg" v-if="currentColor === color.colorDesc" style="width: 50px; height:50px; border: 1px solid #c81623"/>
              <img :src="color.colorImg" v-if="currentColor !== color.colorDesc" style="width: 50px; height:50px;"/>
            </a>
          </span>
        </div>
        <br/>
        <div id="priceDiv" style="padding: 10px 0 8px 10px;">
          <table>
            <thead>
              <tr>
                <th style="width:50px; text-align: left; font-size: 12px" v-if="hasSize">
                  {{$t("goods.size")}}
                </th>
                <th style="width:100px; text-align: left; font-size: 12px">
                  {{$t("goods.price")}}({{$t("cart.cash_symbol")}})
                </th>
                <th style="width:150px; text-align: left; font-size: 12px">
                  {{$t("goods.remain_number")}}
                </th>
                <th style="width:150px; text-align: left; font-size: 12px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(size, index) in availableSizeItem">
                <td style="width:50px; text-align: left" v-if="hasSize">{{size.sizeDesc}}</td>
                <td style="width:100px; text-align: left">{{product.salePrice.toFixed(2)}}</td>
                <td style="width:150px; text-align: left">{{size.inventoryNum}}</td>
                <td style="width:150px; text-align: left"><buy-num :index="index" :num="size.buyNum" :itemSize="size.sizeDesc" @edit-num="editNum" :limit="Number(size.inventoryNum)"></buy-num></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="padding-left: 200px">
          <a @click.stop.prevent="showPrice ? hidePrices() : showPrices()"><span :class="showPrice ? 'arrow-top' : 'arrow-bottom'"></span></a>
        </div>
        <div class="item-detail">
            <div style="width: 50%;padding-top:10px">
              <ul>
                <li>
                  <span class="small-params-name">{{$t('goods.min_number')}}:</span>
                  <span style="text-align: left; font-size:12px">{{product.minNum}}</span>
                </li>
                <li>
                  <span class="small-params-name">{{$t('goods.sale_number')}}:</span>
                  <span style="text-align: left; font-size:12px">{{product.defaultSellNum}}</span>
                </li>
              </ul>
            </div>
          <div style="width: 50%">
          </div>
        </div>
        <div class="buy">
          <y-button :text="$t('common.add_to_cart')"
                    @btnClick="addCart(product.productId,product.salePrice,product.productName,product.productImageBig,product.weight)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
          <y-button :text="$t('checkout.submit_order')"
                    @btnClick="checkout(product.productId)"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf :title="$t('cart.product_info')">
        <div slot="content">
          <div class="img-item" v-if="productMsg">
            <div v-html="productMsg">{{ productMsg }}</div>
          </div>
          <div class="no-info" v-else>
            <img src="/static/images/no-data.png">
            <br>
            {{$t("goods.no_info")}}
          </div>
        </div>
      </y-shelf>
    </div>

  </div>

</template>
<script>
  import { productDet, addCart } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '/components/shelf'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        productMsg: {},
        small: [],
        big: '',
        product: {
          salePrice: 0
        },
        productNum: 1,
        userId: '',
        currentColor: '',
        availableSizeItem: [],
        popupOpen: false,
        popupTitle: this.$t('goods.price_details'),
        itemPrices: [],
        hasSize: true,
        hasRangePrice: true,
        showPrice: true,
        tempAvailableSizeItem: []
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      _productDet (productId) {
        productDet({params: {productId}}).then(res => {
          let result = res.result
          this.product = result
          this.productMsg = result.detail || ''
          this.small = result.productImageSmall
          this.big = this.small[0]
          if (result.itemColors.length > 0) {
            this.changeColor(result.itemColors[0].colorDesc)
          } else {
            this.initSizeItem()
          }
          this.hasRangePrice = this.product.itemPrices.length > 0
        })
      },
      message (m) {
        this.$message.error({
          message: m
        })
      },
      hidePrices () {
        this.tempAvailableSizeItem = this.availableSizeItem
        this.availableSizeItem = []
        this.showPrice = false
      },
      showPrices () {
        this.availableSizeItem = this.tempAvailableSizeItem
        this.showPrice = true
      },
      addCart (id, price, name, img, weight) {
        if (!this.showMoveImg) {     // 动画是否在运动
          let finalPrice = 0
          let addCartItem = []
          let totalNum = 0
          this.availableSizeItem.forEach(availableItem => {
            let num = availableItem.buyNum
            totalNum += availableItem.buyNum
            if (num > 0) {
              let price = this.getPrice(num)
              if (price === 0) {
                price = this.product.salePrice
              }
              finalPrice += price * num
              availableItem.salePrice = price
              addCartItem.push(availableItem)
            }
          })
          if (totalNum < this.product.minNum) {
            this.message(this.$t('the quantity must be grater than ' + this.product.minNum))
            return false
          }

          if (this.login) { // 登录了 直接存在用户名下
            addCart({
              userId: this.userId,
              productId: id,
              productNum: this.productNum,
              weight: this.weight,
              color: this.currentColor,
              availableSizeItem: addCartItem
            }).then(res => {
              // 并不重新请求数据
              this.ADD_CART({
                productId: id,
                salePrice: finalPrice,
                productName: name,
                productImg: img,
                productNum: this.productNum,
                weight: weight,
                color: this.currentColor,
                availableSizeItem: addCartItem
              })
            })
          } else { // 未登录 vuex
            this.$router.push({path: '/login'})
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      },
      getPrice (num) {
        let price = 0
        for (let ind = 0; ind < this.product.itemPrices.length; ind++) {
          let itemPrice = this.product.itemPrices[ind]
          if (num >= itemPrice.minNum && (itemPrice.maxNum === 0 || num <= itemPrice.maxNum)) {
            price = itemPrice.price
            break
          }
        }
        return price
      },
      checkout (productId) {
        let addCartItem = []
        this.availableSizeItem.forEach(availableItem => {
          let num = availableItem.buyNum
          if (num > 0) {
            let price = this.getPrice(num)
            if (price === 0) {
              price = this.product.salePrice
            }
            availableItem.salePrice = price
            addCartItem.push(availableItem)
          }
        })
        this.$router.push({
          path: '/checkout',
          query: {productId, num: this.productNum, color: this.currentColor, availableSizeItem: addCartItem}
        })
      },
      editNum (num, index, itemSize) {
        this.availableSizeItem[index].buyNum = num
        this.availableSizeItem[index].itemSize = itemSize
        this.productNum = num
      },
      initSizeItem () {
        let tempItemSizes = []
        this.availableSizeItem = []
        if (this.product.itemSizes.length > 0) {
          this.product.itemSizes.forEach(size => {
            let inventoryNum = this.calculateInventoryNumber(size.sizeDesc)
            tempItemSizes.push({
              sizeDesc: size.sizeDesc,
              price: this.product.salePrice.toFixed(2),
              inventoryNum: inventoryNum === 0 ? this.product.remainNum : inventoryNum,
              buyNum: 0
            })
          })
          this.hasSize = true
        } else {
          tempItemSizes.push({
            sizeDesc: '',
            price: this.product.salePrice.toFixed(2),
            inventoryNum: this.product.remainNum,
            buyNum: 0
          })
          this.hasSize = false
        }
        this.availableSizeItem = tempItemSizes
      },
      changeColor (color) {
        this.currentColor = color
        this.initSizeItem()
      },
      calculateInventoryNumber (sizeDesc) {
        let color = this.currentColor
        let tempInventoryNum = 0
        this.product.itemInventoryNums.forEach(inventoryNum => {
          if (inventoryNum.itemColor === color && (inventoryNum.itemSize === sizeDesc)) {
            tempInventoryNum = inventoryNum.inventoryNum
          }
        })
        return tempInventoryNum
      }
    },
    components: {
      YShelf, BuyNum, YButton, YPopup
    },
    created () {
      let id = this.$route.query.productId
      this._productDet(id)
      this.userId = getStore('userId')
      this.popupOpen = false
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            //border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 450px;
      margin-left: 10px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }

      .small-params-name {
        padding-right: 20px;
        font-size: 13px;
        font-weight: bold;
        color: #8d8d8d;
        line-height: 20px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-detail {
    padding: 10px 0 8px 10px;
    border-top: 1px solid #ebebeb;
    display: flex;
    align-items: flex-start;
  }
  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
  div {
    vertical-align: top !important;
  }

  .arrow-top {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 7px solid #4a4a4a;
    font-size: 0;
    line-height: 0;
  }
  .arrow-bottom {
    width: 0;
    height: 0;
    border-left: 4px solid transparent; /* 左边框的宽 */
    border-right: 4px solid transparent; /* 右边框的宽 */
    border-top: 7px solid #4a4a4a; /* 下边框的长度|高,以及背景色 */
    font-size: 0;
    line-height: 0;
  }
</style>
