export default class Form {
    constructor(form) {
      this.form = form;
      
      this.button = this.form.querySelector('button');
    }
  
    _checkInputValidity(inputElement, errorMessageElement) {
		if (inputElement.value.length === 0) {
			errorMessageElement.textContent = 'Это обязательное поле';
			return false;
		} else if (inputElement.value.length < 2 || inputElement.value.length > 30) {
			errorMessageElement.textContent = 'Должно быть от 2 до 30 символов';
			return false;
		} else if (inputElement.validity.typeMismatch) {
			errorMessageElement.textContent = 'Не правильный формат email';
			return false;
		} 
        else if (inputElement.validity.patternMismatch){
            errorMessageElement.textContent = 'от 8 символов и без пробелов';
			return false;
        }
        
        
        else {
			errorMessageElement.textContent = '';
			return true;
		}
	}
  
    _setSubmitButtonState(){
      if (this.form.checkValidity()) {
        this._enabled();
      } else {
        this._disabled();
      }
    }
  
    setEventListeners(){
      this.form.addEventListener('input', (event) => {
        this._checkInputValidity(event.target, event.target.nextElementSibling);
        this._setSubmitButtonState();
      });
    }
  
    _checkInputsForms(){
      if (Array.from(this.form.querySelectorAll('input')).every((input) => input.value)) {
        this._enabled();
      } else {
        this._disabled();
      }
    }
  
    _errorReset(){
      this.form.querySelectorAll('span').forEach((i) => {
        const item = i;
        item.textContent = '';
      });
    }
  
    _disabled(){
      this.button.setAttribute('disabled', true);
      this.button.classList.add('button__disabled');
    }
  
    _enabled(){
      this.button.removeAttribute('disabled');
      this.button.classList.remove('button__disabled');
    }
  }