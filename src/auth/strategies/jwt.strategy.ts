import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerService } from '../../customer/customer.service';
import { VendorService } from '../../vendor/vendor.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private vendorService: VendorService,
    private customerService: CustomerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload.sub || !payload.type) {
      throw new UnauthorizedException('Invalid token structure');
    }

    // Determine user type (vendor/customer)
    switch (payload.type) {
      case 'vendor':
        const vendor = await this.vendorService.findById(payload.sub);
        if (!vendor) throw new UnauthorizedException('Vendor not found');
        return { ...vendor, type: 'vendor' };

      case 'customer':
        const customer = await this.customerService.findById(payload.sub);
        if (!customer) throw new UnauthorizedException('Customer not found');
        return { ...customer, type: 'customer' };

      default:
        throw new UnauthorizedException('Invalid user type');
    }
  }
}
