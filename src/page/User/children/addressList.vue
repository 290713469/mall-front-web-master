<template>
  <div>
    <y-shelf :title="$t('common.address')">
      <span slot="right"><y-button :text="$t('checkout.add_new_address')" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title" style="padding-left: 0px !important;">
          <span class="name" style="width: 150px;padding-left: 30px; font-weight: bold">{{$t("checkout.user_name")}}</span>
          <span class="address" style="text-align: left !important;width: 305px; font-weight: bold">{{$t("checkout.detail_address")}}</span>
          <span class="tel" style="width: 160px; text-align: left; font-weight: bold">{{$t("checkout.phone_num")}}</span>
          <span class="tel" style="width: 160px; text-align: left; font-weight: bold">{{$t("checkout.email")}}</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name" style="text-align: left; padding-left: 30px; width: 150px;">{{item.userName}}</div>
            <div class="address-msg" style="text-align: left !important;width: 250px">{{item.countryName}}, {{item.streetName}}</div>
            <div class="telephone" style="text-align: left !important;">{{item.tel}}</div>
            <div class="telephone" style="text-align: left !important;">{{item.email}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="item.isDefault? $t('checkout.default_address'):$t('checkout.set_default_address')"
                 :class="{'defalut-address':item.isDefault}"></a>
            </div>
            <div class="operation">
              <el-button type="primary" icon="edit" size="small"  @click="update(item)"></el-button>
              <el-button type="danger" icon="delete" size="small" :data-id="item.addressId" @click="del(item.addressId,i)"></el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">{{$t("address.no_address")}}</div>
            <div style="margin: 20px ">
              <y-button :text="$t('checkout.add_new_address')" @btnClick="update()"></y-button>
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
          <el-select v-model="msg.countryName" @change="selectCountry()" :placeholder="$t('address.country')" style="width:385px">
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
          <el-checkbox class="auto-login" v-model="msg.isDefault">{{$t("checkout.set_default_address")}}</el-checkbox>
        </div>
        <y-button :text="$t('checkout.save')"
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save({userId:userId,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,email:msg.email,isDefault:msg.isDefault,countryId:msg.countryId})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { addressList, addressUpdate, addressAdd, addressDel, getAllCountries } from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: this.$t('checkout.address_management'),
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
        userId: '',
        countries: []
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName && msg.email
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      selectCountry () {
        for (let i = 0; i < this.countries.length; i++) {
          if (this.msg.countryName === this.countries[i].countryName) {
            this.msg.countryId = this.countries[i].id
          }
        }
      },
      _addressList () {
        addressList({userId: this.userId}).then(res => {
          let data = res.result
          if (data.length) {
            this.addList = res.result
            this.addressId = res.result[0].addressId || '1'
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (a) {
        addressUpdate(a).then(res => {
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
      _getAllCountries (params) {
        getAllCountries(params).then(res => {
          if (res.success === true) {
            this.countries = res.result
          } else {
            this.countries = []
          }
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this._addressUpdate(item)
        }
        return false
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
      del (addressId, i) {
        addressDel({addressId: addressId}).then(res => {
          if (res.success === true) {
            this.addList.splice(i, 1)
          } else {
            this.message(this.$t('common.delete_failed_msg'))
          }
        })
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = this.$t('checkout.address_management')
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.streetName = item.streetName
          this.msg.email = item.email
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = this.$t('checkout.add_new_address')
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.email = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      }
    },
    created () {
      this.userId = getStore('userId')
      this._addressList()
    },
    mounted () {
      this._getAllCountries()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 38px;
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
      float: left;
      text-align: center;
      color: #838383;
    }
    .address {
      //margin-left: 35px;
    }
    .tel {
      //margin-left: 195px;
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

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
</style>
