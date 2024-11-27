import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs_auth'), // No options needed
        ConfigModule.forRoot({
            envFilePath: './config/.env',
            isGlobal: true,              // Makes configuration globally available
        }),

        AuthModule,
    ],
})
export class AppModule {
}
