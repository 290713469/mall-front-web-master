import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART
} from './mutation-types'
import { setStore, getStore } from '../utils/storage'
export default {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 加入购物车
  [ADD_CART] (state, {productId, salePrice, productName, productImg, productNum = 1, color, availableSizeItem}) {
    let cart = state.cartList // 购物车
    let flag = true
    let goods = {
      productId,
      salePrice,
      productName,
      productImg,
      color
    }
    if (cart.length) {        // 有内容
      cart.forEach(item => {
        color = (color === null || color === 'null') ? '' : color
        if (item.productId === productId && color === item.color) {
          // 商品已经在购物车
          flag = false
          availableSizeItem.forEach(sizeItem => {
            let sizeDesc = (sizeItem.sizeDesc === null || sizeItem.sizeDesc === 'null') ? '' : sizeItem.sizeDesc
            if (sizeDesc === item.sizeDesc) {
              // 相同尺寸的商品已经在购物车
              if (sizeItem.buyNum >= 0) {
                item.productNum += sizeItem.buyNum
              }
            } else {
              // 当前尺寸的商品不在购物车
              goods.productNum = sizeItem.buyNum
              goods.sizeDesc = sizeDesc
              goods.salePrice = sizeItem.finalPrice
              goods.checked = '1'
              cart.push(goods)
            }
          })
        }
      })
    }
    if (!cart.length || flag) {
      // 添加新商品
      availableSizeItem.forEach(sizeItem => {
        let sizeDesc = (sizeItem.sizeDesc === null || sizeItem.sizeDesc === 'null') ? '' : sizeItem.sizeDesc
        goods = {
          productId,
          salePrice,
          productName,
          productImg,
          color
        }
        goods.productNum = sizeItem.buyNum
        goods.sizeDesc = sizeDesc
        goods.salePrice = sizeItem.finalPrice
        goods.checked = '1'
        cart.push(goods)
      })
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', cart)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 移除商品
  [REDUCE_CART] (state, {productId}) {
    let cart = state.cartList
    cart.forEach((item, i) => {
      if (item.productId === productId) {
        if (item.productNum > 1) {
          item.productNum--
        } else {
          cart.splice(i, 1)
        }
      }
    })
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 修改购物车
  [EDIT_CART] (state, {productId, productNum, checked, index, availableSizeItem, numEdit, deleteItem}) {
    let cart = state.cartList
    if (numEdit) {
      cart.forEach((item, i) => {
        if (i === index) {
          item.buyNum = availableSizeItem[0].buyNum
          item.checked = checked
          item.productNum = availableSizeItem[0].buyNum
        }
      })
    } else if (deleteItem) {
      cart.splice(index, 1)
    } else {
      cart.forEach((item) => {
        item.checked = checked ? '1' : '0'
      })
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  }
}
