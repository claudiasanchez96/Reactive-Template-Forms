
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {

    this.crearFormulario();

  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;

  }

  get nombreNoValido() {

    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched

  }
  get apellidoNoValido() {

    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  get usuarioNoValido() {
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
  }
  get passwordNoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get password2NoValido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;
    return (pass1 === pass2) ? false : true;
  }

  get distritoNoValido() {
    const distrito = this.forma.get('direccion')?.get('distrito');
    return distrito?.invalid && distrito?.touched;
  }

  get ciudadNoValido() {
    const ciudad = this.forma.get('direccion')?.get('ciudad');
    return ciudad?.invalid && ciudad?.touched;
  }



  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario :['', ,this.validadores.existeUsuario],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      direccion: this.fb.group({
        ciudad: ['', [Validators.required]],
        distrito: ['', [Validators.required]]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();

      });

    }
  }


  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);

  }
}
