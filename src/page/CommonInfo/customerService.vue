<template>
  <div>
    <section class="w mt30 clearfix">
      <div slot="content" class="donate">
        <p><span style="font-size: 40px; font-weight: bold;">Customer Service</span></p>
        <div style="width:100%; float: left; display: inline-block; padding-top: 20px;">
          <div style="width: 3%; float: left">
            <img class="default-image" src="../../../static/images/whatsApp.png">
          </div>
          <div style="float: left">
            <span style="font-weight: bold">WhatsApp：</span>+86 18395911270
            <br/>
            <span>You can send us a written message or leave us a voice message, and get instant assistance by using WhatsApp</span>
          </div>
        </div>
        <div style="width:100%; float: left; display: inline-block; padding-top: 20px;">
          <div style="width: 3%; float: left">
            <img class="default-image" src="../../../static/images/Email.png">
          </div>
          <div style="float: left">
            <div style="display: inline-block; float: left">
              <div style="float: left">
                <span style="font-weight: bold">Email：</span>
              </div>
              <div style="float: left">
                <span>yiwuexpress@126.com (Reply within 24hrs)</span><br/>
                <span>yiyuetrading@163.com (Reply within 24hrs)</span>
              </div>
            </div>


            <br/>
            <span style="color: red; font-weight: bold">Yiwuyiyuetrading Co.,Lto  is the company name of our website</span>
          </div>
        </div>

        <div style="width:100%; float: left; display: inline-block; padding-top: 20px;">
          <div style="width: 3%; float: left">
            <img class="default-image" src="../../../static/images/phone.png">
          </div>
          <div style="float: left; width: 96%">
            <span style="font-weight: bold">Our Phone Number：</span>
            <br/>
            <span >If you are our existing customer, before you call us, please make sure you know your <span style="color: darkorange">customer ID</span> and tell us on the phone
              or sometime if our service assistant is temporary away, please leave a message with your <span style="color: darkorange">customer ID</span>,
              it will help us to match you with our system and your orders.</span>
            <br/><br/>
            <table class="phone_table">
              <tbody>
                <tr>
                  <td style="width: 150px; height: 30px">+49 15758339602</td>
                  <td style="width: 70px;">Europe</td>
                </tr>
                <tr>
                  <td style="width: 150px; height: 30px">+86 18395911270</td>
                  <td style="width: 70px;">China</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <div id="comment" style="width: 1220px;margin: 0 auto;"></div>
  </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .table {
    align-items: center;
    display: flex;
    flex-direction: column;
    p{
      font-size: 18px;
      margin-top: 2vw;
      // color: #5683EA;
    }
    .el-table{
      // margin: 5vw 8vw 2vw 8vw;
      margin: 2vw 0 2vw 0vw;
    }
    .el-pagination{
      align-self: flex-end;
      margin: 0 3.5vw 2vw;
    }
  }

  .donate {
    // align-items: center;
    display: flex;
    flex-direction: column;
    margin: 1vw 3vw 2vw 3vw;
    p{
      font-size: 16px;
      margin-top: 1vw;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .phone_table {
    border-right:1px solid #333333;
    border-bottom:1px solid #333333
  }

  .phone_table td {
    border-left:1px solid #333333;
    border-top:1px solid #333333
  }


</style>
