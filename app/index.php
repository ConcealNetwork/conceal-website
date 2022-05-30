<!DOCTYPE html>
<html lang="en"><head>
  <title>Conceal app</title>
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
                <li><a href="../mobile/">MOBILE</a></li>
				  <li><a href="../clive/">C-LIVE</a></li>
                <li class="active"><a href="#">Conceal APP</a></li>
                <li><a href="../pay/">PAY</a></li>
                <li class="cta"><a href="https://play.google.com/store/apps/details?id=app.conceal.hub"><span class="icon-android"></span> Android</a></li>
                <li class="cta"><a href="https://github.com/ConcealNetwork/conceal-app/releases/latest"><span class="icon-windows"></span> Windows</a></li>
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
          <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3">
            <a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a>
          </div>
        </div>
      </div>
    </header>
    <div class="site-section site-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-12"  align="center" >
            <span class="d-block mb-3 caption" data-aos="fade-up" data-aos-delay="100">CONCEAL APP</span>
            <h2 class="d-block mb-4" data-aos="fade-up" data-aos-delay="200">
              "One App" to rule them all.
            </h2>
            <a href="https://play.google.com/store/apps/details?id=app.conceal.hub" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-android"></span><span>&nbsp;Android</span></a>
            <a href="https://github.com/ConcealNetwork/conceal-app/releases/latest" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-windows"></span><span>&nbsp;Windows</span></a>			  		
			<a href="https://github.com/ConcealNetwork/conceal-app/releases/latest" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-apple"></span><span>&nbsp;Mac</span></a>
			<a href="https://github.com/ConcealNetwork/conceal-app/releases/latest" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-linux"></span><span>&nbsp;Linux</span></a>
			<a href="https://app.conceal.network/" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-cloud"></span><span>&nbsp;Web</span></a> 
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
              Conceal App is the convergence of all Conceal functionalities and modules brought together in one simple and visually stuning app for the end user.
            </p>			  
            <p>
			  Conceal brings all the best features together in one app.
            </p>
          </div>
        </div>
		<div class="row align-items-center speaker">
          <div class="col-lg-7 mb-5 mb-lg-0 " data-aos="fade" data-aos-delay="100">
            <div class="landingCapp landingCappS1"></div>
          </div>
          <div class="col-lg-5 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">
                MULTIPLATFORM
              </h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">
                Conceal app is deployed on all the major platforms.
              </p>
            </div>
          </div>
        </div>
		<div class="row align-items-center speaker">
          <div class="col-lg-5 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">
                Wallets
              </h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">
                Wallets that lets you send and receive money easily..
              </p>
            </div>
          </div>
		  <div class="col-lg-7 mb-5 mb-lg-0 " data-aos="fade" data-aos-delay="100">
            <div class="landingCapp landingCappS2"></div>
          </div>
        </div>
		<div class="row align-items-center speaker">
          <div class="col-lg-7 mb-5 mb-lg-0 " data-aos="fade" data-aos-delay="100">
            <div class="landingCapp landingCappS3"></div>
          </div>
          <div class="col-lg-5 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">
                Deposits
              </h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">
                Directly depost your ccx in the conceal app and earn passive income.
              </p>
            </div>
          </div>
        </div>  
		<div class="row align-items-center speaker" style="padding:100px" >
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">
                Messaging
              </h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">
                Securely communicate through built in blockchain messaging service.
              </p>
            </div>
          </div>
	      <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">
                News
              </h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">
                Get the latest news related to conceal all through the app.
              </p>
            </div>
          </div>
        </div>
     </div>
    </div>
    <?php include '../landing/include/footer.html';?>
  </div>
  <?php include '../landing/include/bottomjs.html';?>
</body></html>