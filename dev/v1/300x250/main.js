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
    //div.style.opacity = '1';
    return div;
}

//add png sprite to stage or parent
function addSprite(className, parentDiv) {
    var div = document.createElement("div");
    div.setAttribute('class', className);
    div.style.position = "absolute";
    div.style.overflow = "hidden";
    if (parentDiv == null) {
        stage.appendChild(div);
    }
    else {
        parentDiv.appendChild(div);
    }
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
    //template = generateSprite('template/template_300x250_5.jpg');

    //Backgrounds
    black_bkgrnd = generateContainer();
    black_bkgrnd.style.backgroundColor = '#000000';

    blue_bkgrnd = generateContainer();
    blue_bkgrnd.style.backgroundColor = '#07a2d4';

    orange_bkgrnd = generateContainer();
    orange_bkgrnd.style.backgroundColor = '#dd8601';

    red_bkgrnd = generateContainer();
    red_bkgrnd.style.backgroundColor = '#93121b';

    blue_logo_lockup_trim = generateContainer(dimensions.width-2, dimensions.height-2);
    blue_logo_lockup_trim.style.border = '8px solid #07a2d4';

    stage.appendChild(black_bkgrnd);
    stage.appendChild(blue_bkgrnd);
    stage.appendChild(orange_bkgrnd);
    stage.appendChild(red_bkgrnd);


    //MiniCooper Side view
    ///////
        //main car body
    minicoop_main = generateContainer();
    minicoop_shadows = addSprite('icon-mcSide_shadows', minicoop_main);
    minicoop_car_body = addSprite('icon-mcSide_main', minicoop_main);

        //lights
    minicoop_headlights = addSprite('icon-mcSide_front_light', minicoop_main);
    minicoop_rearlights = addSprite('icon-mcSide_rear_light', minicoop_main);

        //front tire
    minicoop_frt_tire = generateContainer('73', '72');
    minicoop_frt_tire_spin = addSprite('icon-wheel_spin', minicoop_frt_tire)
    minicoop_frt_tire_stopped = addSprite('icon-wheel_stopped', minicoop_frt_tire)
    minicoop_main.appendChild(minicoop_frt_tire);
    minicoop_frt_tire.style.left = '26px';
    minicoop_frt_tire.style.bottom = '44px';
        //rear tire
    minicoop_rear_tire = generateContainer('73', '72');
    minicoop_rear_tire_spin = addSprite('icon-wheel_spin', minicoop_rear_tire)
    minicoop_rear_tire_stopped  = addSprite('icon-wheel_stopped', minicoop_rear_tire)
    minicoop_main.appendChild(minicoop_rear_tire);
    minicoop_rear_tire.style.right = '27px';
    minicoop_rear_tire.style.bottom = '44px';

    stage.appendChild(minicoop_main);

    //Global copy
    fr1_copy_a = addSprite('icon-fr1_copy_a');
    fr1_copy_b = addSprite('icon-fr1_copy_b');
    fr2_copy_a = addSprite('icon-fr2_copy_a');
    fr2_copy_b = addSprite('icon-fr2_copy_b');

    //Interactive ASSETS
        //Car body + colors
    mini_interactive_main = generateContainer();
    mini_interactive_car_body = addSprite('icon-mini_interactive_car_body', mini_interactive_main);
    mini_interactive_paint_orange = addSprite('icon-mini_interactive_paint_orange', mini_interactive_main);
    mini_interactive_paint_red = addSprite('icon-mini_interactive_paint_red', mini_interactive_main);
    mini_interative_title = addSprite('icon-mini_interative_title ', mini_interactive_main);
    stage.appendChild(mini_interactive_main);

        //color buttons
    mini_interactive_btns_main = generateContainer();
    mini_interactive_btn_blue = addSprite('icon-mini_interactive_btn_blue', mini_interactive_btns_main);
    mini_interactive_btn_orange = addSprite('icon-mini_interactive_btn_orange', mini_interactive_btns_main);
    mini_interactive_btn_red = addSprite('icon-mini_interactive_btn_red', mini_interactive_btns_main);
    mini_interactive_btn_orange.style.left = '27px';
    mini_interactive_btn_red.style.left = '54px';
    stage.appendChild(mini_interactive_btns_main);
    mini_interactive_btns_main.style.top = '10px';
    mini_interactive_btns_main.style.left = '135px';

    stage.appendChild(blue_logo_lockup_trim);

    //logos
    logo_small = addSprite('icon-mini_logo_sm');
    logo_large = addSprite('icon-mini_logo_lg');

    //CTA
    cta_bkgrnd = generateContainer('145', '31');
    cta_bkgrnd.style.backgroundColor = 'black';
    cta_bkgrnd.style.left = '10px';
    cta_bkgrnd.style.bottom = '8px';
    arrow1 = addSprite('icon-cta_arrow1', cta_bkgrnd);
    arrow1.style.left = '5px';
    arrow1.style.bottom = '8px';
    arrow2 = addSprite('icon-cta_arrow1', cta_bkgrnd);
    arrow2.style.left = '10px';
    arrow2.style.bottom = '8px';
    cta_copy = addSprite('icon-cta_copy', cta_bkgrnd)
    cta_copy.style.left = '-24px';
    cta_copy.style.bottom = '4px';
    stage.appendChild(cta_bkgrnd);

    //stage.appendChild(template);

}

