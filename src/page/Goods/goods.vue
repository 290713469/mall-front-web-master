<template>
  <div class="goods">
    <div class="nav">
	  <div class="w menuDiv" style="align-items: flex-start !important;">
      <li v-for="category in goodsCategory" style="line-height: 20px; ">
        <a href="javascript:;" :class="{active:sortType===1}" @click="getAllGoodsByParentCategory(category.id)" ><span style="color: #000;">{{category.name}}</span></a>
        <ul  style="line-height: 20px">
          <li v-for="(subCat) in category.subCategorys" style="line-height: 30px; ">
            <span><a href="javascript:;" :class="{active:sortType===1}" @click="getAllGoodsByParentCategory(subCat.id)" ><span style="color: #000;">{{subCat.name}}</span></a></span>
          </li>
        </ul>
      </li>
    </div>


      <div class="w" >
        <!--<a href="javascript:;"  @click="reset()">综合排序</a>-->
        <a href="javascript:;" @click="sortByPrice(1)" >{{$t('goods.order_price_asc')}}</a>
        <a href="javascript:;" @click="sortByPrice(-1)" >{{$t('goods.order_price_desc')}}</a>
        <div class="price-interval">
          <input type="number" class="input" :placeholder="$t('goods.price')" v-model="min">
          <span style="margin: 0 5px"> - </span>
          <input type="number" :placeholder="$t('goods.price')" v-model="max">
          <y-button :text="$t('goods.submit_button')" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div>
      </div>
    </div>

    <div v-loading="loading" :element-loading-text="$t('goods.loading')" style="min-height: 35vw;padding-top: 50px;">
      <div class="img-item" v-if="!noResult" >
        <!--商品-->
        <div class="goods-box w">
          <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
        </div>

        <el-pagination
          v-if="!noResult&&!error"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br> {{$t('goods.no_results')}}
        </div>
        <!--<section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>-->
      </div>
      <div class="no-info" v-if="error">
        <div class="no-data">
          <img src="/static/images/error.png">
          <br> {{$t('goods.error')}}
        </div>
        <!--<section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { getAllGoods, getItemCategoryByParentType, getAllGoodsByParentCategory } from '/api/goods.js'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        goods: [],
        goodsCategory: [],
        noResult: false,
        error: false,
        min: '',
        max: '',
        loading: true,
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        recommendPanel: [],
        sort: '',
        currentPage: 1,
        total: 0,
        pageSize: 20
      }
    },
    methods: {

      handleSizeChange (val) {
        this.pageSize = val
        this.getAllGoodsByParentCategory(this.$route.query.cid)
        this.loading = true
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getAllGoodsByParentCategory(this.$route.query.cid)
        this.loading = true
      },
      getItemCategoryByParentType () {
        let cid = this.$route.query.cid
        let params = {
          params: {
            id: cid
          }
        }
        getItemCategoryByParentType(params).then(res => {
          if (res.success === true) {
            this.goodsCategory = res.result
            this.error = false
          } else {
            this.error = true
          }
        })
      },
      getAllGoodsByParentCategory (cid) {
        this.goods = []
        if (this.min !== '') {
          this.min = Math.floor(this.min)
        }
        if (this.max !== '') {
          this.max = Math.floor(this.max)
        }
        let params = {
          params: {
            category: cid,
            page: this.currentPage,
            size: this.pageSize,
            sort: this.sort,
            priceGt: this.min,
            priceLte: this.max
          }
        }
        getAllGoodsByParentCategory(params).then(res => {
          if (res.success === true) {
            this.total = res.result.total
            this.goods = res.result.data
            this.noResult = false
            if (this.total === 0) {
              this.noResult = true
            }
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
        })
      },
      _getAllGoods () {
        let cid = this.$route.query.cid
        if (this.min !== '') {
          this.min = Math.floor(this.min)
        }
        if (this.max !== '') {
          this.max = Math.floor(this.max)
        }
        let params = {
          params: {
            page: this.currentPage,
            size: this.pageSize,
            sort: this.sort,
            priceGt: this.min,
            priceLte: this.max,
            cid: cid
          }
        }
        getAllGoods(params).then(res => {
          if (res.success === true) {
            this.total = res.result.total
            this.goods = res.result.data
            this.noResult = false
            if (this.total === 0) {
              this.noResult = true
            }
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
        })
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this.loading = true
        this.getAllGoodsByParentCategory(this.$route.query.cid)
      },
      // 价格排序
      sortByPrice (v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.sort = v
        this.currentPage = 1
        this.loading = true
        this.getAllGoodsByParentCategory(this.$route.query.cid)
      }
    },
    watch: {
      $route (to, from) {
        if (to.fullPath.indexOf('/goods?cid=') >= 0) {
          this.cId = to.query.cid
          this.getAllGoodsByParentCategory(this.$route.query.cid)
        }
      }
    },
    created () {
    },
    mounted () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      this.getItemCategoryByParentType()
      this.getAllGoodsByParentCategory(this.$route.query.cid)
    },
    components: {
      mallGoods,
      YButton,
      YShelf
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        //@extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      //@extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        //border-radius: 5px;
      }
    }
  }

  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .no-info1 {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }
  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }

  .img-item{
    display: flex;
    flex-direction: column;
  }

  .el-pagination{
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
  }

  .section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
  }

  .recommend {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .menuDiv {
    //border: 1px solid #aac;
    border: none;
    overflow: hidden;
    display:inline-block;
  }

  .menuDiv > li > ul {
    position: absolute;
    display: none;
  }

  .menuDiv > li > ul > li {
    float: none;
  }

  .menuDiv > li:hover ul {
    display: block;
    background-color: #DDDDDD;
  }

  .menuDiv > li > a {
    width: 120px;
    line-height: 40px;
    color: black;
    text-align: center;
    display: block;
  }


  /* 在一级菜单中，鼠标放上去的样式 */
  .menuDiv > li > a:hover {
    /*background-color: rgba(74, 74, 74, 0);*/
    color: #333333;
    //border-bottom:1px solid #000000
  }

  /* 二级菜单 */
  .menuDiv > li > ul > li > a {
    width: 120px;
    line-height: 56px;
    text-align: left;
    display: block;
  }

  /* 在二级菜单中，鼠标放上去的样式 */
  .menuDiv > li > ul > li > a:hover {
    background-color: rgba(202, 202, 255, 0);
    border-bottom:1px solid #000000
  }


</style>
