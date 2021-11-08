<!DOCTYPE html>
<html lang="en"><head>
  <title>Conceal Mobile - Fast, Secure, Feature-Rich Conceal Wallet</title>
  <?php include '../landing/include/topjs.html';?>
</head><body>
  <div id="loader-wrapper">
    <b></b>
    <div id="loader"></div>
  </div>

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
                <li class="active"><a href="#">MOBILE</a></li>
                <li><a href="../clive/">C-LIVE</a></li>
                <li><a href="../pay/">PAY</a></li>
                <li class="cta"><a href="https://play.google.com/store/apps/details?id=com.ConcealNetwork.ConcealMobile"><span class="icon-android"></span> Android</a></li>
                <li class="cta"><a href="https://conceal.network/wiki/doku.php?id=wallets#ios"><span class="icon-apple"></span> iPhone</a></li>
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
            <span class="d-block mb-3 caption" data-aos="fade-up" data-aos-delay="100">CONCEAL MOBILE</span>
            <h1 class="d-block mb-4" data-aos="fade-up" data-aos-delay="200">
              A secure, feature rich, and mobile Conceal wallet
            </h1>
            <a href="https://play.google.com/store/apps/details?id=com.ConcealNetwork.ConcealMobile" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-android"></span><span>&nbsp;Android</span></a>
            <a href="https://conceal.network/wiki/doku.php?id=wallets#ios" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-apple"></span><span>&nbsp;iPhone</span></a>
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
              <h2>About</h2>
            </div>
          </div>
          <div class="col-lg-8 mt-8 pl-lg-8" data-aos="fade-up" data-aos-delay="200">
            <p>
              We aim to make the Conceal crypto-currency as easy to use as possible. With Conceal Mobile you 
              have a wallet that is secure, fast, and easy to use on the go.
            </p>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingMobileSS"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">
                Multiple Wallets
              </h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">
                Conceal Mobile supports multiple wallets, each with it's own address so you can use them for different 
                purposes.
              </p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2" data-aos="fade" data-aos-delay="100">
            <div class="landingMobileSS landingMobileSS2"></div>
          </div>
          <div class="col-lg-6 ml-auto order-lg-1">
            <div class="bio pr-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">Encrypted
                Messages</h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">Try sending encrypted messages over the blockchain. The messages work in the cloud, desktop and mobile wallets. Nobody but you and the recipient can see what is being sent.</p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingMobileSS landingMobileSS3"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">Accept
              Payments</h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">Easily accept payments from family, friends or anyone, anywhere.</p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2" data-aos="fade" data-aos-delay="100">
            <div class="landingMobileSS landingMobileSS4"></div>
          </div>
          <div class="col-lg-6 ml-auto order-lg-1">
            <div class="bio pr-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">Address Book
              </h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">No need to copy / paste addresses every time. Maintain your address book for easy sending and receiving of funds.</p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingMobileSS landingMobileSS5"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">Live Market Data</h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">You can easily stay up to date with live market data on the go.</p>
            </div>
          </div>
        </div>
     </div>
    </div>
    <?php include '../landing/include/footer.html';?>
  </div>
  <?php include '../landing/include/bottomjs.html';?>
</body></html>