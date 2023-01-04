import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  open(icon:SweetAlertIcon,title:string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: title
    })
  }
}
