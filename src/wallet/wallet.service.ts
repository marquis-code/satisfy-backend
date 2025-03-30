import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './schemas/wallet.schema';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}
  async getWallet(userId: string) {
    const wallet = await this.walletModel
      .findOne({ vendorId: userId })
      .setOptions({ getters: true }); // 👈 This enables the getter

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }
}
