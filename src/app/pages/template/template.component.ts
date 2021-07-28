import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  }

  paises: any[] = [];

  constructor(private paisService: PaisService) {

  }

  ngOnInit(): void {

    this.paisService.getPaises().subscribe(paises => {

      this.paises = paises;


      this.paises.unshift({
        nombre: 'Seleccionar pais',
        codigo: ''
      })
      console.log(paises);

    });

  }

  guardar(forma: NgForm) {

    if (forma.invalid) {
      return Object.values(forma.controls).forEach(control => {
        control.markAllAsTouched();

      });

    }


    console.log(forma.value);

  }

}
