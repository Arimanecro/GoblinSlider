import GoblinSlider from './slider.js';

window.addEventListener("DOMContentLoaded", () => {

document.getElementById('loader').style.height = window.innerHeight + 'px';
document.getElementById('WomenSprite').style.animationPlayState = 'paused';

});


window.addEventListener("load", function() {

    const slider = new GoblinSlider();
    const goblin = document.getElementById('WomenSprite');
    const goblinFall = document.getElementById('WomenSprite3');
    const banana = document.getElementById('banana');
    const fuck = document.getElementById('fuck');
    const down = document.getElementById('down2');
    const board = document.getElementById('board');
    const btn_right = document.getElementById('btn_right');
    const btn_left = document.getElementById('btn_left');
    const btn_close = document.getElementById('btn_close');
    const pic = document.getElementById('pic');
    const wagon = document.getElementById('wagon_container');

    const arrow_box = document.querySelector('.arrow_box');

    const listAnimations = [ document.getElementById('gear_sm1'), document.getElementById('gear_sm2'),
        document.getElementById('gear_bg'), goblinFall];

    document.getElementById('loader').style.display = 'none';

    if(!document.hidden){
        document.getElementById('WomenSprite').style.animationPlayState = 'running';
    }


    window.addEventListener("visibilitychange", () => {
    return (!document.hidden) ? document.getElementById('WomenSprite').style.animationPlayState = 'running'
     : document.getElementById('WomenSprite').style.animationPlayState = 'paused';
});

    pic.addEventListener("change", (e) => {
        if(e.target.files.length > 3) {
        wagon.innerHTML = '';

        for (let v in e.target.files) {

            if( e.target.files.hasOwnProperty(v)){
                let tempPath = URL.createObjectURL(e.target.files[v]);
                wagon.insertAdjacentHTML("beforeend", insertImage(tempPath, v));
                URL.revokeObjectURL(e.target.files[v]);
            }
        }
        wagon.style.width = 'auto';
        slider.showImage();
        const three = document.querySelectorAll('#wagon_container > div.wagon.img');
        [...three].forEach( v => v.style.cursor = 'pointer');
    }

    else { slider.incorrectCountImages(); }
});
    
    btn_right.addEventListener("click", () => btnEvent('btn_right',btn_right));

    btn_left.addEventListener("mousedown", () => btnEvent('btn_left', btn_left));

    btn_close.addEventListener("click", ()=> slider.curtain.style.left = '-73%');

    goblin.addEventListener("animationend", function () {
        banana.setAttribute("style","left: 140px;");
        fuck.setAttribute("style","width: 140px;");
        this.setAttribute("style",
            "width: 250px; background: url('img/sprite_fall.png') no-repeat;" +
            "animation: moveGirl3 .55s steps(7), moveGirl4 .35s linear 1;" +
            "transform:  translate3d(800px, 0px, 0px);");
        goblin.addEventListener("animationend", function () {
            goblinFall.setAttribute("style","animation: fall 2s ease-in 1");
        },false, false, "moveGirl3");
    }, false, false, "moveGirl2");

    goblinFall.addEventListener("animationstart",
        function() {
            let timeout = setInterval(function() {
                let x = window.getComputedStyle(goblinFall).getPropertyValue('transform').split(',')[5];
                if(typeof x !== "undefined"){
                    window.scrollTo(0,  x.slice(0, -1));

                }
                else {clearTimeout(timeout);}
            }, 10);
        }, false, false, "fall");

    goblinFall.addEventListener("animationend",
        function() {
            goblinFall.style.top = "2664px";
            goblinFall.style.left = "790px";
            goblinFall.style.width = "177px";//177
            goblinFall.style.height = "138px";//138
            goblinFall.style.background = "url('img/idle_sprite.png') no-repeat";
            goblinFall.style.animation = "moveGirl2 .25s steps(7) infinite";
            goblinFall.style.animationPlayState = 'paused';
            down.style.filter = "blur(0px) opacity(0)";
            board.style.top = "0px";
        }, false, false, "fall");


    down.addEventListener("transitionend", () => down.setAttribute("style","display:none") );

    function btnEvent(name, btn){

        if(document.getElementById('wagon_container').children.length > 3) {
            let img = document.querySelector('.img');
            let wheels = document.querySelectorAll('.wheels');

            slider.showImage();

            startPauseAnimation(name, listAnimations, window.getComputedStyle(btn_right).getPropertyValue('transform'));
            wheels.forEach( (s) => {
                if(name == 'btn_left') { s.style.animationDirection ='normal';}
        else { s.style.animationDirection ='reverse';}
            s.style.animationPlayState = 'running';
        });

            img.addEventListener("transitionend",
                () => {

                listAnimations.forEach( (s) => s.style.animationPlayState = 'paused' );

            wheels.forEach((s) => s.style.animationPlayState = 'paused');

            if(matrixRotate(window.getComputedStyle(btn).getPropertyValue('transform')) == 90) {
                btn.style.transform = 'rotate(0deg)';
            }
            else if(matrixRotate(window.getComputedStyle(btn).getPropertyValue('transform')) == "-90") {
                btn.style.transform = 'rotate(0deg)';
            }

        });

            goblinFall.style.width = "250px";
            goblinFall.style.height = "148px";
            goblinFall.style.top = "2654px";
            goblinFall.style.left = "756px";
            goblinFall.style.background = "url('img/goblin_sprite2.png') no-repeat";
        }
        else {slider.incorrectCountImages();}

    }
    
    function insertImage(path, number){
        //path = path.slice(5);
         let template = `<div  class="wagon img">
         <div style='background: url("${path}") no-repeat center, rgba(236, 208, 102, 0.68);background-size:contain;' class="wagon_img">${number}</div>
         <div class="wagon_three"></div>
         <div class="wagon_three_wheels">
         <div class="left_wheel wheels"></div>
         <div class="right_wheel wheels"></div>
         </div>
         </div>`;
         return template;
    }

    function startPauseAnimation(btn, arr, cssTransform){

        if(matrixRotate(cssTransform) == 0) {
            if(btn == 'btn_right') {
                btn_right.style.transform = 'rotate(90deg)';
            }
            else { btn_left.style.transform = 'rotate(-90deg)'; }

        }

        arr.forEach( (s) => {
            if(s.style.animationPlayState == 'paused'){
            s.style.animationPlayState = 'running';
        }

    });}

    function matrixRotate(tr){
        let values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        let a = values[0];
        let b = values[1];

        return Math.round(Math.atan2(b, a) * (180/Math.PI));;
    }

});