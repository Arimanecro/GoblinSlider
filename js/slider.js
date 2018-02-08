export default class GoblinSlider {

    constructor({display = 3, widthChild = 223} = {} ){

        this.display = display;
        this.widthChild = widthChild;
        this.margin = display * widthChild;

        this.wrapper = document.getElementById('wagon_container');
        this.countChildWrapper = this.wrapper.childElementCount;
        this.wrapper.setAttribute("style", "width:" + (this.countChildWrapper * this.widthChild) + "px");
        
        this.arrow_box = document.querySelector('.arrow_box');
        this.arrow_box.addEventListener("animationend", () => this.arrow_box.style = '');

        this.curtain = document.getElementById('curtain');
        this.curtain_link = this.curtain.children[0];
        this.curtain_img = this.curtain_link.children[0];

        this.direction = document.querySelector('#board > p');
        
        this.next = document.getElementById('btn_right');
        this.next.addEventListener("click", () => this.move('forward'), false);

        this.back = document.getElementById('btn_left');
        this.back.addEventListener("mousedown", () => this.move('back'), false);

    }
    
    move(direction){

        if(this.wrapper.children.length > 3) {

            let wrapperChilds = this.wrapper.children;

            if (direction == 'forward') {
                this.next.disabled= true;
                this.back.disabled= true;
                let add = [...wrapperChilds].slice(0, this.display);
                for (let n of add) {
                    let element = n.cloneNode(true);
                    this.wrapper.insertBefore(element, this.wrapper.lastElementChild.nextSibling);
                }

            }
            else {
                this.next.disabled= true;
                let add = this.reverseObject([...wrapperChilds].slice(-this.display));
                for (let n of add) {
                    let element = n.cloneNode(true);
                    this.wrapper.insertBefore(element, this.wrapper.firstElementChild);
                }
            }
            this.first = this.wrapper.firstElementChild;

            this.wrapper.firstElementChild.setAttribute("style", "margin-left: " + (-this.margin) + "px");

            this.wrapper.setAttribute("style", "width:" + (this.wrapper.childElementCount * this.widthChild) + "px;");

            this.back.addEventListener("mouseup", () => {
                this.wrapper.firstElementChild.setAttribute("style", "margin-left: " + 0 + "px");
            this.back.disabled= true;}, false);

            this.transition(direction, true );
        }
        else {
            this.incorrectCountImages();
        }



    }

    transition(direction){

        let c = 0;
        this.wrapper.firstElementChild.addEventListener("transitionend", () =>

        {

        ++c;

        if(c === 1) {
            for (let i = 0; i < this.display; i++) {

                if(direction == 'forward') {
                    this.wrapper.removeChild(this.wrapper.firstElementChild);
                }

                else if(direction == 'back') {
                    this.wrapper.removeChild(this.wrapper.lastElementChild);
                }

                this.wrapper.firstElementChild.removeAttribute("style");
            }
            this.next.disabled = false;
            this.back.disabled = false;
        }

    }, false);

    }

    incorrectCountImages(){

        return this.arrow_box.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both running';

    }

    showImage(){
        document.querySelectorAll('div.wagon.img').forEach( (img) => {
            img.addEventListener('click', () =>
        {
            this.curtain.style.left = '0px';
            this.curtain_link.setAttribute('href',this.clearPathImg(img.children[0].style.backgroundImage));
            this.curtain_img.setAttribute('src',this.clearPathImg(img.children[0].style.backgroundImage));
    },
            false) } );
    };

    clearPathImg(img){
        return 'blob:http://' + img.split('//')[1].split('"')[0];
    }
    
    reverseObject(obj) {

        let newArray =[];
        Object.keys(obj)
            .sort()
            .reverse()
            .forEach(key => {newArray.push(obj[key])});
        return newArray;
    }
}