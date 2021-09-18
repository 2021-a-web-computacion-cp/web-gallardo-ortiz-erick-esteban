import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { PrismaService } from './prisma.service';
//import { UsuarioModule } from './usario/usuario.module';
// decorador son funciones que hacen algo extra
// este crea una clase de nest js
@Module({
  imports: [
    //modulos imporados
    //UsuarioModule,
  ],
  controllers: [
    //controladores de este modulo
    AppController,
  ],
  providers: [
    //servicios de este modulo
    AppService,
    //PrismaService,
  ],
  exports: [
    //servicions exportados de este modulo
    AppService,
  ],
})
export class AppModule {}
