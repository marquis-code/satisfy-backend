import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from '../vendor/schemas/vendor.schema';
import { Wallet, WalletSchema } from '../wallet/schemas/wallet.schema';
import { Customer, CustomerSchema } from '../customer/schemas/customer.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { VendorModule } from '../vendor/vendor.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Vendor.name, schema: VendorSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
    VendorModule,
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
