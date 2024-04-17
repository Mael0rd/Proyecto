import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  datos: any[];
  @ViewChild('graficoCanvas') graficoCanvas: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getGrafico();
  }

  getGrafico(): void {
    this.gService
      .getGrafico('orden/getGrafico')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any[]) => {
          this.datos = data;
          console.log(data);
          this.renderizarGrafico();
        },
        (error) => {
          console.error('Error al obtener los datos del grafico', error);
        }
      );
  }

  renderizarGrafico(): void {
    const labels = this.datos.map((item) => item.orden.id);
    const cantidad = this.datos.map((item) => item.cantidadTotal);
    const ctx = this.graficoCanvas.nativeElement.getContext('2d');
    const grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total de articulos por orden de compra',
            data: cantidad,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 40,
            title: {
              display: true,
              text: 'Articulos',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Orden N°',
            },
          },
        },
      },
    });
  }
}
