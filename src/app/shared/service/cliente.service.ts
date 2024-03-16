import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente/cliente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  fetchAllClientes(){
    return this.http.get<Cliente[]>(`${environment.apiUrl}/clientes`);
  }

  fetchClienteById(userIdentifier: string):Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${environment.apiUrl}/clientes/`+userIdentifier);
  }

  registerCliente(cliente: Cliente){
    return this.http.post(`${environment.apiUrl}/clientes`, cliente, {observe: "response"});
  }

  alterCliente(cliente: Cliente){
    return this.http.put(`${environment.apiUrl}/clientes/`+cliente.id, cliente, {observe: "response"});
  }

  deleteCliente(id: number | undefined){
    return this.http.delete(`${environment.apiUrl}/clientes/`+id, {observe: "response"});
  }
}
