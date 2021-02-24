/**
 * Ajoute ou supprime la class responsive lorsqu'on click sur l'icon hamburger
 */
function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const body = document.querySelector('body')
const menu = document.querySelector(".topnav")

/**
 * Ajout l'évenement click pour ouvrir la modal
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

/**
 * Ouvre la modal
 */
function launchModal() {
  modalbg.style.display = "block"
  body.style.overflowY = 'hidden'
  if(body.offsetWidth<'540'){
    modalbg.prepend(menu)
  }
}

/**
 * Ferme la modal
 */
function closeModal() {
  modalbg.style.display = "none"
  body.removeAttribute('style')

  if(body.offsetWidth<'540'){
    body.prepend(menu)
  }
}



