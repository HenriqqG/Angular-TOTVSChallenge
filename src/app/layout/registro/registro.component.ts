import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/shared/model/cliente/cliente';
import { Telefone } from 'src/app/shared/model/telefone/telefone';
import { ClienteService } from 'src/app/shared/service/cliente.service';
// import Validation from './utils/validation';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup | any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      endereco: this.formBuilder.control(''),
      bairro: this.formBuilder.control(''),
      telefone: this.formBuilder.array([this.createItem])
    });
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get createItem(): FormControl {
    return new FormControl();
  }

  addTelefone() {
    const control = <FormArray>this.form.controls['telefone'];
    control.push(this.createItem)
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    let cliente: Cliente = new Cliente();
    cliente.nome = this.form.value.nome;
    cliente.cpf = this.form.value.cpf;
    cliente.endereco = this.form.value.endereco;
    cliente.bairro = this.form.value.bairro;

    let telefone: Telefone[] = [];
    this.form.value.telefone.forEach((element: string | undefined) => {
      let telefoneAux: Telefone = new Telefone();
      telefoneAux.numrTelefone = element;
      telefone.push(telefoneAux);
    });

    cliente.listaTelefone = telefone;

    this.clienteService.registerCliente(cliente).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(JSON.stringify(cliente, null, 2));
  }
}
