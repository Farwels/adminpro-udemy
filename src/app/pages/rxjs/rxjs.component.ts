import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter, retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().subscribe(
      numero => { console.log('subs', numero); },
      error => { console.log('Error en el observador', error); },
      () => console.log('El observador terminó!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if (contador === 3) {
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    })
    .pipe(retry(2))
    .pipe(map( (respuesta: any) => {
      return respuesta.valor;
    }))
    .pipe(filter( (valor, index) => {
      if ( valor % 2 === 1) {
        //impar
        return true;
      } else {
        //par
        return false;
      }
    } ));
  }

}
