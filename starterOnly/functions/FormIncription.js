import { setValue, setError } from './setData.js'
import { showError, showSuccess } from './show.js'
import { removeError } from './remove.js'

/**
 * Créer un objet pour le formulaire d'inscription qui permet de valider,
 * d'afficher les erreur ainsi que le message de succés après la soumission.
 */
export default class FormIncription {
    /**
     *
     * @param {object} formData Nodelist avec tous les élements du dom contenant la class CSS .formData
     */
    constructor(formData) {
        this.formData = formData
        this.setValues(formData)
    }

    /**
     * set all inputs value
     * @param {object} formData Nodelist avec tous les éléments comprenant la classe CSS .formData
     */
    setValues = (formData) => {
        formData.forEach(elt => {
            const eltInputs = elt.getElementsByTagName('input')
            Array.from(eltInputs).forEach(input => {
                const { name, type, checked, value } = input
                switch (input.type) {
                    case 'radio':
                        const radioList = document.querySelectorAll(`input[name=${input.name}]`)
                        const radioCheck = Object.entries(radioList).filter(([key, value]) => value.checked)
                        let val = false
                        if (radioCheck.length > 0) {
                            if (input.checked) {
                                val = input.value
                                this.fields = setValue(this.fields,name, val, type)
                            }
                        }
                        else {
                            this.fields = setValue(this.fields,name, val, type)
                        }
                        break;

                    case 'checkbox':
                        this.fields = setValue(this.fields,name, checked, type)
                        break;

                    default:
                        this.fields = setValue(this.fields,name, value, type)
                        break;
                }
            })
        })
    }

    /**
     * Vérifier toutes les erreurs
     */
    verifErrors = () => {
        let error = false
        Object.entries(this.fields).forEach(
            ([key, item]) => {
                if (item.error) {
                    error = true
                    showError(item.name, () => removeError(item.name))
                } else {
                    removeError(item.name)
                }
            }
        )
        return error
    }

    //Affiche le message de succès
    showSuccess = () => showSuccess()

    /**
     * Vérifie que tous les inputs sont bien remplis
     */
    validate = () => {
        this.setValues(this.formData)
        const regexpAlpha = new RegExp(/^[a-zéèàùûêâçôë]{1}[a-zéèàùûêâçôë \'-]*[a-zéèàùûêâçôë]$/i)
        const regexpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
        const regexpNumber = new RegExp(/^[0-9]+$/)
        Object.entries(this.fields).forEach(
            ([key, item]) => {
                if (['first', 'last'].includes(key)) {
                    this.fields = setError(this.fields,key, !regexpAlpha.test(item.value))
                }
                else if (key === 'email') {
                    this.fields = setError(this.fields,key, !regexpEmail.test(item.value))
                }
                else if (key === 'quantity') {
                    this.fields = setError(this.fields,key, !regexpNumber.test(item.value))
                }
                else if (key === 'location') {
                    this.fields = setError(this.fields,key, !item.value ? true : false)
                }
                else if (key === 'accept') {
                    this.fields = setError(this.fields,key, item.value !== true ? true : false)
                }
                else if (key === 'birthdate') {
                    this.fields = setError(this.fields,key, !item.value ? true : false)
                }
            }
        );
        if (!this.verifErrors()){
            showSuccess()
        }
        // return !this.verifErrors()
    }
}
