const generateBtn = document.getElementById("generate-btn");
const paletterContainer = document.querySelector(".paletter-container");

generateBtn.addEventListener("click", generatePaletter);

paletterContainer.addEventListener("click", function(e) {
    if(e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue).
        then(() => showCopySuccess()).
        catch((err) => console.log(err));
    } else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        
        navigator.clipboard.writeText(hexValue).
        then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn"))).
        catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = "";
    }, 1000);
}

function generatePaletter(){
    const colors = [];

    for(let i = 0; i < 5; i++){
        colors.push(generateRandomColor());
    }

    updatePaletterDsiaply(colors);
}


function generateRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#";

    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletterDsiaply(colors){
    const colorBoxes = document.querySelectorAll(".color-box");
    //updates the colors of all the boxes using random generated color paletter value
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}