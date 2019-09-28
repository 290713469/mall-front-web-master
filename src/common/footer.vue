<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
       <ul class="c0" style="width:50%;">
          <ul>
            <li class="c2"><router-link to="/faq"><a class="c3">FAQ</a></router-link></li>
            <li class="c2"><router-link to="/aboutUs"><a class="c3">About us</a></router-link></li>
            <li class="c2"><router-link to="/ipCopyright"><a class="c3" >IP/Copyright/Trademark</a></router-link></li>
          </ul>
        </ul>
        <ul class="c0">
          <ul>
            <li class="c2"><router-link to="/returnRefund"><a class="c3" >Return & Refund</a></router-link></li>
            <li class="c2"><router-link to="/privacy"><a class="c3" >Private Notice</a></router-link></li>
            <li class="c2"><router-link to="/shipLocation"><a class="c3" >Locations We Ship To</a></router-link></li>
            <li class="c2"><router-link to="/customDuty"><a class="c3" >Custom & Duty</a></router-link></li>
          </ul>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    padding: 0px 0 20px;
    border-top: 1px solid #e6e6e6;
    background: #fafafa;
    margin-top: 60px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 1220px;
  }

  .siteinfo {
    height: 100px;
    padding: 10px 0 130px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
  }

  .c0 {
    width: 149px;
    line-height: 1;
    float: left;
  }

  .c1 {
    color: #646464;
    font-size: 12px;
    padding: 0 0 14px;
  }

  .c2 {
    color: #c3c3c3;
    font-size: 12px;
    padding: 6px 0;
  }

  .c3 {
    color: #969696;
  }

  .c4 {
    position: absolute;
    right: 0;
    overflow: hidden;
    line-height: 34px;
  }

  .tel {
    font-size: 30px;
    line-height: 1;
    color: #646464;
    top: -2px;
    position: relative;
  }

  .c5 {
    color: #646464;
    right: -70px;
    position: relative;
  }

  .time {
    margin-top: 5px;
    right: -4px;
    position: relative;
    clear: both;
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }

  .online {
    clear: both;
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }

  .button {
    width: 130px;
    height: 34px;
    font-size: 14px;
    color: #5079d9;
    border: 1px solid #dcdcdc;
    margin-top: 8px;
  }

  .copyright {
    color: #434d55;
    font-size: 12px;
    padding: 40px 0 0;
    display: flex;
    align-items: left;
  }

  .privacy {
    float: left;
    margin: 0 0 0 12px;
  }

  .content-c0 {
    color: #5079d9;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: #3A5FCD;
    }
  }

  .content-c1 {
    float: left;
    line-height: 12px;
    padding: 1px 10px 0;
    border-left: 1px solid #ccc;
  }

  .content-c2 {
    float: left;
    height: 15px;
    line-height: 15px;
    color: #757575;
  }

  .cop {
    clear: both;
    padding: 10px 0 0;
    height: 15px;
  }

  .content-c3 {
    margin-right: 20px;
    color: #bdbdbd;
    font-size: 12px;
    height: 12px;
    line-height: 1;
  }
</style>
