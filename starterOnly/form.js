const modalContent = document.querySelector(".modal-body");
const formInscription = document.getElementById("formInscription");
const submit = document.getElementById("submitIncription");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
let modalContentHeight;

/**
 * Créer un objet pour le formulaire d'inscription qui permet de valider,
 * d'afficher les erreur ainsi que le message de succés après la soumission.
 */
class formIncription{

  /**
   * Tous les messages d'erreur et de validation
   */
  message={
    first:"Veuillez entrer 2 caractères ou plus pour le champ du Prénom.",
    last:"Veuillez entrer 2 caractères ou plus pour le champ du Nom.",
    location:"Vous devez choisir une option.",
    email:"Veuillez renseigner un email valide.",
    quantity:"Veuillez renseigner un nombre.",
    accept:"Vous devez vérifier que vous acceptez les termes et conditions.",
    birthdate:"Vous devez entrer votre date de naissance.",
    success:"Merci ! Votre réservation a été reçue.",
  }

  /**
   *
   * @param {object} formData Nodelist avec tous les élements du dom contenant la class CSS .formData
   */
  constructor(formData){
    this.formData=formData
    this.setValues(formData)
  }

  // set all inputs value
  /**
   *
   * @param {object} formData Nodelist avec tous les éléments comprenant la classe CSS .formData
   */
  setValues=(formData)=>{
    formData.forEach(elt => {
        const eltInputs = elt.getElementsByTagName('input')
        Array.from(eltInputs).forEach(input => {
            const {name,type,checked,value}=input
            switch (input.type) {
              case 'radio':
                  const radioList = document.querySelectorAll(`input[name=${input.name}]`)
                  const radioCheck = Object.entries(radioList).filter(([key,value])=>value.checked)
                  let val = false
                  if(radioCheck.length>0){
                    if(input.checked){
                      val = input.value
                      this.setValue(name,val,type)
                    }
                  }
                  else{
                    this.setValue(name,val,type)
                  }
                  break;

              case 'checkbox':
                  this.setValue(name,checked,type)
                  break;

              default:
                  this.setValue(name,value,type)
                  break;
            }
        })
    })
  }

  /**
   * Paramétrer la valeur d'un input
   * @param {string} name
   * @param {*} value
   * @param {string} type
   * @param {boolean} error
   */
  setValue=(name,value,type=null,error=false)=>{
    this.fields= {
      ...this.fields,
      [name]:{
        name,
        type,
        value,
        error
      }
    }
  }

  //set one error
  /**
   *
   * @param {number} key
   * @param {boolean} val
   */
  setError=(key,val)=>{
      this.fields= {
        ...this.fields,
        [key]:{
          ...this.fields[key],
          error:val
        }
      }
  }

  /**
   * Vérifier toutes les erreurs
   */
  verifErrors=()=>{
    let error=false
    Object.entries(this.fields).forEach(
      ([key, item]) => {
        if(item.error){
          error= true
          this.showError(item.name)
        }else{
          this.removeError(item.name)
        }
      }
    )
    return error
  }

  /**
   * Affiche une erreur
   * @param {string} name nom de l'erreur
   */
  showError=(name)=>{
    this.removeError(name)
    const formBox = formInscription.querySelector(`[name=${name}]`)
    const elt = formBox.closest('.formData')
    elt.classList.add('error')
    const content = document.createElement('span')
    content.classList.add('error')
    content.classList.add(name)
    content.innerHTML=this.message[name]
    if(name==='accept'){
      const acceptFormbox =elt.querySelector(`[for=${formBox.id}]`)
      acceptFormbox.after(content)
    }else{
      elt.append(content)
    }
  }

  //remove one error
  /**
   * supprime une erreur
   * @param {string} name nom de l'erreur
   */
  removeError=(name)=>{
    const oldElt = formInscription.querySelector(`.error.${name}`)
    if(oldElt){
      oldElt.parentNode.closest(".error").classList.remove('error')
      oldElt.remove()
    }
  }

  /**
   * supprime le message de succés
   */
  removeSuccess=()=>{
    modalContent.innerHTML=''
    modalContent.removeAttribute('style')
    modalContent.classList.remove('success')
    modalContent.append(formInscription)
    closeBtn.removeEventListener("click", this.removeSuccess);
    closeModal()
  }

  /**
   * Netoie le formulaire
   */
  clean=()=>{
    // Nettoie le formulaire
    Object.entries(formData).forEach(
      ([key, item]) => {
        const inputs = item.getElementsByTagName('input')
        Array.from(inputs).forEach(input => {
          if (['checkbox', 'radio'].includes(input.type)) {
            if ("accept" !== input.name) {
              input.checked = false
            }
          } else {
            input.value = null
          }
        });
      })
  }
  /**
   * Affiche le message de succés
   */
  showSuccess=()=>{
    modalContentHeight = modalContent.offsetHeight
    modalContent.style.minHeight = modalContentHeight+'px';
    modalContent.classList.add('success')
    modalContent.innerHTML = `<div class="successBox"><span>${this.message.success}</span></div>`

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('btn-submit', 'button')
    buttonClose.classList.add('button')
    buttonClose.textContent='Fermer'

    modalContent.append(buttonClose)
    buttonClose.onclick = () => {
      this.removeSuccess()
    }
    closeBtn.addEventListener("click", this.removeSuccess);
    this.clean()
  }

  /**
   * Vérifie que tous les inputs sont bien remplis
   */
  validate=()=>{
    const regexpAlpha = new RegExp(/^[a-zéèàùûêâçôë]{1}[a-zéèàùûêâçôë \'-]*[a-zéèàùûêâçôë]$/i)
    const regexpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    const regexpNumber = new RegExp(/^[0-9]+$/)
    Object.entries(this.fields).forEach(
      ([key, item]) => {
        if(['first','last'].includes(key)){
            this.setError(key,!regexpAlpha.test(item.value))
        }
        else if(key==='email'){
            this.setError(key,!regexpEmail.test(item.value))
        }
        else if(key==='quantity'){
            this.setError(key,!regexpNumber.test(item.value))
        }
        else if(key==='location'){
            this.setError(key,!item.value?true:false)
        }
        else if(key==='accept'){
            this.setError(key,item.value!==true?true:false)
        }
        else if(key==='birthdate'){
            this.setError(key,!item.value?true:false)
        }
      }
    );
    return !this.verifErrors()
  }
}

/**
 * Instancie l'objet formulaire "formIncription"
 */
const form = new formIncription(formData,['first','last','email','birthdate','location','accept','event'])

/**
 * Empêche la soumission par default
 */
formInscription.addEventListener("submit", function(evt) {
        evt.preventDefault();
}, false);

/**
 * Lance la validation du formulaire
 * lorsque l'utilisateur click sur le bouton c'est part
 */
function validate(){
    form.setValues(formData)
    if(form.validate()){
      form.showSuccess()
    }
    return false
}
