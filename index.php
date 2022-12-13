<?php

session_start();
session_regenerate_id();

// set on each page load
$currTimeStamp = new DateTime();
$_SESSION['started'] = $currTimeStamp->format('Y-m-d\TH:i:s');

function hashCreate($name) {
	return $_SESSION[$name] = bin2hex(random_bytes(24));
} // hashCreate

// Always invalidate the hash
$_SESSION['contactHash'] = '';

echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width,height=device-height,initial-scale=1"
    >
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="apple-touch-icon" href="favicon_appleTouch_144.png">
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="icon" type="image/webp" href="favicon.webp">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous"
        media="screen"
    >
    <link
        rel="stylesheet"
        href="static/homepage.screen.css?v=1"
        media="screen,projection,tv"
    >
    <title>Conceal.Network - Privacy-Protected De-Fi & Encrypted Communications</title>
    </head><body>
    <div id="loader-wrapper">
      <b></b>
      <div id="loader"></div>
    </div>

    <div id="top">
        <header>

            <h1>Conceal Network</h1>

            <div id="mainMenuModal"><a href="#" class="modalClose"></a><div>

                <input type="radio" id="toggle_submenusOff" name="toggle_submenu" lass="toggle" hidden>

                <ul id="mainMenu">
                    <li>
                        <input type="radio" id="toggle_apps" name="toggle_submenu" class="toggle" hidden>
                        <label for="toggle_apps">Apps</label>
                        <label for="toggle_submenusOff"></label>
                        <ul>
                            <li><a href="app">Conceal-App</a></li>
                            <li><a href="defi/">Conceal-DeFi</a></li>
                            <li><a href="#wallets">Conceal-Desktop</a></li>
							<li><a href="features">Conceal-Earn</a></li>
                            <li><a href="id/">Conceal-ID</a></li>
                            <li><a href="clive/">Conceal-Live</a></li>
							<li><a href="messaging/">Conceal-Messaging</a></li>
							<li><a href="mobile/">Conceal-Mobile</a></li
                            <li><a href="pay/">Conceal-Pay</a></li>
							 <li><a href="https://wallet.conceal.network">Conceal-WebWallet</a></li>
                        </ul>
                    </li><li>
                        <input type="radio" id="toggle_about" name="toggle_submenu" class="toggle" hidden>
                        <label for="toggle_about">About</label>
                        <label for="toggle_submenusOff"></label>
                        <ul>
                            <li><a href="about/">Conceal</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="in-the-media/">In The Media</a></li>
                            <li><a href="labs/">Labs</a></li>
							<li><a href="branding/">Branding</a></li>
                            <li><a href="roadmap/">Roadmap</a></li>
                            <li><a href="team/">Team</a></li>
                        </ul>
                    </li><li>
                        <input type="radio" id="toggle_info" name="toggle_submenu" class="toggle" hidden>
                        <label for="toggle_info">Info</label>
                        <label for="toggle_submenusOff"></label>
                        <ul>
                            <li><a href="community/">Community</a>
                            <li><a href="https://conceal.network/wiki/doku.php?id=start">Docs</a>
                            <li><a href="community/#exchanges">Exchanges</a></li>
                            <li><a href="community/#Ethereum">wCCX LP pairs</a></li>
                            <li><a href="https://explorer.conceal.network">Explorer</a></li>
                            <li><a href="#mining">Mining</a></li>
                            <li><a href="#partners">Partners</a></li>
                            <li><a href="https://status.conceal.network/">Network Status</a></li>
                            
                        </ul>
                    </li><li>
                        <input type="radio" id="toggle_info" name="toggle_submenu" class="toggle" hidden>
                        <label for="toggle_info">Support</label>
                        <label for="toggle_submenusOff"></label>
                        <ul>
                            <li><a href="#helpdesk">Helpdesk</a>
                        </ul>
                    </li>
                    </li><li>
                      <input type="radio" id="toggle_info" name="toggle_submenu" class="toggle" hidden>
                      <label for="toggle_info">Markets</label>
                      <label for="toggle_submenusOff"></label>
                      <ul>
                          <li><a href="https://swap.conceal.network?giveCoin=EUR&getCoin=CCX&giveValue=50">Buy CCX</a></li>
                          <li><a href="https://conceal.network/community/#Ethereum">Buy wCCX</a>
                      </ul>
                    </li>                    
                    <li class="navStandalone"><a href="https://bridge.conceal.network">Bridge</a></li>
                    <li class="navStandalone"><a href="donate">Donate</a></li>
                </ul>
                <ul id="socialMenu">
                    <li>
                        <a href="https://conceal.network/wiki/doku.php">
                            <i class="fab fa-wikipedia-w"></i>
                            <span>Documentation</span>
                        </a>
                    </li><li>
                        <a href="http://discord.conceal.network">
                            <i class="fab fa-discord"></i>
                            <span>Discord</span>
                        </a>
                    </li><li>
                        <a href="https://t.me/concealnetworkusers">
                            <i class="fab fa-telegram"></i>
                            <span>Telegram</span>
                        </a>
                    </li><li>
                        <a href="https://twitter.com/ConcealNetwork">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span></a>
                    </li><li>
                    	<a href="https://www.youtube.com/channel/UC_YtRUcy0FR0yIc3H6DDxuw">
							<i class="fab fa-youtube"></i>
							<span>Youtube</span>
                    </a>
                	</li><li>
                        <a href="https://medium.com/@ConcealNetwork">
                            <i class="fab fa-medium"></i>
                            <span>Medium</span></a>
                    </li><li>
                        <a href="https://www.reddit.com/r/ConcealNetwork/">
                            <i class="fab fa-reddit"></i>
                            <span>Reddit</span>
                        </a>
                    </li><li>
                        <a href="https://www.facebook.com/concealnetwork/">
                            <i class="fab fa-facebook"></i>
                            <span>Facebook</span></a>
                    </li><li>
                        <a href="https://github.com/ConcealNetwork">
                            <i class="fab fa-github"></i>
                            <span>Github</span>
                        </a>
                    </li><li>
                        <a href="https://bitcointalk.org/index.php?topic=5086106">
                            <i class="fab fa-bitcoin"></i>
                            <span>BitcoinTalk</span>
                        </a>
                    </li><li>
                        <a href="https://bridge.conceal.network">
                            <i class="fas fa-archway"></i>
                            <span>Bridge</span>
                        </a>
                    </li>
                <!-- #mainMenu --></ul>

            </div><!-- #mainMenuModal --></div>
            <a href="#mainMenuModal" class="mainMenuOpen"></a>

            <div class="header-language">
                <a id="langSelector" href="#">
                    <i class="fas fa-language fa-2x align-middle"></i>
                    <span id="selectedLanguage">English</span>
                </a>
                <div id="langDropdown" class="dropdown-content"></div>
            </div>
        </header>

        <section>
            <div>
                <h2><span>CONCEAL</span><span>.network</span></h2>
                <p>
                    Privacy-Protected De-Fi &amp; Encrypted Communications
                </p>
                <ul class="majorLinks">

                    <li><a href="#markets"><i class="fa fa-store"></i> <span>Buy</span></a></li>
				    <li><a href="#features"><i class="fa fa-money-bill-trend-up"></i> <span>Earn</span></a></li>
                    <li><a href="#wallets"><i class="fa fa-wallet"></i> <span>Hodl</span></a></li>
                    <li><a href="roadmap"><i class="fa fa-map-signs"></i> <span>Build</span></a></li>
                </ul>
                <p>
                    <span>Would you like to build something cool?</span> <em>We might fund you...</em>
                    <a href="labs/">Conceal-Labs</a>
                </p>
            </div>
            <a href="#features" class="moreLink"></a>
        </section>

    <!-- #top --></div>

    <a href="#top" id="socialMenuBackToTop">
        <i class="fas fa-arrow-up"></i>
        <span>Back to Top</span>
    </a>

    <main>

        <section id="features">
            <div>
                <h2>
                    <span>What We\'re About</span>
                    <span>Innovation</span>
                </h2>
                <picture>
                    <source srcset="images/ecosystem.webp" type="image/webp">
                    <img
                        src="images/ecosystem.png"
                        alt="some random cloud nonsense"
                        class="leadingPlate circularPlate"
                    >
                </picture>
                <p>
                    Conceal Network is a secure peer-to-peer privacy framework empowering individuals and organizations to anonymously communicate and interact financially in a decentralized and censorship resistant environment.
                </p>
                <p>
                    Conceal Network powers $CCX which is an open source, privacy-preserving digital cash system that mimics physical cash; nobody knows where you store or spend your $CCX.  All transactions, deposits and messages on Conceal Network are untraceable, tamperproof and operate with no central authority through the use of cryptographic protocols.
                </p><p>
                    Conceal Network is a community-driven and decentralized ecosystem accessible to everyone regardless of social or financial status and geographic location. No one owns Conceal Network and everyone can participate.
                </p>

                <div class="iconSubsections">
                    <section>
                        <i class="fas fa-money-check-alt"></i>
                        <h3><span>De-Fi</span>: <span>Conceal-Earn</span></h3>
                        <p>
                            Decentralized Finance forms the backbone of the Conceal ecosystem, providing users with a decentralized and egalitarian form of cold-staking that earns interess on locked deposits.
                        </p>
                    </section><section>
                        <i class="fas fa-comments"></i>
                        <h3>Encrypted Messages</h3>
                        <p>
                            A truly private, decentralized, anonymous, untraceable, and end-to-end encrypted messaging service that operates on the blockchain while allowing messages that self-destruct.
                        </p>
                    </section>
                <!-- .iconSubsections --></div>

                <form id="compoundInterestCalc">
                    <h3>Compound Interest Calculator</h3>
                    <noscript>
                        <p>
                            Sorry, this section of the page requires JavaScript to function. Please enable it, or revisit this page in a supported browser.
                        </p>
                    </noscript>
                    <fieldset>
                        <label>
                            <span>Deposit</span>
                            <input type="number" id="nPrincipal" value="20000" min="1" max="9999999">
                            <span>CCX</span>
                        </label>
                        <label>
                            <span>for</span>
                            <input type="number" id="nMonths" min="1" max="12" value="12">
                            <span>Months</span>
                        </label>
                    </fieldset>
                    <div>
                        <span>Total</span>:<span id="nTEA">0</span> CCX
                        <span>Profit</span>:<span id="nProfit">0</span> CCX
                    </div>
                    <div class="tableContain" id="compoundInterestCalcTable"><table>
                        <thead>
                            <tr>
                                <th scope="row">Compound Level</th>
                                <th scope="col" colspan="2">Tier 1</th>
                                <th scope="col" colspan="2">Tier 2</th>
                                <th scope="col" colspan="2">Tier 3</th>
                            </tr>
                            <tr>
                                <th scope="row">Principal</th>
                                <td colspan="2">Under 10,000 CCX</td>
                                <td colspan="2">10,000 - 19,999 CCX</td>
                                <td colspan="2">Over 20,000 CCX</td>
                            </tr>
                            <tr>
                                <th scope="row">Base/APR</th>
                                <td colspan="2">2.90%</td>
                                <td colspan="2">3.90%</td>
                                <td colspan="2">4.90%</td>
                            </tr>
                            <tr>
                                <th scope="row">Example</th>
                                <td colspan="2">5,000 CCX</td>
                                <td colspan="2">10,000 CCX</td>
                                <td colspan="2">20,000 CCX</td>
                            </tr>
                            <tr>
                                <th scope="row">Maximum Interest</th>
                                <td colspan="2">4.00%</td>
                                <td colspan="2">5.00%</td>
                                <td colspan="2">6.00%</td>
                            </tr><tr>
                                <th scope="col"><span>Duration</span>: <span>Months</span></th>
                                <th scope="col">Interest</th>
                                <th scope="col">Total</th>
                                <th scope="col">Interest</th>
                                <th scope="col">Total</th>
                                <th scope="col">Interest</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table><!-- .tableContain --></div>
                <!-- #compoundInterestCalc --></form>

            </div>

        <!-- #features --></section>

        <section id="wallets">
            <div>
                <h2><span>Using Conceal</span> <span>Wallets</span></h2>
                <h3 class="text-center wallet-subheader">Full Node Local Wallets</h3>
                <ul>
                    <li>
                        <i class="fab fa-windows"></i><br>
                        <a href="https://github.com/ConcealNetwork/conceal-desktop/releases">
                            WINDOWS GUI
                        </a><br>
                        <a href="https://github.com/ConcealNetwork/conceal-core/releases">
                            WINDOWS CLI
                        </a>
                    </li><li>
                        <i class="fab fa-linux"></i><br>
                        <a href="https://github.com/ConcealNetwork/conceal-desktop/releases">
                            LINUX GUI
                        </a><br>
                        <a href="https://github.com/ConcealNetwork/conceal-core/releases">
                            LINUX CLI
                        </a>
                    </li><li>
                        <i class="fab fa-apple"></i><br>
                        <a href="https://github.com/ConcealNetwork/conceal-desktop/releases>
                            MAC GUI
                        </a><br>
                        <a href="https://github.com/ConcealNetwork/conceal-core/releases">
                            MAC CLI
                        </a>
                    </li>
                </ul>
				<p>
                    Conceal Desktop is the central point of interaction for the primary features of Conceal and is available for all major platforms. With Conceal Desktop you can send and receive CCX and encrypted secure messages, and manage your deposits.
                </p>
				
				
                <h3 class="text-center wallet-subheader">Conceal App (all in one)</h3>
                <ul>
                    <li>
                        <i class="fab fa-windows"></i><br>
                        <a href="https://github.com/ConcealNetwork/conceal-app/releases/latest">WINDOWS Desktop</a>
                    </li><li>
                        <i class="fab fa-linux"></i><br>
                        <a href="https://github.com/ConcealNetwork/conceal-app/releases/latest">LINUX Desktop</a>
                    </li><li>
                        <i class="fab fa-apple"></i><br>
                        <a href="https://github.com/ConcealNetwork/conceal-app/releases/latest">MAC Desktop</a>
                    </li><li>
                        <i class="fas fa-cloud"></i><br>
                        <a href="https://app.conceal.network">Web Version</a>
                    </li>
                    </li><li>
                      <i class="fab fa-android"></i><br>
                      <a href="https://github.com/ConcealNetwork/conceal-app/releases/latest">
                          ANDROID - APK
                      </a><br>
                      <a href="https://play.google.com/store/apps/details?id=app.conceal.hub">
                         Google Play
                      </a>
                  </li>
                </ul>
				<p>
                    Conceal App is the convergence of all Conceal functionalities and modules brought together in one simple and visually stuning app for the end user.
                </p>
				  
				  
              <h3 class="text-center wallet-subheader">Other Wallet Types</h3>
                  <ul>                        
                    <li>
                        <i class="fas fa-paper-plane"></i><br>
                        <a href="https://conceal.network/paperwallet">PAPER</a>
                    </li><li>
                        <i class="fab fa-chrome"></i><br>
                        <a href="https://wallet.conceal.network/">Web Wallet</a>
                    </li>
                </ul>
                <img src="images/newgui.png" alt="Conceal GUI" class="plate">
            </div>
        <!-- #wallets --></section>

        <section id="mining">
            <div>

                <h2>
                    <span>Getting CCX</span>
                    <span>Mining</span>
                </h2>

                <h3>Quick Start</h3>
                <div class="codeBlocks">
                    <div>
                        <h4>XMRStak</h4>
                        <pre><code>"pool_list": [
  {
      "pool_address": "pool.conceal.network:3333",
      "wallet_address": "YOUR_WALLET_ADDRESS",
      "rig_id": "YOUR_WORKER_NAME",
      "pool_password": "x",
      "use_nicehash": false,
      "use_tls": false,
      "tls_fingerprint": "",
      "pool_weight": 1
  },
],
"currency": "cryptonight_gpu",</code></pre>
                    </div><div>
                        <h4>TeamRedMiner</h4>
                        <pre>Pending support...</pre>
                    </div><div>
                        <h4>SRBMiner</h4>
                        <pre><samp>SRBMiner-MULTI.exe --algorithm gpu --pool pool.conceal.network:3333 --wallet "YOUR_WALLET_ADDRESS" --gpu-tweak-profile 5</samp></pre>
                    </div>
                <!-- .codeBlocks --></div>
                <p>
                    <span>The easiest way to get CCX is to mine with CPU or GPU using one of the miners that support CCX. Check out our</span>
                    <a href="https://conceal.network/wiki/doku.php?id=mining">documentation</a>
                    <span>for more detailed information about mining CCX.</span>
                </p>
                <div class="tableContain" id="poolsTable"><table>
                    <caption><span>Mining</span> <span>Pools</span></caption>
                    <thead>
                        <tr>
                            <th scope="col">
                                <i class="fa fa-server"></i>
                                <span>Pools</span>
                            </th>
                            <th scope="col">
                                <i class="fa fa-th-large"></i>
                                <span>Height</span>
                            </th>
                            <th scope="col">
                                <i class="fas fa-coins"></i>
                                <span>Fee</span>
                            </th>
                            <th scope="col">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Hashrate</span>
                            </th>
                            <th scope="col">
                                <i class="fas fa-users-cog"></i>
                                <span>Miners</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table><!-- .tableContain --></div>
            </div>
        <!-- #mining --></section>

        <section id="markets">
            <div>
                <h2>
                    <span>Buying</span> <span>CCX</span>
                    <span>Markets</span>
                </h2>
                <ul class="majorLinks">
                    <li><a href="https://tradeogre.com/exchange/BTC-CCX">Buy on TradeOgre with BTC</a></li>
					<li><a href="https://tradeogre.com/exchange/USDT-CCX">Buy on TradeOgre with USDT</a></li>
                </ul>
           </div>
        <!-- #markets --></section>

        <section id="buyingwCCXETH">
            <div>
                <h2>
                    <span>Buying</span> <span>wCCX</span>
                    <span>Ethereum</span>
                </h2>
                <ul class="majorLinks">
                    <li><a href="https://1inch.exchange/#/r/0x9be82c0E5B75C53F32E63b40442E9dA8cCA06f21/ETH/wCCX">1Inch</a></li>
                    <li><a href="https://app.uniswap.org/#/swap?outputCurrency=0x21686f8ce003a95c99acd297e302faacf742f7d4">Uniswap</a></li>
                </ul>
            </div>
        <!-- #buyingwCCXETH --></section>
        <section id="buyingwCCXBNB">
            <div>
                <h2>
                    <span>Buying</span> <span>wCCX</span>
                    <span>Binance Smart Chain</span>
                </h2>
                <ul class="majorLinks">
                    <li><a href="https://1inch.exchange/#/wCCX/BNB">1Inch</a></li>
                    <li><a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841">Pancakeswap</a></li>
                    <li><a href="https://www.bakeryswap.org/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841">Bakeryswap</a></li>
                </ul>
                <a href="https://conceal.network/community/#exchanges">
                    <i class="fa fa-plus"></i>
                    <span>More</span>
                </a>
            </div>
        <!-- #buyingwCCXBNB --></section>

        <section id="partners">
            <div>
                <h2>
                    <span>Working Together</span>
                    <span>Our Partners</span>
                </h2>
                <ul class="partnerCards">
                    <li>
                      <picture>
                        <a href="https://bpsaa.vision/"><img src="images/partners/BPSAA.png" alt="BPSAA"><br></a>
                      </picture>
                    </li>
                    <li>
                      <picture>
                        <a href="https://ergoplatform.org"><img src="images/partners/ERGO.png" alt="ERGO"><br></a>
                      </picture>
                    </li>
				</ul><ul class="partnerCards">
					<li>
                      <picture>
                        <a href="https://crypto.com/price/conceal/"><img src="images/partners/CRYPTO.png" alt="Crypto.com"><br></a>
                      </picture>
                    </li>
                </ul><ul class="partnerCards">
					<li>
                      <picture>
                        <a href="https://cryptocurrencycheckout.com/"><img src="images/partners/cyprtocurrencycheckout.png" alt="cryptocurrencycheckout.com"><br></a>
                      </picture>
                    </li>
                </ul>
            </div>
        <!-- #community --></section>

        <section id="helpdesk">
            <div>
				<h2>
					<span>Do you have a problem or need to contact us?</span>
					<span>Use our helpdesk</span>
				</h2>
                <ul class="majorLinks">
                    <li><a href="https://conceal.network/support/" id="helpdeskButton"><span>Send Ticket</span></a></li>
                </ul>
            </div>
        <!-- #helpdesk --></section>
		
		<section id="cryptoWidget">	
			<script src="https://crypto.com/price/static/widget/index.js"></script>
			<div
			  id="crypto-widget-CoinTicker"
			  data-transparent="true"
			  data-theme="dark"
			  data-design="modern"
			  data-coins="conceal">
			</div>
        <!-- #cryptoWidget --></section>
    </main>


    <footer style="background: unset;background-color: #181A20;">
	
		<div style="padding:20px 0 0 0;">
			<a href="#top">Back to Top</a>
		</div>
		
    	<div class="fcontain">
    		<div class="flistwrap">
				<ul>
					<h2>General</h2>
					<li>
						<a href="about/" >About</a>
					</li>
					<li>
						<a href="https://conceal.network/wiki/doku.php" >Documentation</a>
					</li>
					<li>
						<a href="https://explorer.conceal.network/" >Explorer</a>
					</li>
					<li>
						<a href="https://conceal.network/wiki/doku.php?id=FAQ" >FAQ</a>
					</li>
					<li>
						<a href="https://conceal.network/support/" >Support</a>
					</li>
					<li>
						<a href="labs/" >Labs</a>
					</li>
					<li>
						<a href="community/#exchanges" >Exchanges</a>
					</li>
					<li>
						<a href="https://conceal.network/wiki/doku.php?id=wrapped-conceal" >wCCX</a>
					</li>
					<li>
						<a href="https://status.conceal.network/" >Network Status</a>
					</li>
					
				</ul>
			</div>
			
			<div class="flistwrap">	
				<ul>
					<h2>Products</h2>
					<li>
						<a href="#wallets" >Wallets</a>
					</li>
					<li>
						<a href="https://bridge.conceal.network/" >Conceal-Bridge</a>
					</li>
					<li>
						<a href="app/" >Conceal-App</a>
					</li>
					<li>
						<a href="defi/" >Conceal-DeFi</a>
					</li>
					<li>
						<a href="https://wallet.conceal.network/" >Conceal-WebWallet</a>
					</li>
					<li>
						<a href="id/" >Conceal-ID</a>
					</li>
					<li>
						<a href="messaging/" >Conceal-Messaging</a>
					</li>
					<li>
						<a href="mobile/" >Conceal-Mobile</a>
					</li>
					<li>
						<a href="clive/" >Conceal-Live</a>
					</li>
					<li>
						<a href="pay/" >Conceal-Pay</a>
					</li>

				</ul>
			</div>

			<div class="flistwrap">
				<ul>
					<h2>Community</h2>
						<li>
							<a href="https://discord.conceal.network">
								Discord
								<i class="fab fa-discord"></i>
							</a>
						</li><li>
							<a href="https://t.me/concealnetworkusers">
								Telegram
								<i class="fab fa-telegram"></i>
							</a>
						</li><li>
							<a href="https://twitter.com/ConcealNetwork">
								Twitter
								<i class="fab fa-twitter"></i>
							</a>
						</li><li>
							<a href="https://www.youtube.com/channel/UC_YtRUcy0FR0yIc3H6DDxuw">
								Youtube
								<i class="fab fa-youtube"></i>
							</a>
						</li><li>
							<a href="https://medium.com/@ConcealNetwork">
								Medium
								<i class="fab fa-medium"></i>
							</a>
						</li><li>
							<a href="https://www.reddit.com/r/ConcealNetwork/">
								Reddit
								<i class="fab fa-reddit"></i>
							</a>
						</li><li>
							<a href="https://www.facebook.com/concealnetwork/">
								Facebook
								<i class="fab fa-facebook"></i>
							</a>
						</li><li>
							<a href="https://github.com/ConcealNetwork">
								Github
								<i class="fab fa-github"></i>
							</a>
						</li><li>
							<a href="https://bitcointalk.org/index.php?topic=5086106">
								BitcoinTalk
								<i class="fab fa-bitcoin"></i>
							</a>
						</li>
					
		 		</ul>
		 	</div>
		</div>
		
		<div class="footerelm" data-aos="fade-up" data-aos-delay="100">
			<span>Official E-Mail Address:</span>
            <a href="mailto:hello@conceal.network">hello@conceal.network</a>
		</div>
		
		<div class="footerelm" data-aos="fade-up" data-aos-delay="100">
			<span class="url_terms"><a href="tc/index.html">T&amp;C</a></span>
			<div class="vl"></div>
			<span class="url_terms"><a href="privacy/index.html">Privacy</a></span>
		</div class="footerelm">
		
		<div class="footerelm" data-aos="fade-up" data-aos-delay="100">		
            	&copy; 2017-<span id="crFullYear">2021</span> <span>Conceal Network</span>. <span>All rights reserved</span>.
        </div>
		
    </footer>

    <script src="static/homepage.js?v=1"></script>
    <script src="js/language.js?v=1"></script>
    <script src="js/pools.js?v=1"></script>
    <script src="js/calc.js?v=1"></script>

    </body></html>';

?>