import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Headers,
  Body,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { query } from 'express';
let total = 100;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelloText(): string {
    return this.appService.getHello();
  }
  @Get('/texto')
  @HttpCode(200)
  getHello(): string {
    return 'hola texto';
  }
  @Get('/html')
  @HttpCode(201)
  getHelloHtml(): string {
    return '<h1>Hola Html</h1><button>Click</button>';
  }
  @Get('json')
  @HttpCode(200)
  getHelloJson(): string {
    return '{mensaje: "json hola"}';
  }
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }
  @Get('internal-error')
  InternalError() {
    throw new InternalServerErrorException();
  }
  @Get('setear-cookie-insegura')
  setearCookieInsegura(@Req() req, @Res() res) {
    res.cookie('galletaInsegura', 'Tengo hambre');
    res.cookie('galletaSeguraYFirmada', 'Web :3', {
      secure: true, //transimitible solo por hhtps
      signed: true, //
    });
    res.send('ok');
  }
  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    req.signedCookies.total; //verifica que exista cookies firmadas
    return mensaje;
  }
  @Get('parametros-consulta/:nombre')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  @Header('EPN', 'SISTEMAS')
  parametrosConsultaCalculadora(@Query() queryParams, @Param() params) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }
  @Post('parametros-cuerpo')
  @HttpCode(200)
  parametrosCuerpo(@Body() bodyParams, @Headers() cabecerasPeticion) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
  @Get('setear-cookie-total')
  setearCookieTotal(@Res() res) {
    try {
      if (total <= 0) {
        res.send('juego finalizado, se reseteara el valor de la cookie a 100');
        total = 100;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.send({
          'Operacion Realizada el valor de la cookie es: ': total.toString(),
        });
      }
    } catch {
      console.error();
    }
    res.cookie('galletaSeguraTotal', total, {
      signed: true, //firmada
    });
  }
  @Get('suma')
  @HttpCode(200)
  parametrosConsultaSuma(
    @Res() res,
    @Param() params,
    @Query() queryParameters,
  ) {
    // eslint-disable-next-line prefer-const
    console.log(queryParameters.num1, queryParameters.num2);
    const value1 = Number(queryParameters.num1);
    const value2 = Number(queryParameters.num2);
    total = total - (value1 + value2);
    this.setearCookieTotal(res);
  }
  @Post('resta')
  @HttpCode(200)
  parametrosConsultaResta(@Body() bodyParameters, @Res() res) {
    try {
      // eslint-disable-next-line prefer-const
      console.log(bodyParameters.num1, bodyParameters.num2);
      const value1 = Number(bodyParameters.num1);
      const value2 = Number(bodyParameters.num2);
      total = total - (value1 - value2);
      this.setearCookieTotal(res);
    } catch {
      total = 100;
      console.error();
    }
  }

  @Put('multiplica/:num1/:num2')
  @HttpCode(200)
  parametrosConsultaMultiplicacion(@Res() res, @Param() params) {
    try {
      // eslint-disable-next-line prefer-const
      console.log(params.num1, params.num2);
      const value1 = Number(params.num1);
      const value2 = Number(params.num2);
      total = total - value1 * value2;
      this.setearCookieTotal(res);
    } catch {
      total = 100;
      console.error();
    }
  }
  @Put('division/:num1/:num2')
  @HttpCode(200)
  parametrosConsultaDivision(@Res() res, @Param() params) {
    try {
      // eslint-disable-next-line prefer-const
      console.log(params.num1, params.num2);
      const value1 = Number(params.num1);
      const value2 = Number(params.num2);
      if (value2 != 0) {
        total = parseInt((total - value1 / value2).toString());
        this.setearCookieTotal(res);
      } else {
        res.send('division por 0 invalida');
      }
    } catch {
      total = 100;
      console.error();
    }
  }
}
