import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ImageModule } from './image.module';
import { DeliveryLocationModule } from './delivery-location/delivery-location.module';
import { PackModule } from './pack/pack.module';
import { UpdatedDeliveryLocationModule } from './deliveryLocation/delivery-location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    VendorModule,
    WalletModule,
    AuthModule,
    MenuModule,
    CategoryModule,
    OrderModule,
    ImageModule,
    DeliveryLocationModule,
    PackModule,
    UpdatedDeliveryLocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