function init() {

    //set event listeners
    stage.addEventListener('click', exitClickHandler);
    cta_bkgrnd.addEventListener('mouseenter', ctaAnimationOver);
    cta_bkgrnd.addEventListener('mouseleave', ctaAnimationOut);
    cta_bkgrnd.style.cursor = 'pointer';

    mini_interactive_btn_blue.addEventListener('click', bodyColorHandler);
    mini_interactive_btn_orange.addEventListener('click', bodyColorHandler);
    mini_interactive_btn_red.addEventListener('click', bodyColorHandler);
    mini_interactive_btn_blue.style.zIndex = 10;
    mini_interactive_btn_orange.style.zIndex = 10;
    mini_interactive_btn_red.style.zIndex = 10;
    mini_interactive_btn_blue.style.cursor = 'pointer';
    mini_interactive_btn_orange.style.cursor = 'pointer';
    mini_interactive_btn_red.style.cursor = 'pointer';
    mini_interactive_btn_blue.style.border = '2px solid #ffffff';

    //set init placement
    TweenLite.set(fr2_copy_a, {css: {left: dimensions.width}});
    TweenLite.set(fr2_copy_b, {css: {left: dimensions.width}});

    //set init visibility
    //template.style.opacity = .5;

    logo_small.style.opacity = 0;
    logo_large.style.opacity = 0;
    cta_bkgrnd.style.opacity = 0;
    blue_logo_lockup_trim.style.opacity = 0;

    orange_bkgrnd.style.opacity = 0;
    red_bkgrnd.style.opacity = 0;
    mini_interactive_main.style.opacity = 0;

    minicoop_headlights.style.opacity = 0;
    minicoop_rearlights.style.opacity = 0;

    mini_interactive_btns_main.style.opacity = 0;
    mini_interactive_paint_orange.style.opacity = 0;
    mini_interactive_paint_red.style.opacity = 0;

    frame00();

}

function frame00() {

    stopWatch = new Date().getTime();
    stage.style.display = 'block';

    var twnDelay = 0;
    TweenLite.to(stage, .25, {delay: twnDelay, opacity: 1});
    TweenLite.delayedCall(twnDelay, frame01);

}

function frame01() {

    var twnDelay = 0;
    var carSpeed = 1.5;

    twnDelay += .25;

    minicoop_main.tireRotation = 0;

    TweenLite.from(minicoop_main, carSpeed, {
        x: -dimensions.width,
        ease: Expo.easeOut,
        delay: twnDelay,
        tireRotation: 4,
        onUpdate: rotateTires,
        onUpdateParams:[minicoop_main]
    });

    twnDelay += 1.5;

    TweenLite.from(fr1_copy_a, 1, {opacity:0,
    delay: twnDelay});

    TweenLite.from(fr1_copy_b, 1, {opacity:0,
    delay: twnDelay});

    twnDelay += .5;

    TweenLite.to(logo_small, 1, {delay: twnDelay, opacity: 1});
    TweenLite.to(cta_bkgrnd, 1, {delay: twnDelay, opacity: 1});

    twnDelay += 1.25;

    TweenLite.delayedCall(twnDelay, frame02);

}

