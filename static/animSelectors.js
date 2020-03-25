var scrollAnimatedTargets = {
	"#top h2" :
		"+slow",
	"#top h2, #top h2 + p" :
		"+slideInTop",
	"#top .majorLinks + p" :
		"+slideInBottom",
	"#top .majorLinks li:nth-child(1), #top .majorLinks li:nth-child(2)" :
		"+slideInLeft",
	"#top .majorLinks li:nth-child(3), #top .majorLinks li:nth-child(4)" :
		"+slideInRight",
	"#top .majorLinks li:nth-child(2), #top .majorLinks li:nth-child(3)" :
		"+fast",
	"#top .majorLinks li:nth-child(1), #top .majorLinks li:nth-child(4)" :
		"+slow",
	"#features .circularPlate" :
		"+rotateInY",
	"#features > div > p" :
		"+slideInRight +fadeIn",
	"#features .iconSubsections section, #mining h3, #mining .codeBlocks, #mining p" :
		"+slideInBottom +fadeIn",
	"#compoundInterestCalc > h3, #compoundInterestCalc > fieldset, #compoundInterestCalc > div, #mining .tableContain" :
		"+rotateInY",
	"body > section h2" :
		"+zoom +scale050 +fadeIn",
	"#wallets li" :
		"+rotateInX +slow",
	"#wallets .plate" :
		"+zoom",
	"#buyingCCX li:nth-child(odd)" :
		"+rotateInClockwise +zoom",
	"#buyingCCX li:nth-child(even)" :
		"+rotateInCounterClockwise +zoom",
	".timeLine h3" :
		"+flipInBottom",
	".timeLine p" :
		"+flipInTop +overEasy",
	".timeLine time" :
		"+zoom +overEasy +fast",
	".miniProfiles img" :
		"+zoom +scale050 +fadeIn +overEasy +fast",
	".miniProfiles > li:nth-child(odd) b, .miniProfiles > li:nth-child(even) > span" :
		"+slideInLeft",
	".miniProfiles > li:nth-child(even) b, .miniProfiles > li:nth-child(odd) > span" :
		"+slideInRight",
	".miniProfiles ul" :
		"+zoom +scale400",
	".miniProfiles ul li" :
		"+rotateInY",
	"#contact label:nth-child(odd)" :
		"+rotateInClockwise +fadeIn",
	"#contact label:nth-child(even)" :
		"+rotateInCounterClockwise +fadeIn",
	"footer > div":
		"+fadeIn",
	"footer > div:nth-child(1)" :
		"+flipInRight",
	"footer > div:nth-child(2)" :
		"+flipInLeft",
	"footer > div:nth-child(3)" :
		"+flipInBottom"
};

