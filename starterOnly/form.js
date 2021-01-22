const modalContent = document.querySelector(".modal-body");
const formInscription = document.getElementById("formInscription");
const submit = document.getElementById("submitIncription");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
//Create a object for the inscription form and validate, display error and succes answer
// need all formData in the constructor
// send validate or error after submission

class formIncription{

  //all error and success answer
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

  // Constructor
  constructor(formData){
    this.formData=formData
    this.setValues(formData)
  }

  // set all inputs value
  setValues(formData) {
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

  // set one input value
  setValue(name,value,type=null,error=false){
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
  setError(key,val){
      this.fields= {
        ...this.fields,
        [key]:{
          ...this.fields[key],
          error:val
        }
      }
  }

  // verify all errors
  verifErrors(){
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

  //show one error
  showError(name){
    console.log(name);
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
  removeError(name){
    const oldElt = formInscription.querySelector(`.error.${name}`)
    if(oldElt){
      oldElt.parentNode.closest(".error").classList.remove('error')
      oldElt.remove()
    }
  }

  //show success message
  removeSucces(){
    console.log(formInscription)
    modalContent.innerHTML=''
    modalContent.append(formInscription)
    // if(successElt){
    //   successElt.remove()
    // }
  }
  showSuccess(){
    modalContent.innerHTML = `<span>${this.message.success}</span>`

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('btn-submit')
    buttonClose.classList.add('button')
        buttonClose.textContent='Fermer'

    modalContent.append(buttonClose)
    buttonClose.onclick = ()=>{
      this.removeSucces()
      closeModal()
    }
    closeBtn.onclick=()=>{
      this.removeSucces()
      closeModal()
    }
    // this.removeSucces()

    // const btnSubmit = document.getElementById('submitIncription')
    // const content = document.createElement('p')
    // content.classList.add('success')
    // content.innerHTML=this.message.success
    // btnSubmit.before(content)
  }

  //validate all inputs fields
  validate(){
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

// instance of formInscription
const form = new formIncription(formData,['first','last','email','birthdate','location','accept','event'])

// prevent submition by default
formInscription.addEventListener("submit", function(evt) {
        evt.preventDefault();
}, false);

// function validate in "onsubmit" into the form html

function validate(toto){
    form.setValues(formData)
    if(form.validate()){
      form.showSuccess()
    }
    return false
}
