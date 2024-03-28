import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAutenticated:boolean;
  currentUser:any;
  qtyItems:Number=0;
  constructor(private cartService: CartService,  private router: Router){
    //Obtener valor actual de la cantidad de compra
    this.qtyItems=this.cartService.quantityItems()
    
  }
  ngOnInit(): void {
    //Sucripción para gestionar la cantidad de items comprados
    this.cartService.countItems.subscribe((valor)=>{
      this.qtyItems=valor
    })
    //Usuario
    this.isAutenticated=false
    this.currentUser={
      name: "Gabriel García",
      email: "ggarcia@prueba.com"
    }
  }

  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    //this.authService.logout();
    this.router.navigate(['inicio']);
  }
}