function frame02() {

    var twnDelay = 0;
    var carSpeed = 2;

    fr1_copy_a.tireRotation = 0;

    TweenLite.to(fr1_copy_a, carSpeed, {
        x: -dimensions.height,
        ease: Expo.easeIn,
        delay: twnDelay,
        tireRotation: 10,
        onUpdate: rotateTires,
        onUpdateParams:[fr1_copy_a],
        onComplete: startSpin
    });

    TweenLite.to(fr1_copy_b, carSpeed, {
        x: -dimensions.height,
        ease: Expo.easeIn,
        delay: twnDelay
    });

    twnDelay += .75;

    TweenLite.to(minicoop_frt_tire_stopped, .25, {
        opacity: 0,
        delay: twnDelay
    });

    TweenLite.to(minicoop_rear_tire_stopped, .25, {
        opacity: 0,
        delay: twnDelay
    });



    TweenLite.to(orange_bkgrnd, 4, {
        opacity: 1,
        delay: twnDelay
    });

    twnDelay += 1;

    TweenLite.delayedCall(twnDelay, frame03);

}

function frame03() {

    var twnDelay = 0;
    var carSpeed = 1;

    TweenLite.to(fr2_copy_a, carSpeed, {
        left: -dimensions.width/2,
        ease: Expo.easeOut,
        delay: twnDelay
    });

    TweenLite.to(fr2_copy_b, carSpeed, {
        left: -dimensions.width/2,
        ease: Expo.easeOut,
        delay: twnDelay
    });

    twnDelay += 2.5;

    TweenLite.to(red_bkgrnd, 4, {
        opacity: 1,
        delay: twnDelay
    });

    twnDelay += 2.5;

    TweenLite.to(fr2_copy_a, carSpeed, {
        left: -dimensions.width*2,
        ease: Expo.easeIn,
        delay: twnDelay
    });

    TweenLite.to(fr2_copy_b, carSpeed, {
        left: -dimensions.width*2,
        ease: Expo.easeIn,
        delay: twnDelay
    });

    TweenLite.set(blue_bkgrnd,{opacity:0, delay: twnDelay});
    TweenLite.set(orange_bkgrnd,{opacity:0, delay: twnDelay});

    TweenLite.to(red_bkgrnd, 4, {
        opacity: 0,
        delay: twnDelay
    });

    twnDelay += 1;

    TweenLite.to(minicoop_headlights, 1, {
        opacity: 1,
        delay: twnDelay
    });

    TweenLite.to(minicoop_rearlights, 1, {
        opacity: 1,
        delay: twnDelay
    });

    twnDelay += 1.5;

    TweenLite.to(minicoop_main, 1, {
        x: dimensions.width,
        ease: Expo.easeIn,
        delay: twnDelay
    });

    twnDelay += 1;

    TweenLite.delayedCall(twnDelay, frame04);

}

function frame04() {

    var twnDelay = 0;

    //orange_bkgrnd.style.opacity = 0;
    //blue_bkgrnd.style.opacity = 0;
    logo_large.style.opacity = 1;
    logo_small.style.opacity = 0;

    TweenLite.to(cta_bkgrnd, .5, {
        opacity: 0,
        delay: twnDelay
    });

    TweenLite.from (logo_large, 1, {
        scaleX: .15,
        scaleY: .15,
        x: 105,
        y: 95,
        ease: Power4.easeInOut,
        delay: twnDelay
    });

    twnDelay += .5;

    TweenLite.to(blue_logo_lockup_trim, .5, {
        opacity: 1,
        delay: twnDelay
    });

    twnDelay += 1;

    TweenLite.delayedCall(twnDelay, frame05);


}

