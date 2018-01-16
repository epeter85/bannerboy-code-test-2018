var extractSize = function (str) {
    var widthMatch = /width\=(\d+)/.exec(str);
    var heightMatch = /height\=(\d+)/.exec(str);
    //console.log(widthMatch[1], heightMatch[1]);
    return {
        width: parseInt(widthMatch[1])
        , height: parseInt(heightMatch[1])
    }
}

var sizeMeta = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
var dimensions = extractSize(sizeMeta);
var stopWatch = new Date().getTime();

function generateSprite(imgURL, imgWidth, imgHeight) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.overflow = "hidden";
    if (imgWidth == null) {
        div.style.width = dimensions.width + "px";
        div.style.height = dimensions.height + "px";
    }
    else {
        div.style.width = imgWidth + "px";
        div.style.height = imgHeight + "px";
    }
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundImage = "url(" + imgURL + ")"
    div.style.backgroundSize = '100%';
    div.style.opacity = '0';
    div.style.filter = 'alpha(opacity=0)';
    return div;
}

function generateButton(btnWidth, btnHeight, xPos, yPos) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.overflow = "hidden";
    div.style.width = btnWidth + "px";
    div.style.height = btnHeight + "px";
    div.style.backgroundColor = 'red';
    div.style.left = xPos + 'px';
    div.style.top = yPos + 'px';
    div.style.opacity = '0';
    div.style.filter = 'alpha(opacity=0)';
    /*div.style.opacity = '.5';
    div.style.filter = 'alpha(opacity=50)';*/
    return div;
}

function generateCanvas(imgURL) {
    var mycanvas = document.createElement("canvas");
    mycanvas.style.position = "absolute";
    mycanvas.style.overflow = "hidden";
    mycanvas.style.width = dimensions.width + "px";
    mycanvas.style.height = dimensions.height + "px";
    mycanvas.id = 'canvas';
    var img = document.createElement('img');
    img.src = imgURL;
    mycanvas.appendChild(img);
    mycanvas.style.opacity = '0';
    mycanvas.style.filter = 'alpha(opacity=0)';
    return mycanvas;
}

function generateContainer(contWidth, contHeight) {
    var div = document.createElement("div");
    if (contWidth == null) {
        div.style.width = dimensions.width + "px";
        div.style.height = dimensions.height + "px";
    }
    else {
        div.style.width = contWidth + "px";
        div.style.height = contHeight + "px";
    }
    div.style.position = "absolute";
    div.style.overflow = "hidden";
    return div;
}

function addSprite(className) {
    var div = document.createElement("div");
    div.setAttribute('class', className);
    div.style.position = "absolute";
    div.style.overflow = "hidden";
    //stage.appendChild(div);
    return div;
}

//This will echo how many seconds have passed
function returnTimer() {
    stopWatch = ((new Date().getTime()) - stopWatch) * .001;
    console.log(stopWatch + " seconds");
}
/**
 * Called on the window load event.
 */
function preInit() {

  if (Enabler.isInitialized()) {
    initDom();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, initDom);
  }
}

/**
 * The Enabler is now initialized and any extra modules have been loaded.
 */
function initDom() {

    //add elements to dom
    mainInit();


  // Wait for the page to load (also known as polite loading).
  if (Enabler.isPageLoaded()) {
    init();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, init);
  }
}


function exitClickHandler() {
  Enabler.exit('BackgroundExit');
}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);

function mainInit() {

    ///////////////////////////////
    //set up sprites and containers
    ///////////////////////////////

    //setup stage
    stage = document.querySelectorAll('.container')[0];
    stage.style.width = dimensions.width + 'px';
    stage.style.height = dimensions.height + 'px';
    stage.style.overflow = "hidden";
    stage.style.position = "absolute";
    stage.style.display = 'none';
    stage.style.opacity = 0;
    stage.style.filter = 'alpha(opacity=0)';
    stage.style.border = '1px solid black';

    //template
    template = generateSprite('template/template_300x250_1.jpg');
    stage.appendChild(template);

    //frame01
    mc_side = generateContainer();
    mc_side_front_light = addSprite();

    stage.appendChild(car_side);


    //test = addSprite('icon-bottle_batman');
    //background = addSprite('background');

    /*test = generateSprite(sparkle_small_1_1);
    stage.appendChild(test);

    stage.style.backgroundColor = 'black';*/
  //  test.style.opacity = 1;
   // background.style.opacity = 1;


    stage.addEventListener('click', exitClickHandler);


    //add sprites and containers to stage

    //init();

}

function init() {

    //set init placement


    //set init visibility
    template.style.opacity = 1;


    //set listeners

    frame00();

}

function frame00() {

    stopWatch = new Date().getTime();

    stage.style.display = 'block';

    var twnDelay = .5;

    TweenLite.to(stage, .25, {delay: twnDelay, opacity: 1});


    TweenLite.delayedCall(twnDelay, frame01);

}

function frame01() {

    var twnDelay = 0;

    twnDelay += .25;

    //TweenLite.delayedCall(twnDelay, toggleISI);

}
