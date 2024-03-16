import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/model/cliente/cliente';
import { ClienteService } from '../shared/service/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  idsExcluir: number[] = [];
  loading:boolean = false;
  displayedColumns: string[] = ['CPF', 'Nome', 'Editar/Excluir'];
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarTodosClientes();
  }

  carregarTodosClientes(){
    this.loading = true;
    this.clienteService.fetchAllClientes().subscribe((data) => {
      this.clientes = data;
      this.loading = false;
    });
  }

  marcarRemoverCliente(idCliente : number | undefined){
    this.idsExcluir.push(idCliente as number);
        setTimeout(() => {
            this.retiraListaExcluir(idCliente);
        }, 3000);
  }

  confirmaRemoverCliente(idCliente: number | undefined): void {
    this.removerCliente(idCliente);
    this.retiraListaExcluir(idCliente);
  }

  retiraListaExcluir(idCliente: number | undefined): void {
    const indexToExclude = this.idsExcluir.indexOf(idCliente as number);
    if (indexToExclude !== -1) {
        this.idsExcluir.splice(indexToExclude, 1);
    }
  }

  removerCliente(id: number | undefined) {
    this.clienteService.deleteCliente(id).subscribe({
        error: (err: any) => {
            console.log(err);
            this.loading = false;
        },
        complete: () => {
          console.log("Cliente removido com sucesso!");
            this.carregarTodosClientes();
        }
    });
  }

  isPresenteListaExcluir(idCliente: number | undefined): boolean {
    return this.idsExcluir.lastIndexOf(idCliente as number) > -1;
  }

}
