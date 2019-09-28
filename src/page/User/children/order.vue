<template>
  <div>
    <y-shelf :title="$t('common.my_order')">
      <div slot="content">
        <div v-loading="loading" :element-loading-text="$t('goods.loading')" v-if="orderList.length" style="min-height: 10vw;">
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createDate"></span>
                  <span class="order-id"> {{$t("order.ticket_number")}}： <a @click="orderDetail(item.orderId)">{{item.orderId}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">{{$t("cart.price")}}</span>
                  <span class="num">{{$t("cart.count")}}</span>
                  <span class="operation">{{$t("cart.operation")}}</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">{{$t("cart.total_number")}}</span>
                <span class="order-detail"> <a @click="orderDetail(item.orderId)">{{$t("common.view_details")}} ><em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in item.goodsList" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box"><a @click="goodsDetails(good.productId)"><img :src="good.productImg" alt=""></a></div>
                    <div class="ellipsis"><a style="color: #626262;" @click="goodsDetails(good.productId)">{{good.productName}}</a></div>
                  </div>
                  <div class="cart-l-r">
                    <div>{{$t("cart.cash_symbol")}} {{Number(good.salePrice).toFixed(2)}}</div>
                    <div class="num">{{good.productNum}}</div>
                    <div class="type">
                      <el-button style="margin-left:20px" @click="_delOrder(item.orderId,i)" type="danger" size="small" v-if="j<1" class="del-order">{{$t("common.delete")}}</el-button>
                      <!-- <a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a> -->
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">{{$t("cart.cash_symbol")}} {{item.orderTotal}}</div>
                <div v-if="item.orderStatus === '0'">
                  <el-button @click="orderPayment(item.orderId)" type="primary" size="small">{{$t("payment.pay_now")}}</el-button>
                </div>
                <div class="status" v-if="item.orderStatus !== '0'"> {{getOrderStatus(item.orderStatus)}}  </div>
              </div>
            </div>
          </div>
        </div>
        <div v-loading="loading" :element-loading-text="$t('goods.loading')" class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">
            {{$t("order.no_order")}}
          </div>
        </div>
      </div>
    </y-shelf>
    <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { orderList, delOrder } from '/api/goods'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: '',
        loading: true,
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      orderPayment (orderId) {
        window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      orderDetail (orderId) {
        this.$router.push({
          path: 'orderDetail',
          query: {
            orderId: orderId
          }
        })
      },
      getOrderStatus (status) {
        if (status === '1') {
          return this.$t('order.payment_under_review')
        } else if (status === '2') {
          return this.$t('order.packaging')
        } else if (status === '3') {
          return this.$t('order.shipped')
        } else if (status === '4') {
          return this.$t('order.order_completed')
        } else if (status === '5') {
          return this.$t('order.order_closed')
        } else if (status === '6') {
          return this.$t('order.payment_failed')
        }
      },
      _orderList () {
        let params = {
          params: {
            userId: this.userId,
            size: this.pageSize,
            page: this.currentPage
          }
        }
        orderList(params).then(res => {
          this.orderList = res.result.data
          this.total = res.result.total
          this.loading = false
        })
      },
      _delOrder (orderId, i) {
        let params = {
          params: {
            orderId: orderId
          }
        }
        delOrder(params).then(res => {
          if (res.success === true) {
            this.orderList.splice(i, 1)
          } else {
            this.message(this.$t('common.delete_failed_msg'))
          }
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      this._orderList()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 25px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
