<!DOCTYPE html>
<html lang="en"><head>
  <title>Conceal - Community</title>
  <?php include '../landing/include/topjs.html';?>
</head><body>
  <!-- <div id="loader-wrapper">
    <b></b>
    <div id="loader"></div>
  </div> -->

  <div class="site-wrap">
    <div class="site-mobile-menu">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>
    <header class="site-navbar py-3" role="banner" id="siteHeader">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-12 col-md-1" id="logoDiv">
            <a href="../"></a>
          </div>
          <div class="col-12 col-md-11 d-none d-xl-block">
            <nav class="site-navigation position-relative text-right" role="navigation">
              <ul class="site-menu js-clone-nav mx-auto d-none d-lg-block">
                <li><a href="../banking/">BANKING</a></li>
                <li><a href="https://conceal.cloud">CLOUD</a></li>
                <li><a href="../id/">ID</a></li>
                <li><a href="../labs/">LABS</a></li>
                <li><a href="../messaging/">MESSAGING</a></li>
                <li><a href="../mobile/">MOBILE</a></li>
                <li><a href="../pay/">PAY</a></li>
              </ul>
            </nav>
          </div>
          <div class="header-language">
          <a id="langSelector" href="#">
            <i class="fas fa-language fa-2x align-middle"></i>
               <span id="selectedLanguage">English</span>
              </a>
            <div id="langDropdown" class="dropdown-content"></div>
          </div>		            
          <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3">
            <a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a>
          </div>
        </div>
      </div>
    </header>
    <div class="site-section site-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-10">
            <span class="d-block mb-3 caption" data-aos="fade-up" data-aos-delay="100">CONCEAL COMMUNITY</span>
            <h1 class="d-block mb-4" data-aos="fade-up" data-aos-delay="200">
              <span>Marketing Fundraiser</strong>
            </h1>
            <a href="#downArrowBtn" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-leanpub"></span><span> Support us</span></a>
          </div>
        </div>
        <div class="downArrowWrapper">
          <a href="#downArrowBtn" class="downArrow" id="downArrowBtn"></a>
        </div>
      </div>
    </div>
    <div class="site-section" id="mainSection">
      <div class="container">
        <div class="row mb-5 aboutSection">
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="site-section-heading">
              <h2>Donations</h2>
            </div>
          </div>
          <div class="col-lg-8 mt-8 pl-lg-8" data-aos="fade-up" data-aos-delay="200">
            <p>
              Conceal Network is a decentralized, privacy-preserving network that seeks to aid it's users in managing their finances and communications with ease. We believe privacy is a fundamental human right, and we are working towards expanding our privacy-protected ecosystem and ensuring everyone can efficiently utilize it. Our overall vision is to give Freedom back to the People and to help them shield themselves from unauthorized monitoring.            </p>
            <p>
              You can make a donation to Conceal with your cryptocurrency of choice and send your desired amount to one of our receiving addresses below. Your contribution, no matter how big or small, has the power to increase the adoption and development of the Conceal Network. All of the donations we receive will support the project so that we can offer better services to our community, boost liquidity, hire more talented developers, increase our social-media presence and bolster other marketing efforts.            </p>
            <p>
              Make a contribution today and help us on the road to a better and brighter future for all Concealers.
            </p>
            <p>
              We thank you for your generosity and support!
            </p>
          </div>
        </div>
      </div><!-- .cointainer -->
    </div><!-- #mainSection -->
    <div class="site-section" id="mainSection">    
      <h2 class="text-uppercase text-primary text-center d-block" data-aos="fade-up"> Please use one of the following addresses</h2>
      <h4 class="text-uppercase text-primary text-center d-block" data-aos="fade-up">(Donations are not refundable)</h4>

      <div class="container donate_wrapper">
        <table class="table donate_table mb-5" style="background-color:#194652;">
          <tbody>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/ccx.svg" alt="Conceal"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">Conceal (CCX)</span>
                <input type="text" class="currency_address" id="fd31cb323dce46a6a313bc31adc4beb5" value="ccx7Mi9osGEiPkJ8Eq9ajfFFipavENjJ92Gf4xCmu4KXiExSjcWoSefCQYtcA2BUrTPjrMY5pssgMNPRxaR1DXtj3TvTJG6LRo" readonly>
                </span><span class="address_copy icon-copy" data-address="fd31cb323dce46a6a313bc31adc4beb5"></span></a>
              </td>
            </tr>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/btc.svg" alt="Bitcoin"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">Bitcoin (BTC)</span>
                <input type="text" class="currency_address" id="4c1d510bda3b4ceaa8d67ffad8404a63" value="bc1qsms9qapuja6zdp7v6cysznj229nhlezg98f7lr" readonly>
                </span><span class="address_copy icon-copy" data-address="4c1d510bda3b4ceaa8d67ffad8404a63"></span></a>
              </td>
            </tr>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/xmr.svg" alt="Monero"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">Monero (XMR)</span>
                <input type="text" class="currency_address" id="85b860038c734fe29a5c778e20b5a1c9" value="89Uw4SfFTTm1kcyP5ZhYwCgvMvvmLvM1nfWVxqVTpDqYMjHpwfK3ryaLNeTFk4kjScFoSip5T2TgdGAithV4GUo5Ga9FcRL" readonly>
                </span><span class="address_copy icon-copy" data-address="85b860038c734fe29a5c778e20b5a1c9"></span></a>
              </td>
            </tr>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/eth.svg" alt="Ethereum"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">Ethereum (ETH)- Polygon!</span>
                <input type="text" class="currency_address" id="93435cc42a4d4b93b4905b7033d628e8" value="0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815" readonly>
                </span><span class="address_copy icon-copy" data-address="93435cc42a4d4b93b4905b7033d628e8"></span></a>
              </td>
            </tr>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/usdt.svg" alt="Tether"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">Tether (USDT) - Polygon!</span>
                <input type="text" class="currency_address" id="3d3cde8ef09e401cb407a202908d0167" value="0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815" readonly>
                </span><span class="address_copy icon-copy" data-address="3d3cde8ef09e401cb407a202908d0167"></span></a>
              </td>
            </tr>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/usdc.svg" alt="USD"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">USD (USDC)- Polygon!</span>
                <input type="text" class="currency_address" id="5bc886b7adbf45b593c6a8c8f017fa61" value="0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815" readonly>
                </span><span class="address_copy icon-copy" data-address="5bc886b7adbf45b593c6a8c8f017fa61"></span></a>
              </td>
            </tr>
            <tr>
              <td class="donate_icon_cell"><img class="donate_currency_icon" src="../landing/icons/dai.svg" alt="Dai"/></td>
              <td class="donate_currency_info">
                <span class="donate_currency_name text-primary">Dai (DAI)- Polygon!</span>
                <input type="text" class="currency_address" id="27c4aa0415ab40e5978579bf7540bfbe" value="0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815" readonly>
                </span><span class="address_copy icon-copy" data-address="27c4aa0415ab40e5978579bf7540bfbe"></span></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div><!-- #mainSection -->
    <?php include '../landing/include/footer.html';?>
  </div>
  <?php include '../landing/include/bottomjs.html';?>
</body></html>