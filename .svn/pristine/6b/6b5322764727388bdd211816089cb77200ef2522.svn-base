/**
 * Created by Administrator on 2016-06-05.
 */
var canvas = document.querySelector('.canvas');
var sizer = document.querySelector('.sizer');
var startX = '';
var startY = '';
var size = '100';
var index = 0;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createSprinkle(){
    var sprinkle = document.createElement('div');
    sprinkle.classList.add('sprinkle');
    return sprinkle;
}

function addSprinkles(target){
    var count = Math.floor(getRandomArbitrary(10,16));
    console.log(count);

    for (var i = 0; i < count; i++){
        var sprinkleWrapper = document.createElement('div');
        sprinkleWrapper.classList.add('sprinkle-wrapper');
        sprinkleWrapper.style.transform = 'rotateZ('+ i * (360/count) +'deg)';
        var sprinkle = document.createElement('div');
        sprinkle.classList.add('sprinkle');
        sprinkle.style.transform = 'rotateZ('+ i * (360/count) +'deg)';
        sprinkleWrapper.appendChild(sprinkle);
        target.appendChild(sprinkleWrapper);
    }
}

function createDonut(x,y){
    //increment the color index
    index = index < 3 ? index + 1 : 0;
    var donut = document.createElement('div');
    donut.classList.add('donut');
    donut.style.top = y + 'px';
    donut.style.left = x + 'px';
    donut.style.width = size + 'px';
    donut.style.height = size + 'px';
    var icing = document.createElement('div');
    icing.classList.add('icing');
    icing.classList.add('color-' + index);
    addSprinkles(icing);
    donut.appendChild(icing);
    canvas.appendChild(donut);
    //remove the element once the animation finishes
    setTimeout(function(){
        canvas.removeChild(donut);
    }, 900)
}

function handleMousedown(e){
    startX = e.clientX;
    startY = e.clientY;
    sizer.style.width = 0;
    sizer.style.height = 0;
    sizer.style.left = e.clientX + 'px';
    sizer.style.top = e.clientY + 'px';
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
}

function handleMousemove(e){
    sizer.classList.remove('hidden');
    var width = Math.abs(startX - e.clientX);
    var height = Math.abs(startY - e.clientY);
    size = Math.max(height, width) * 2;
    sizer.style.width = size + 'px';
    sizer.style.height = size + 'px';
    sizer.style.marginLeft = -size/2 + 'px';
    sizer.style.marginTop = -size/2 + 'px';
}

function handleMouseup(e){
    e.preventDefault();
    sizer.classList.add('hidden');
    createDonut(startX - (size/2), startY - (size/2));
    window.removeEventListener('mousemove', handleMousemove);
}

function handleClick(e){
    createDonut(canvas.offsetWidth/2 - size/2, size/2);
}

window.addEventListener('mousedown', handleMousedown);

canvas.addEventListener('touchend', handleClick);

addSprinkles(document.querySelector('.static-icing'));