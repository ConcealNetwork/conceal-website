<!DOCTYPE html>
<html lang="en"><head>
  <title>Conceal Messaging - Decentralized Encrypted Messages</title>
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
                <li><a href="../defi/">Earn</a></li>
                <!--<li><a href="../id/">ID</a></li>-->
                <li><a href="../labs/">LABS</a></li>
                <li class="active"><a href="#">MESSAGING</a></li>
                <li><a href="../mobile/">MOBILE</a></li>
                <!--<li><a href="../pay/">PAY</a></li>-->
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
            <span class="d-block mb-3 caption" data-aos="fade-up" data-aos-delay="100">CONCEAL MESSAGING</span>
            <h1 class="d-block mb-4" data-aos="fade-up" data-aos-delay="200">
              Decentralized <strong>Encrypted</strong> Messages
            </h1>
            <a href="../mobile/" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-mobile"></span><span> Mobile</span></a>
            <a href="../#wallets" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-desktop"></span><span> Desktop</span></a>
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
              Conceal Messaging expands our ecosystem by providing fully integrated encrypted messaging on the Blockchain.
            </p>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingMessagingImg"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">
                Self-Destructing Messages
              </h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">
                Conceal Messaging supports self-destructing messages that delete themselves after being read.
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
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">Mobile, Desktop or Web</h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">Conceal Messaging works on the Web, Desktop and Mobile.</p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingMessagingImg landingMessagingImg2"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">Decentralized</h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">Conceal Messaging is a decentralized service that operates on the Blockchain.</p>
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
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">There is no need to copy / paste an address every time. Maintain your address book for easily sending messages to your contacts.</p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingMessagingImg landingMessagingImg3"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">Encrypted</h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">All Conceal Messages are encrypted and cannot be read by anyone other than the sender and receiver.</p>
            </div>
          </div>
        </div>
     </div>
    </div>
    <?php include '../landing/include/footer.html';?>
  </div>
  <?php include '../landing/include/bottomjs.html';?>
</body></html>