import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Formgroup de login
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email,this.dominioValidator]],
      password: ['',[Validators.required]]
    });
  }

  //Validador de dominio duocuc
  dominioValidator(control:any){
    const email = control.value;
    if (email && !email.endsWith('@duocuc.cl')){
      return{domain:true}; //La validación falló
    }
    return null; //Validacion correcta
  }

  onSubmit(){
    if(this.loginForm.valid){
      
    }
  }

  ngOnInit() {
  }

}
