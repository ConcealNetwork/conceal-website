/*Javascript file*/
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
		
var icon = document.getElementById("themeicon");		
if(localStorage.getItem("theme") == null){
	localStorage.setItem("theme", "light");
}
let localData = localStorage.getItem("theme");
if(localData == "light"){
	icon.src = "/revamp/include/icons/moon.png";
	document.body.classList.remove("dark-theme");
}else if(localData == "dark"){
	icon.src = "/revamp/include/icons/sun.png";
	document.body.classList.add("dark-theme");
}

icon.onclick = function(){
	document.body.classList.toggle("dark-theme");
	if(document.body.classList.contains("dark-theme")){
		icon.src = "/revamp/include/icons/sun.png";
		localStorage.setItem("theme", "dark");
	}else{
		icon.src = "/revamp/include/icons/moon.png";
		localStorage.setItem("theme", "light");
	}	
}

// All options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
      // The slim version doesn't have the following plugins:
      // Absorbers, Emitters, PolygonMask, Interactivity Trail
      const options = {
		fps_limit: 60,
		backgroundMode: {
			enable: true,
			zIndex: -1,
		},
        interactivity: {
          events: {
            onClick: {
              // this handles the mouse click event
              enable: false,
            },
            onHover: {
              // this handles the mouse hover event
              enable: true,
              mode: "repulse", // this make particles move away from the mouse
            },
          },
          modes: {
            repulse: {
              distance: 200, // the distance of the particles from the mouse
            },
          },
        },
        particles: {
			number: {
				value: 50,
			},
			color: {
				value: "#FFA500",
			},
			links: {
            enable: true, // this enables links between particles
            opacity: 0.3,
            distance: 250,
			color: "#FBCEB1",
          },
          move: {
            enable: true, // this makes particles move
            speed: 3, // this is the speed of the particles
          },
          opacity: {
            value: { min: 0.3, max: 0.7 }, // this sets the opacity of the particles
          },
          size: {
            value: { min: 1, max: 3 }, // this sets the size of the particles
          },
        },
      };
      // tsParticles.load has two parameters, the first one is the id of the container, the second one is an object with the options
      tsParticles.load("tsparticles", options);