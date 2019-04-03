
const sceneEl = document.querySelector('a-scene');
const venusEl = document.getElementById('venus');
const venus = venusEl.object3D;
const earthEl = document.getElementById('earth');
const earth = earthEl.object3D;
const marsEl = document.getElementById('mars');
const mars = marsEl.object3D;
const orbitEl = document.getElementById('orbit');
const orbit = orbitEl.object3D;
const popUpWindowMars = document.getElementById('popUpWindowMars');
const popUpWindowEarth = document.getElementById('popUpWindowEarth');
const popUpWindowVenus = document.getElementById('popUpWindowVenus');

const soundOn = document.getElementById('soundOn');
const soundOff = document.getElementById('soundOff');
const audio = document.querySelector("#audio");



let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

raycaster.setFromCamera( mouse, sceneEl.camera );

sceneEl.addEventListener('loaded', () => {
    sceneEl.camera = new THREE.PerspectiveCamera();
});

(() => {
    window.addEventListener('click', function (evt) {

        if(evt.target.nodeName.toLowerCase() !== 'a') {
            popUpWindowClose();
        } else {
            window.open(window.target.href, "blank");
            return false;
        }

        const planets = orbit.children.map( (group) => {
            group.children[0].visible=true;
            return group.children[0];
        });

        evt.preventDefault();
        evt.stopPropagation();

        mouse.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, sceneEl.camera );

        let intersects = raycaster.intersectObjects( planets );


        console.log(intersects);


        if (intersects[0].object.el.id === earthEl.id){
            //console.log('earth');
            orbitAnimation(0);
            popUpWindowEarth.style.display = 'block';
            popUpWindowMars.style.display = 'none';
            popUpWindowVenus.style.display = 'none';
            planetScale(earthEl);
            planetScaleDown(venusEl);
            planetScaleDown(marsEl);
        }
        if (intersects[0].object.el.id === venusEl.id){
           // console.log('venus');
            orbitAnimation(-140);
            popUpWindowEarth.style.display = 'none';
            popUpWindowMars.style.display = 'none';
            popUpWindowVenus.style.display = 'block';
            planetScale(venusEl);
            planetScaleDown(earthEl);
            planetScaleDown(marsEl);
        }
        if (intersects[0].object.el.id === marsEl.id){
          //  console.log('mars');
            orbitAnimation(-220);
            popUpWindowEarth.style.display = 'none';
            popUpWindowMars.style.display = 'block';
            popUpWindowVenus.style.display = 'none';
            planetScale(marsEl);
            planetScaleDown(venusEl);
            planetScaleDown(earthEl);
        }

    });
})();

function orbitAnimation(rotateY) {
    const orbitAnimation = document.createElement("a-animation");
    orbitAnimation.setAttribute("attribute", "rotation");
    orbitAnimation.setAttribute("to", '0 '+rotateY+' 0');
    orbitAnimation.setAttribute("dur", "2000");
    orbitAnimation.setAttribute("easing", "linear");
    orbitAnimation.setAttribute("repeat", "0");

    orbitEl.appendChild(orbitAnimation);
}
function planetScale(planet) {
    const planetAnimation = document.createElement("a-animation");
    planetAnimation.setAttribute("attribute", "radius");
    planetAnimation.setAttribute("to", '0.8');
    planetAnimation.setAttribute("dur", "2000");
    planetAnimation.setAttribute("easing", "linear");
    planetAnimation.setAttribute("repeat", "0");

    planet.appendChild(planetAnimation);
}
function planetScaleDown(planet) {
    const planetAnimation = document.createElement("a-animation");
    planetAnimation.setAttribute("attribute", "radius");
    planetAnimation.setAttribute("to", '0.3');
    planetAnimation.setAttribute("dur", "2000");
    planetAnimation.setAttribute("easing", "linear");
    planetAnimation.setAttribute("repeat", "0");

    planet.appendChild(planetAnimation);
}

function popUpWindowClose() {
    popUpWindowMars.style.display = "none";
    popUpWindowEarth.style.display = "none";
    popUpWindowVenus.style.display = "none";
}

function soundPlay() {
    if(soundOn.classList.contains("play")){
        soundOn.classList.remove("play");
        audio.pause();
        soundOff.style.display = 'block';
        soundOn.style.display = 'none';

    }else{
        soundOn.classList.add("play");
        audio.play();
        soundOff.style.display = 'none';
        soundOn.style.display = 'block';
    }
}