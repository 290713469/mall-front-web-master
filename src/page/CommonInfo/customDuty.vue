<template>
  <div>
    <section class="w mt30 clearfix">
      <div slot="content" class="donate">
        <p>Generally, customes duties will not be charged for small express packages and postal parcel.
          <br/>
          Customs duties WILL NOT be charged if claimed package value is less then the value listed in theTariffs Threshold Reference Table
        </p><br/>
        <table border="1" style="border-collapse:collapse; width: 300px">
          <thead>
            <tr>
              <td style="text-align: center"><b>Country</b></td>
              <td style="text-align: center"><b>Value</b></td>
            </tr>
          </thead>
          <tbody>
          <tr style="text-align: center">
            <td style="width:130px;">United States</td>
            <td>USD 200</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:130px;">Canada</td>
            <td>CAD 20</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:130px;">Australia</td>
            <td>AUD 1000</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:130px;">EU</td>
            <td>EUR 22</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:130px;">New Zealand</td>
            <td>NZD 300</td>
          </tr>
          </tbody>
        </table>
        <p>
          <span style="font-size: 12px">
            - Orders may need to clear customs in your country.
            <br/>
            - Please check if your order will incur additional import duties, taxes or other customs related charges.
            <br/>
            - Import duties, taxes or other customs charges will be collected by the shipping company upon delivery.
            <br/>
            - We are not responsible for delays caused by the customs department in your country.
            <br/>
            - Additional costs or delays may occur during international trade. We sincerely hope that you do not use additional import costs or customs   clearance delays as a reason for requesting refunds or leaving negative feedback.
          </span>
        </p>
        <br/>
        <h3 style="font-size: 20px"><b>Common Duty Rate for USA</b></h3>
        <table border="1" style="border-collapse:collapse; width: 900px">
          <tr style="text-align: center">
            <td style="width:275px;">Car bumpers</td>
            <td>2.5%</td>
            <td style="width:275px;">Microwave Oven</td>
            <td>2%</td>
            <td style="width:275px;">Furniture (wood, metal)</td>
            <td>Free</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:275px;">Stainless Steel Machinery parts</td>
            <td>2.5%</td>
            <td style="width:275px;">Power Generators</td>
            <td>2.5%</td>
            <td style="width:275px;">Suits, jackets, blazers, trousers of cotton</td>
            <td>9.4%</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:275px;">Windows Frame</td>
            <td>2.9%</td>
            <td style="width:275px;">Lithium-ion batteries</td>
            <td>3.4%</td>
            <td style="width:275px;">Sweaters of cashmere</td>
            <td>4%</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:275px;">Pencils</td>
            <td>4.3%</td>
            <td style="width:275px;">Vacuum cleaners</td>
            <td>Free</td>
            <td style="width:275px;">Lawn Mower</td>
            <td>Free</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:275px;">Handtools such as Screwdrivers</td>
            <td>6.2%</td>
            <td style="width:275px;">Solar cells</td>
            <td>Free</td>
            <td style="width:275px;">Knives and cutting blades</td>
            <td>Free</td>
          </tr>
          <tr style="text-align: center">
            <td style="width:275px;">Most medical instruments</td>
            <td>Free</td>
            <td style="width:275px;">Tablet Computer</td>
            <td>Free</td>
            <td style="width:275px;">Copper Pipe Fittings</td>
            <td>3%</td>
          </tr>
        </table>
        <br/>
        <span style="font-size: 12px">
          Complete table can be found here:<br/><br/>
          <a href="https://hts.usitc.gov/">USA</a><br/><br/>
          <a href="http://www.cbsa-asfc.gc.ca/import/postal-postale/dtytx-drttx-eng.html">Canada</a><br/><br/>
          <a href="https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en">EU</a><br/><br/>
          <a href="http://www.customs.gov.au/tariff/tariff2012.asp">Australia</a><br/><br/>
          <a href="https://www.simplyduty.com/import-calculator/">Duty Calculator</a><br/>
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
