// Theme toggle
// firstly using "onclick" from the button. this worked.
// function themeToggle() {
// let element = document.body;
// element.classList.toggle("darktheme");
// }

// trying to convert to using event listener, i couldn't get the classlist.toggle to work.
// https://www.w3schools.com/howto/howto_js_add_class.asp
// using button
// console.log(classList);
// document.addEventListener('click', () => {
// console.log(`in the event listener: ${classList[0]}`);
// let element = document.getElementById("themeToggle");
//  //checks the classList for the class/theme as before
//  element.classList.toggle("darktheme");
// });

// finally using an input/check box as i was able to get an input using getelementbyid for another function. this worked
const toggler = document.getElementById("themeToggle");
const body = document.body;
toggler.addEventListener("input", (changeevent) => {
  const isChecked = changeevent.target.checked;
  //two options - either label is checked/clicked or not; so remove or add it
    if(isChecked) {
      body.classList.add("darktheme");
  } else {
      body.classList.remove("darktheme");
  }
});


// Creating the image slides/carousel
const carouselImages = Array.from(document.getElementsByClassName("carouselimage"));
const startButton = document.querySelector(".ctrlplay");
const pauseButton = document.querySelectorAll(".ctrlpause")[0];
const previousButton = document.querySelectorAll(".ctrlprevious")[0]; 
const nextButton = document.querySelectorAll(".ctrlnext")[0]; 
let currentImageIndex = 0;
// Add the relevant links to the page depending on the carousel image?
//https://javascript.info/keys-values-entries
//could make two areas (ids), one for project name and one for the link as ideal want slightly different styling and want to make the link into an actual a href link
let projecttextname = document.getElementById("projectIdeasname"); 
let projecttextlink = document.getElementById("projectIdeaslink");
let websitelink = document.getElementById("websitelinks");
//is it possible to make a bigger object, combining details below in projectlinks with the names, descriptions etc from the inspobox images? then the take those details out of the html. the display text will fail if i add more images or change the order.
let projectlinks = {
  "Striped cushion cover": "https://www.stoffstil.co.uk/free-patterns/cover-for-foam-cushion",
  "Tawashi sponge": "http://greenisthenewblack.fr/diy-tawashi-sponges/?lang=en", 
  "Recycled can pots": "https://diyinspired.com/recycled-can-centerpieces-with-succulents/",
  "Wooden bowl light shade": "https://makeityours.co.uk/how-to-guide/how-to-repurpose-a-wooden-bowl-into-a-lamp-shade/", 
  "Macrame and glass hanging pots": "https://www.ouibyyoplait.com/crafts/macrame-hanging-plants/"
  };

function updateImageIndex(){
  //where you are in the image list
  // console.log(`from updateimageindex fn: ${currentImageIndex}.`);
  let upperLimit = carouselImages.length -1;
  if (currentImageIndex === upperLimit) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  //should move this out to a separate function?
  // console.log(document.createTextNode(`${currentImageIndex+1} Project: ${Object.keys(projectlinks)[currentImageIndex]}\n link: ${Object.values(projectlinks)[currentImageIndex]}.`));
  projecttextname.innerHTML = `Project ${currentImageIndex+1}, ${Object.keys(projectlinks)[currentImageIndex]}:`;
  projecttextlink.innerHTML = `Website: ${Object.values(projectlinks)[currentImageIndex]}`;

  //trying the anchor link
  // console.log(`thelink: ${Object.values(projectlinks)[currentImageIndex]}`);
  let projectanchor = document.createElement("a");
  document.getElementById("projectAnchor").href = Object.values(projectlinks)[currentImageIndex];
  // this part seems to break everything:
  // websitelink.innerHTML = `${Object.values(projectlinks)[currentImageIndex]}`;
};
function updateVisibilities() {
  // the main display function: changes whether the image is shown or not
  // console.log(`from updateVisibility fn: ${currentImageIndex}.`);
  updateImageIndex();
  carouselImages.forEach((element, index)=>{
    if (index === currentImageIndex) {
      element.classList.remove("img-hidden");
      element.classList.add("img-visible");
    } 
    else {
      element.classList.remove("img-visible");
      element.classList.add("img-hidden"); 
    }
  });
}
// start and pause carousel
let carouselInterval;
const startRunning = () => {
  carouselInterval = setInterval(updateVisibilities, 2500);
}
const pauseRunning = () => {
  // console.log(`inside pause fn: ${currentImageIndex}.`);
  clearInterval(carouselInterval);
}
startButton.addEventListener("click", startRunning);
pauseButton.addEventListener("click", pauseRunning);
startRunning(); //this starts immediately
// scroll left and right through images
// I'm not sure the previous part is working correctly, need to doublecheck
function previousImage () {
  console.log(`inside previousimage fn: index ${currentImageIndex} : length ${carouselImages.length}.`);
  if (currentImageIndex === 0) {
    //if at the first image then change index so that is the last item
    console.log(`inside previmg fn, imgindex = ${currentImageIndex}`);
    currentImageIndex = carouselImages.length -1;
    // currentImageIndex = 4;
  }
  else {
    //otherwise take one away from index and go back one.
    // currentImageIndex--;
    currentImageIndex = currentImageIndex - 1;
  }
  updateVisibilities();
}
// the next function does seem to work - though it's the opposite of previous
function nextImage () {
  // console.log(`inside nextimage fn: ${currentImageIndex}.`);
  if (currentImageIndex === carouselImages.length -1) {
    //if at the last item, then set index to 0 to get the first item
    currentImageIndex = 0;    
  }
  else {
    //otherwise increase the index number
    currentImageIndex++;
  }
  updateVisibilities();
}
previousButton.addEventListener("click", previousImage);
nextButton.addEventListener("click", nextImage);
// the function to display the project
// function displayProject () {
//   projecttextname.innerHTML = `Project ${currentImageIndex+1}, ${Object.keys(projectlinks)[currentImageIndex]}:`;
//   projecttextlink.innerHTML = `Website: ${Object.values(projectlinks)[currentImageIndex]}`;

//   //trying the anchor link
//   // console.log(`thelink: ${Object.values(projectlinks)[currentImageIndex]}`);
//   let projectanchor = document.createElement("a");
//   document.getElementById("projectAnchor").href = Object.values(projectlinks)[currentImageIndex];
//   // this part seems to break everything:
//   // websitelink.innerHTML = `${Object.values(projectlinks)[currentImageIndex]}`;
// }

// Adding user website links 
// https://www.w3schools.com/js/js_htmldom_nodes.asp
// getting the elements from the input fields
let textname = document.getElementById("usersname");
let textlink = document.getElementById("userswebsite");
let textreason = document.getElementById("reason");
// function that creates the list element
document.getElementById("addWebsites").addEventListener("click", function () {
  let newListItem = document.createElement("li");
  let textCombined = document.createTextNode(`${textname.value}'s inspo website is ${textlink.value} because ${textreason.value}.`);
  // I want to make the textlink clickable 
  // https://www.w3schools.com/jsref/prop_anchor_href.asp
  // let textCombined = document.createTextNode(`${textname.value}'s inspo website is &lt;a href="${textlink.value}"&gt;${textlink.value}</a> because ${textreason.value}.`);
  newListItem.appendChild(textCombined);
  document.getElementById("inspoList").appendChild(newListItem);
});

// Creating a collapsible section
let collapse = document.getElementsByClassName("collapsible");
for (let i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}