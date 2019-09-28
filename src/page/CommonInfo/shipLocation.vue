<template>
  <div>
    <section class="w mt30 clearfix">
      <div slot="content" class="donate">
        <p>YiWu-Express gladly ships orders around the globe, shipping rates and fees vary depending on the delivery address for your order.</p>
        <p>
          The majority of items in YiWu-Express's product catalog can be shipped to the following countries:
        </p>
        <br/>
        <table border="1" style="border-collapse:collapse">
          <tr>
            <td style="width:130px;">  Continental U.S</td>
            <td>  Continental U.S. states not including Alaska and Hawaii</td>
          </tr>
          <tr>
            <td>U.S. Protectorates</td>
            <td>Puerto Rico, U.S. Virgin Islands, U.S. Minor Outlying Islands, Guam, American Samoa and Northern Mariana Islands</td>
          </tr>
          <tr>
            <td>Canada</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Europe</td>
            <td>Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Faroe Islands, Finland, France, Germany, Greece, Greenland, Guernsey, Hungary, Iceland, Ireland, Isle of Man, Italy, Jersey, Latvia, Liechtenstein, Lithuania, Luxembourg, Netherlands, Norway, Poland, Portugal, Russia, San Marino, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, United Kingdom (England, Northern Ireland, Scotland, and Wales), Albania, Belarus, Belgium, Macedonia, Malta, Monaco, Moldova, Ukraine</td>
          </tr>
          <tr>
            <td>Asia</td>
            <td>Afghanistan, Oman, Bahrain, Bhutan, Bangladesh, Brunei, Cambodia, Cyprus, Georgia, Iran, Iraq, Indonesia, Jordan, Kazakhstan, Kyrgyzstan, India, Israel, KSA(SAUDI), UAE, Japan, Korea, Kyrgyzstan, Kuwait, Laos, Lebanon, Malaysia, Mongolia, Myanmar, Nepal, Oman, Philippines, Qatar, Saudi-Arabia, Sri Lanka, Singapore, Syria, Tajikistan, Thailand, Turkey, Turkmenistan, Uzbekistan, Vietnam, Yemen</td>
          </tr>
          <tr>
            <td>Oceania</td>
            <td>Australia, New-Zealand, French Polynesia, Marshall Islands, Micronesia, New Caledonia, New Zealand, Palau</td>
          </tr>
          <tr>
            <td>South America</td>
            <td>Argentina, Brazil, Costa Rica, Cuba, Nigeria, Mexico, Bolivia, Ecuador, Colombia, Peru, Uruguay, Venezuela, Jamaica, Chile, Dominica, Jamaica, Trinidad-and-Tobago, Antigua-Barbuda</td>
          </tr>
          <tr>
            <td>Africa</td>
            <td>Egypt, South Africa, Kenya, Libya, Congo, Congo-Kinshasa, Togo, Angola, Cote-d-Ivoire, Burkina-Faso, Guinea, Liberia, Mali, Niger, Sierra-Leone</td>
          </tr>
        </table>
        <br/>
        <b>Note:</b>
        <span style="font-size: 12px">
            <li style="list-style:disc;">
              There may be limitations on where and whether YiWu-Express offer international shipping.
            </li>
          <li style="list-style:disc;">
              Your packages may be subject to the customs fees and import duties of the country to which your order ships. These charges are always the recipient's responsibility.
            </li>
        </span>
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

</style>
