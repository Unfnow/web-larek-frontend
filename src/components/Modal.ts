import {Component} from './base/Component'
export class Modal extends Component<object>{
    
    openModal(popup) {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this.closeModalbyESC);
        document.addEventListener('click', this.closeOverlay);
      }
      
    closeModal(popup) {
      popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', this.closeModalbyESC);
      document.removeEventListener('click', this.closeOverlay);
    }
    
    closeModalbyESC(popup) {
      if (popup.key === 'Escape') {
          this.closeModal(document.querySelector('.popup_is-opened'))
        }
    }
      
    //overlay
    closeOverlay(event) {
      if (event.target.classList.contains('popup')) {
          this.closeModal(event.target)
      }
    }
}