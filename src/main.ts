import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import any = jasmine.any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileStore = require('session-file-store')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static('publico'));
  app.use(cookieParser('Me agradan los poliperros'));
  app.use(
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: true,
      saveUnitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );

  await app.listen(3000);
}
bootstrap();
/*
//variables mutables
let variableUno = 1;
let variableDos = 2;
variableUno = 3;
variableDos = 4;
//variables inmutables
const variableTres = 5;
//variableTres = 1; error
// variables primitvas
/*const texto: string = '';
const numeroEntero: number = 1;
const numeroFloat: number = 2.2;
const VoF: boolean = true;
const noDefinido: undefined;
const noHayNada = null;
const fecha: Data = new Date();
//Duck Typing

const textoDos = 'Adrian';
let cualqueirCosa: any = "no lo se tu dime";
cualqueirCosa = 1;

class Usuario {
  constructor(public nombre: string, public apellido: string) {}
}
const usuario: Usuario = new Usuario('Erick', 'Gallardo');
usuario.nombre;
usuario.apellido;
//interface UsuarioInterface{nombre: string;apellido: string;edad?: number;}
let edadAntigua = 22;
let otraEdad = edadAntigua;
edadAntigua += 1;
otraEdad -= 1;
const objetEdd = {
  edad: 22,
};
const outranEddObjet = objetEdd;
outranEddObjet.edad = outranEddObjet.edad+1; //23
objetEdd.edad; //23
objetEdd.edad = objetEdd.edad + 1; //24
outranEddObjet.edad; //24

let otraEdadConada = { ...objetEdd };
const arregloEjemplo = [1, 2, 3];
let arregloClonado = [...arregloEjemplo];

const arregloTodo = [1, ' ', true, null, 'no lo se', 2.2];
const arregloNumero: number[] = [1, 2, 3, 4, 5];

const indice = arregloNumero.findIndex(
  (numero: number) => {
  const elValorEsIgual: boolean = numero == 3;
  return elValorEsIgual;
});
arregloNumero[indice] = 6;
//agregar al final
arregloNumero.push(6);
//agregar al inicio
arregloNumero.unshift(0);
//condicionales
const numeroOrden = 0;

if (numeroOrden) {
  console.log('Truty');
}else{
  console.log('Falsy');
}

if (1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if (-1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ("") {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ("a") {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ({}) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ({a:1}) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ({ a: 1 }) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ([]) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if (null) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if (undefined) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
*/

abstract class Nombre {
  public nombrePropiedad?: string;
  private apelliddoPropiedad?: string;
  protected edad = 1;
  static comun = 10;
  propiedadPublica: string;
  constructor(
    propiedadPublicaParametro: string,
    public propiedadRapido: string,
  ) {
    this.propiedadPublica = propiedadPublicaParametro;
    this.propiedadRapido;
  }
  public funcionPublica(parametroString: string): void {
    console.log('funcion');
  }
  private funcionPublica1(parametroString: string): number {
    console.log('funcion');
    return 0;
  }
  protected funcionPublica2(): void {
    console.log('funcion');
  }
  static funcionPublica3(parametroString: string): string {
    console.log('funcion');
    return 'funcion';
  }
}
