<!DOCTYPE html>
<html lang="en"><head>
  <title>Conceal Live</title>
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
                <li><a href="../defi/">DeFi</a></li>
                <!--<li><a href="https://conceal.cloud">CLOUD</a></li>-->
                <li><a href="../id/">ID</a></li>
                <li><a href="../labs/">LABS</a></li>
                <li><a href="../messaging/">MESSAGING</a></li>
                <li><a href="../mobile/">MOBILE</a></li>
                <li class="active"><a href="#">C-LIVE</a></li>
                <!--<li><a href="../pay/">PAY</a></li>-->
                <li class="cta"><a href="https://conceal.cloud/conceal-live/conceal-live-v1.0.1.apk"><span class="icon-android"></span> Android</a></li>
                <li class="cta"><a href="https://conceal.cloud/conceal-live/conceal-live-v1.0.1.msi"><span class="icon-windows"></span> Windows</a></li>
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
          <div class="col-md-10">
            <span class="d-block mb-3 caption" data-aos="fade-up" data-aos-delay="100">CONCEAL LIVE</span>
            <h2 class="d-block mb-4" data-aos="fade-up" data-aos-delay="200">
              Conceal Live (Clive), is a powerful privacy-protected communications software that offers peer-to-peer and end-to-end encrypted audio, video and messaging services for free.
            </h2>
            <a href="https://conceal.cloud/conceal-live/conceal-live-v1.0.1.apk" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-android"></span><span>&nbsp;Android</span></a>
            <a href="https://conceal.cloud/conceal-live/conceal-live-v1.0.1.msi" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-windows"></span><span>&nbsp;Windows</span></a>
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
              Clive is free to the public and is also offered advertisement free. This private communication client is currently available for Android and Windows users with a possible future release for iOS.
            </p>			  
            <p>
			  Clive brings private communications back to the people.
            </p>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingCLiveSS landingCLiveS1"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">
                Secure communication
              </h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">
                Clive connections are fully end-to-end encrypted. All Clive data is only stored on the device where Clive is installed.
              </p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2" data-aos="fade" data-aos-delay="100">
            <div class="landingCLiveSS landingCLiveS2"></div>
          </div>
          <div class="col-lg-6 ml-auto order-lg-1">
            <div class="bio pr-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">NO SERVERS</h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">
				Because all connections are peer-to-peer and end-to-end encrypted, Clive does not rely on any central authority or servers to operate. Latency and transfer speeds are greatly reduced thanks to the direct peer-to-peer connections.
			  </p>
			  <p>
				Autonomous users who are on the same local network can communicate even if they are disconnected from the internet.
			  </p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingCLiveSS landingCLiveS4"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">AUDIO AND VIDEO CONFERENCING</h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">
				Clive offers unlimited audio and video conferences. There are no limits to the number of participants or the length of calls. You are only limited by your own resources. 
			  </p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2" data-aos="fade" data-aos-delay="100">
            <div class="landingCLiveSS landingCLiveS5"></div>
          </div>
          <div class="col-lg-6 ml-auto order-lg-1">
            <div class="bio pr-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">GREAT USER EXPERIENCE
              </h2>
              <p class="mb-4" data-aos="fade-left" data-aos-delay="400">
				Share images, audio or files without any size limitations. Use emojis and other standard chatting features in a private and secure manner.
			  </p>
            </div>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <div class="landingCLiveSS landingCLiveS6"></div>
          </div>
          <div class="col-lg-6 ml-auto">
            <div class="bio pl-lg-5">
              <h2 class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">FLEXIBILE</h2>
              <p class="mb-4" data-aos="fade-right" data-aos-delay="400">Clive comes with many customizable options and works on multiple platforms.</p>
            </div>
          </div>
        </div>
        <div class="row">
			<p><q>Clive is a wonderful perk we offer to the world and is just another great tool in the Conceal ecosystem that is always expanding.</q></p>
   		    <p>Enjoy Clive and the Conceal lifestyle!</p>
        </div>
     </div>
    </div>
    <?php include '../landing/include/footer.html';?>
  </div>
  <?php include '../landing/include/bottomjs.html';?>
</body></html>