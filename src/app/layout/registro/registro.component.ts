import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  idCliente: string | null = null;

  constructor(private formBuilder: FormBuilder, private clienteService:ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.paramMap.get('id');
    if(this.idCliente){
      this.clienteService.fetchClienteById(this.idCliente).subscribe((data) => {
        this.form = this.formBuilder.group({
          nome: this.formBuilder.control(data.nome, [Validators.required, Validators.minLength(3)]),
          cpf: this.formBuilder.control(data.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
          endereco: this.formBuilder.control(data.endereco),
          bairro: this.formBuilder.control(data.bairro),
          telefone: this.formBuilder.array([])
        });
        let arrayTelefone = (data.telefones ?? []);
        if(arrayTelefone.length > 0){
          arrayTelefone.forEach((element: any) => {
            const control = <FormArray>this.form.controls['telefone'];
            control.push(new FormControl(element.numero));
          });
        }
      });
    }else{
      this.form = this.formBuilder.group({
        nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        endereco: this.formBuilder.control(''),
        bairro: this.formBuilder.control(''),
        telefone: this.formBuilder.array([this.createItem])
      });
    }
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
    if(this.idCliente){
      cliente.id = this.idCliente ? parseInt(this.idCliente) : undefined;
      cliente.nome = this.form.value.nome;
      cliente.cpf = this.form.value.cpf;
      cliente.endereco = this.form.value.endereco;
      cliente.bairro = this.form.value.bairro;
    }else{
      cliente.nome = this.form.value.nome;
      cliente.cpf = this.form.value.cpf;
      cliente.endereco = this.form.value.endereco;
      cliente.bairro = this.form.value.bairro;

      let telefone: Telefone[] = [];
      this.form.value.telefone.forEach((element: string | undefined) => {
        let telefoneAux: Telefone = new Telefone();
        telefoneAux.numero = element;
        telefone.push(telefoneAux);
      });
      cliente.telefones = telefone;
    }

    if(this.idCliente){
      this.clienteService.alterCliente(cliente).subscribe(
        (response) => {
          this.router.navigate([`../`])
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      this.clienteService.registerCliente(cliente).subscribe(
        (response) => {
          this.router.navigate([`../`], { relativeTo: this.route })
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
    }

    console.log(JSON.stringify(cliente, null, 2));
  }
}
