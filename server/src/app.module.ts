import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReviewModule } from './modules/review/review.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/online-shop'),
    UserModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
