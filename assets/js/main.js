let settingIcon = document.querySelector(".setting-icon");
// show and hide setting box
settingIcon.addEventListener("click" , () => {
    document.querySelector(".fa-gear").classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("active");
});

// open the menu on small screen
let toggleIcon = document.querySelector(".landing-section .fa-bars");

toggleIcon.onclick = () => {
    // show menu 
    document.querySelector(".landing-section .menu").classList.toggle("active");
    // add clicked class to the toggle menu
    document.querySelector(".landing-section .container .fa-bars").classList.toggle("clicked");
}

// close the menu on small screen
let closeIcon = document.querySelector(".landing-section .fa-square-xmark");

closeIcon.onclick = () => {
    // close menu
    document.querySelector(".landing-section .menu").classList.toggle("active");
    // remove clicked class from the toggle menu
    document.querySelector(".landing-section .container .fa-bars").classList.toggle("clicked");
}

let colorsLi = document.querySelectorAll(".setting-option .color-options li");

if(window.localStorage.getItem("main-color")){
    // set the main color from local storage
    document.documentElement.style.setProperty("--main-color" , window.localStorage.getItem("main-color"));

    colorsLi.forEach( li => {
        li.classList.remove("selected");
        if(li.dataset.color === window.localStorage.getItem("main-color")){
            li.classList.add("selected");
        }
    });
}
// loop on color options 
colorsLi.forEach( li => {

    li.addEventListener("click" , (e) => {
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);
        // remove selected class from all color option
        colorsLi.forEach( li => {
            li.classList.remove("selected");
        });
        // add selected class to selected color
        e.target.classList.add("selected");
        // add selected color to local storage
        window.localStorage.setItem("main-color" , e.target.dataset.color);
    });
});

let imgsArray = [ "01.jpg" , "02.jpg" , "03.jpg" , "04.jpg" , "05.jpg"];

// random images function
let backgroundInterval;

backgroundInterval = setInterval(() => {
    let randomNum = Math.floor(Math.random() * imgsArray.length);
    document.querySelector(".landing-section").style.backgroundImage  = `url('assets/imgs/${imgsArray[randomNum]}')`;
} , 3000);

// random image options
let randomImageOptions = document.querySelectorAll(".background-options li");

//set random image interval
if(window.localStorage.getItem("random-image") === "yes"){

    backgroundInterval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * imgsArray.length);
        document.querySelector(".landing-section").style.backgroundImage  = `url('assets/imgs/${imgsArray[randomNum]}')`;
    } , 3000);
}
// clear random image interval
else if(window.localStorage.getItem("random-image") === "no"){

    randomImageOptions[0].classList.remove("selected");
    randomImageOptions[1].classList.add("selected");
    clearInterval(backgroundInterval);
}


randomImageOptions.forEach( li => {

    li.addEventListener("click" , (e) => {

        //remove selected class from all options
        randomImageOptions.forEach((li) => {
            li.classList.remove("selected");
        });

        if(e.target.dataset.option === "yes"){
            //set random image interval
            backgroundInterval = setInterval(() => {
                let randomNum = Math.floor(Math.random() * imgsArray.length);
                document.querySelector(".landing-section").style.backgroundImage  = `url('assets/imgs/${imgsArray[randomNum]}')`;
            } , 3000);

            // add selected option to local storage
            window.localStorage.setItem("random-image" , e.target.dataset.option);
            
            // add selected class to the selected option
            e.target.classList.add("selected");
        } 
        else if(e.target.dataset.option === "no") {
            //remove random image interval
            clearInterval(backgroundInterval);

            // add selected option to local storage
            window.localStorage.setItem("random-image" , e.target.dataset.option);

            // add selected class to the selected option
            e.target.classList.add("selected");

        }
    });
});

// main links settings 
let mainLinks = document.querySelectorAll(".main-links li a");

mainLinks.forEach(link => {

    link.addEventListener("click" , (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// bullets icon settings 
let bulletsIcons = document.querySelectorAll(".bullets-section div");

bulletsIcons.forEach( bullet => {

    bullet.addEventListener("click" , (e) => {

        // scroll to selected section
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior : "smooth"
        });

    });
});


// show & hide bullets icons
let bulletsOptions = document.querySelectorAll(".bullets-options li");

bulletsOptions.forEach( option => {

    option.addEventListener("click" , (e) => {

        if(e.target.dataset.option === "yes"){
            //show bullets icons
            document.querySelector(".bullets-section").style.display = "block";
            // set option into local storage
            window.localStorage.setItem("bullets-option" , e.target.dataset.option);
            //remove selected class from all options
            bulletsOptions.forEach(option => {
                option.classList.remove("selected");
            });
            // add selected class to the target option
            e.target.classList.add("selected");
        }
        else if(e.target.dataset.option === "no"){
            // hide bullets icons
            document.querySelector(".bullets-section").style.display = "none";
            // set option into local storage
            window.localStorage.setItem("bullets-option" , e.target.dataset.option);
            // re,ove selected class from all options
            bulletsOptions.forEach(option => {
                option.classList.remove("selected");
            });
            // add selected class to the target option
            e.target.classList.add("selected");
        }
    });
});

// check bullets option in local storage
if(window.localStorage.getItem("bullets-option") !== null){

    // show bullets icons
    if(window.localStorage.getItem("bullets-option") === "yes"){
        document.querySelector(".bullets-section").style.display = "block";
    }
    // hide bullets icons
    else if(window.localStorage.getItem("bullets-option") === "no"){
        document.querySelector(".bullets-section").style.display = "none";
        bulletsOptions[0].classList.remove("selected");  // remove selected class from option "yes"
        bulletsOptions[1].classList.add("selected");   // add selected class to option "no"
    }
}


// animate skills section 
let skillsProgress = document.querySelectorAll(".skills .progress span");

let skillsSection = document.querySelector(".skills");

window.onscroll = function (){
    if(window.pageYOffset > (skillsSection.offsetTop + skillsSection.offsetHeight - window.innerHeight)){
        skillsProgress.forEach((ele) => {
            ele.style.width = ele.dataset.progress;
        });
    }
}


let galleryImages = document.querySelectorAll(".gallery .img-box img");

galleryImages.forEach( img => {

    img.addEventListener("click" , (e) => {
        // create overlay section
        let imageOverlay = document.createElement("div");
        imageOverlay.classList.add("img-overlay");
        // add overlay section to the body
        document.body.appendChild(imageOverlay);

        // create pop-up section
        let popUpBox = document.createElement("div");
        popUpBox.classList.add("pop-up-box");
        popUpBox.innerHTML = `<span class="close-btn">x</span>
                                <div class="content">
                                    <h4>${img.alt}</h4>
                                    <img src="${img.src}">
                                </div>`;
        // add pop-up section to the body
        document.body.appendChild(popUpBox);
        
        // create close button
        let closeBtn = document.querySelector(".pop-up-box .close-btn");
        closeBtn.addEventListener("click" , (e) => {
            imageOverlay.remove();
            popUpBox.remove();
        });
    });
    
});