function frame05() {

    var twnDelay = 0;

    TweenLite.to (logo_large, 1, {
        opacity: 0,
        delay: twnDelay
    });

    twnDelay += .5;

    TweenLite.to (mini_interactive_main, 1, {
        opacity: 1,
        ease: Expo.easeOut,
        delay: twnDelay
    });

    TweenLite.to (mini_interactive_btns_main, 1, {
        opacity: 1,
        ease: Expo.easeOut,
        delay: twnDelay
    });

    TweenLite.to (mini_interactive_btns_main, 1, {
        opacity: 1,
        ease: Expo.easeOut,
        delay: twnDelay
    });

    TweenLite.to (logo_small, 1, {
        opacity: 1,
        delay: twnDelay
    });

    TweenLite.to (cta_bkgrnd, 1, {
        opacity: 1,
        delay: twnDelay
    });

    twnDelay += .5;

    TweenLite.delayedCall(twnDelay, returnTimer, ['banner end']);

}

function startSpin() {
    var myVar = setInterval(fullSpeed, .1);
    //drift
    TweenLite.to(minicoop_main, 7, { x: -10});
}

function fullSpeed() {

    var rotatePos = Math.random() * (360 - 320) + 320;
    TweenLite.set(minicoop_frt_tire, {rotation:rotatePos});
    TweenLite.set(minicoop_rear_tire, {rotation:rotatePos});
}

function rotateTires(obj) {

    var nextRot = -obj.tireRotation * 360;

    TweenLite.set(minicoop_frt_tire, {
        rotation: nextRot,
        ease: Linear.easeNone
    });
    TweenLite.set(minicoop_rear_tire, {
        rotation: nextRot,
        ease: Linear.easeNone
    });
}

function ctaAnimationOver(e) {

    var twnDelay = 0;

    TweenLite.to(arrow1, 1, {
        delay: twnDelay,
        x:2,
        ease: Expo.easeOut
    });

    TweenLite.to(cta_copy, 1, {
        delay: twnDelay,
        scaleY: .52,
        scaleX: .52,
        ease: Expo.easeOut
    });

    twnDelay += .2;

    TweenLite.to(arrow2, 1, {
        delay: twnDelay,
        x:2,
        ease: Expo.easeOut
    });
}

function ctaAnimationOut(e) {

    var twnDelay = 0;

    TweenLite.to(arrow1, .5, {
        delay: twnDelay,
        x:0,
        ease: Expo.easeOut
    });
    TweenLite.to(arrow2, .5, {
        delay: twnDelay,
        x:0,
        ease: Expo.easeOut
    });
    TweenLite.to(cta_copy, .5, {
        delay: twnDelay,
        scaleY: .5,
        scaleX: .5,
        ease: Expo.easeOut
    });
}

function bodyColorHandler(e) {

    event.stopPropagation();

    var currentBtn = e.target.className;

    mini_interactive_btn_blue.style.border = 'none';
    mini_interactive_btn_orange.style.border = 'none';
    mini_interactive_btn_red.style.border = 'none';

    switch (currentBtn) {
        case 'icon-mini_interactive_btn_blue':
            TweenLite.to (mini_interactive_paint_orange, .5, {opacity: 0});
            TweenLite.to (mini_interactive_paint_red, .5, {opacity: 0});
            e.target.style.border = '2px solid #ffffff';
            break;
        case 'icon-mini_interactive_btn_orange':
            TweenLite.to (mini_interactive_paint_orange,.5, {opacity: 1});
            TweenLite.to (mini_interactive_paint_red, .5, {opacity: 0});
            e.target.style.border = '2px solid #ffffff';
            break;
        case 'icon-mini_interactive_btn_red':
            TweenLite.to (mini_interactive_paint_orange, .5, {opacity: 0});
            TweenLite.to (mini_interactive_paint_red, .5, {opacity: 1});
            e.target.style.border = '2px solid #ffffff';
            break;
        }


}
