import { catsData } from "/data.js"

const radiosEmotion = document.getElementById("emotion-radios")
const btnImgGet = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const modalMemeInner = document.getElementById("meme-modal-inner")
const modalMeme = document.getElementById("meme-modal")
const btnCloseModal = document.getElementById("meme-modal-close-btn")

radiosEmotion.addEventListener("change", highlightCheckedOption)
btnCloseModal.addEventListener("click", () => modalMeme.style.display = "none")
btnImgGet.addEventListener("click", renderCat)

function highlightCheckedOption(e) {
    const arrRadio = document.getElementsByClassName("radio")
    for (let radio of arrRadio) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function renderCat() {
    const objectCat = getSingleCatObject()
    modalMemeInner.innerHTML = `<img 
    class="cat-img" 
    src="./images/${objectCat.image}"
    alt="${objectCat.alt}"
    >`
    modalMeme.style.display = "flex"
}

function getSingleCatObject() {
    const arrCats = getMatchingCatsArray()
    if (arrCats) {
        if (arrCats.length === 1) {
            return arrCats[0]
        }
        else {
            return arrCats[Math.floor(Math.random() * (arrCats.length))]
        }
    }
}

function getMatchingCatsArray() {
    if (document.querySelector(`input[type="radio"]:checked`)) {
        const emotionChecked = document.querySelector(`input[type="radio"]:checked`).value
        const isChecked = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter( function(emotion) { 
            if (isChecked) {
                return emotion.emotionTags.includes(emotionChecked) && emotion.isGif
            }
            else {
                return emotion.emotionTags.includes(emotionChecked)
            } 
        })
        return matchingCatsArray
    }
}




function getEmotionsArray(cats){
    const emotionsArr = []
    for (let cat of cats) {
        // console.log(cat)
        for (let emotion of cat.emotionTags) {
            // console.log(emotion)
            if (!emotionsArr.includes(emotion)) {
                emotionsArr.push(emotion)
            }
        }
    }
    return emotionsArr
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(catsData)
    let radioItems = ``
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions">
        </div>`
    }
    radiosEmotion.innerHTML = radioItems
}


renderEmotionsRadios()