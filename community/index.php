<!DOCTYPE html>
<html lang="en"><head>
  <title>Conceal - Community</title>
  <?php include '../landing/include/topjs.html';?>
  <link rel="stylesheet" href="style/style.css">
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
                <li><a href="../defi/">BANKING</a></li>
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
              <span>Improving the World</span> <strong>Together</strong>
            </h1>
            <a href="#downArrowBtn" class="btn-custom btnSignMain" data-aos="fade-up" data-aos-delay="400"><span class="icon-leanpub"></span><span> Join the movement</span></a>
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
              <h2>Community</h2>
            </div>
          </div>
          <div class="col-lg-8 mt-8 pl-lg-8" data-aos="fade-up" data-aos-delay="200">
            <p>
              Conceal has a huge thriving community of awesome people that are sharing ideas, working together and helping each other regardless of where they are in their Blockchain journey. What are you waiting for?
            </p>
          </div>
        </div>
        <div class="row align-items-center speaker">
          <div class="col-lg-12 ml-auto communityWrapper">
            <img data-aos="slide-up" src="../landing/images/community.png" />			  
			  <div class="navcontent" role="tabpanel" data-aos="fade-up" data-aos-delay="200">
				<!-- Nav pills -->
				<ul id="navBarTab" class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active">
						<a data-target="#socials" href="#/" aria-controls="socials" role="tab" data-toggle="tab" class="active">Social links</a>
					</li>|
					<li role="presentation">
						<a data-target="#exchanges" href="#/" aria-controls="exchanges" role="tab" data-toggle="tab">Exchanges</a>
					</li>|
					<li role="presentation">
						<a data-target="#dex" href="#/" aria-controls="dex" role="tab" data-toggle="tab">DEX</a>
					</li>
				</ul>
				
			<!-- Tab panes -->
    		<div class="tab-content">		

				<div id="socials" role="tabpanel" class="tab-pane active"> 
					<div class="row mb-5 aboutSection">
					  <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
						<div class="site-section-heading">
						  <h2>Social links</h2>
						</div>
					  </div>
					</div>
					<div class="row align-items-center speaker mediaSectionWrapper">
						
					  <div class="col slinks">
						<h2 class="text-uppercase text-primary d-block" data-aos="fade-up">
						  Official
						</h2>
						<ul data-aos="fade-up">
						  <li><span class="icon-github"></span> <a href="https://github.com/ConcealNetwork">Github</a></li>
						  <li><span class="icon-comments"></span> <a href="https://discord.gg/YbpHVSd">Discord</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetwork">Telegram</a></li>
						  <li><span class="icon-twitter"></span> <a href="https://twitter.com/ConcealNetwork">Twitter</a></li>
						  <li><span class="icon-youtube"></span> <a href="https://www.youtube.com/channel/UC_YtRUcy0FR0yIc3H6DDxuw">Youtube</a></li>
						  <li><span class="icon-facebook"></span> <a href="https://www.facebook.com/concealnetwork">Facebook</a></li>
						  <li><span class="icon-medium"></span> <a href="https://medium.com/@ConcealNetwork">Medium</a></li>
						  <li><span class="icon-reddit"></span> <a href="https://www.reddit.com/r/ConcealNetwork">Reddit</a></li>
						  <li><span class="icon-btc"></span> <a href="https://bitcointalk.org/index.php?topic=4515873">BitcoinTalk</a></li>
						</ul>
					  </div>

					  <div class="col slinks">
						<h2 class="text-primary d-block" data-aos="fade-up">
						  Other Groups
						</h2>
						<h4 data-aos="fade-up">Telegram</h4>
						<ul data-aos="fade-up">
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetworkusers">English</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetworkturkiye">T&uuml;rkiye</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetworkrussia">&#x420;&#x43e;&#x441;&#x441;&#x438;&#x44f;</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetworkdutch">Dutch</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetworkfrench">Fran&#xe7;ais</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/concealnetworkvietnam">Vi&#x1ec7;tnam</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/Conceal_Persian">Iran</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/Conceal_Bangladesh">Bangladesh</a></li>
						  <li><span class="icon-telegram"></span> <a href="https://t.me/Conceal_India">India</a></li>
						</ul>
						<h4 data-aos="fade-up">Twitter</h4>
						<ul data-aos="fade-up">
						  <li><span class="icon-twitter"></span> <a href="https://twitter.com/ConcealAfrica">Africa</a></li>
						  <li><span class="icon-twitter"></span> <a href="https://twitter.com/ConcealSpanish">Espa&#xf1;ol</a></li>
						  <li><span class="icon-twitter"></span> <a href="https://twitter.com/ConcealArabia">Arabia</a></li>
						  <li><span class="icon-twitter"></span> <a href="https://twitter.com/concealturkiye">Türkiye</a></li>
						</ul>
					  </div>		
					</div>
				</div>

				<div id="exchanges" role="tabpanel" class="tab-pane">
					<div class="row mb-5 aboutSection">
					  <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
						<div class="site-section-heading">
						  <h2>Exchanges</h2>
						</div>
					  </div>
					</div>
					<div class="row align-items-center speaker mediaSectionWrapper">	
						<div class="col slinks">
							<h2 id="exchanges" class="text-uppercase text-primary d-block" data-aos="fade-up">
							  Exchanges
							</h2>
							<ul data-aos="fade-up">
							  <li><a href="https://www.bitmart.com/trade/en?symbol=CCX_USDT&layout=basic">BitMart</a></li>
							  <li><a href="https://www.hotbit.io/exchange?symbol=CCX_BTC">HotBit</a></li>
							  <li><a href="https://tradeogre.com/exchange/BTC-CCX">TradeOgre</a></li>
							</ul>
						</div>
						
						<div class="col slinks">
							<h2 id="exchanges" class="text-uppercase text-primary d-block" data-aos="fade-up">
							  Market Cap
							</h2>
							<ul data-aos="fade-up">
							  <li><a href="https://coinmarketcap.com/currencies/conceal">CoinMarketCap</a></li>
							  <li><a href="https://www.coingecko.com/en/coins/conceal">CoinGecko</a></li>
							  <li><a href="https://crypto.com/price/conceal">Crypto.com</a></li>
							</ul>
						</div>
					</div>
				</div>
				
				
				<div id="dex" role="tabpanel" class="tab-pane">
					<div class="row mb-5 aboutSection">
					  <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
						<div class="site-section-heading">
						  <h2>DEX</h2>
						</div>
					  </div>
					</div>
					<div class="row align-items-center speaker mediaSectionWrapper">
						<div class="col slinks">
							<h2 id="exchanges" class="text-uppercase text-primary d-block" data-aos="fade-up">
							  Polygon
							</h2>
							<ul data-aos="fade-up">
							  <li><a href="https://app.sushi.com/swap?tokens=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&tokens=0x137Ee749f0F8c2eD34cA00dE33BB59E3dafA494A&chainId=137">SushiSwap - wCCX/USDC</a></li>
							  <li><a href="https://app.sushi.com/swap?tokens=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&tokens=0x137Ee749f0F8c2eD34cA00dE33BB59E3dafA494A&chainId=137">SushiSwap - wCCX/USDT</a></li>
							  <li><a href="https://app.uniswap.org/#/swap?inputCurrency=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&outputCurrency=0x137ee749f0f8c2ed34ca00de33bb59e3dafa494a&chain=polygon">
								Uniswap - wCCX/DAI </a>
							  </li>
							  <li><a href="https://app.uniswap.org/#/swap?inputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&outputCurrency=0x137ee749f0f8c2ed34ca00de33bb59e3dafa494a&chain=polygon">
								Uniswap - wCCX/USDC</a>
							  </li>
							  <li><a href="https://app.uniswap.org/#/swap?inputCurrency=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&outputCurrency=0x137ee749f0f8c2ed34ca00de33bb59e3dafa494a&chain=polygon">
								Uniswap - wCCX/USDT</a>
							  </li>
							</ul>
						</div>
						<div class="col slinks">
							<h2 id="exchanges" class="text-uppercase text-primary d-block" data-aos="fade-up">
							  Binance Smart Chain
							</h2>
							<ul data-aos="fade-up">
							  <li><a href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841">
								  PancakeSwap - wCCX/BUSD</a>
							  </li>
							  <li><a href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841">
								  PancakeSwap - wCCX/USDT</a>
							  </li>
							</ul>
						</div>
						<div class="col slinks">
							<h2 id="exchanges" class="text-uppercase text-primary d-block" data-aos="fade-up">
							  Etherium
							</h2>
							<ul data-aos="fade-up">
							  <li><a href="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0x21686f8ce003a95c99acd297e302faacf742f7d4&chain=mainnet">
								  Uniswap - wCCX/DAI</a>
							  </li>
							</ul>
						</div>
					</div>
				</div>
				
				</div>
			  </div>
          </div>
        </div>
      </div><!-- .cointainer -->
    </div><!-- #mainSection -->
    <?php include '../landing/include/footer.html';?>
  </div>
  <?php include '../landing/include/bottomjs.html';?>
</body></html>