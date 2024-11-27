import {Controller, Post, Body, UseGuards, Request, Get, Logger} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignUpDto} from './dto/sign-up.dto';
import {SignInDto} from './dto/sign-in.dto';
import {JwtAuthGuard} from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name); // Scoped logger for AuthController

    constructor(private readonly authService: AuthService) {
    }

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
        this.logger.log('Entering the signUp method');
        this.logger.log('Received request to sign up'); // Log request
        this.logger.debug(`Sign-up payload: ${JSON.stringify(signUpDto)}`); // Debug-level log
        try {
            const result = await this.authService.signUp(signUpDto);
            this.logger.log(`User signed up successfully: ${signUpDto.email}`); // Success log
            return result;
        } catch (error) {
            this.logger.error(
                `Failed to sign up user: ${signUpDto.email}`,
                error?.stack || JSON.stringify(error),
            ); // Error log
            throw error; // Ensure the error is re-thrown
        }
    }


    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        this.logger.log('Received request to sign in'); // Log request
        this.logger.debug(`Sign-in payload: ${JSON.stringify(signInDto)}`); // Debug-level log
        try {
            const result = await this.authService.signIn(signInDto);
            this.logger.log(`User signed in successfully: ${signInDto.email}`); // Success log
            return result;
        } catch (error) {
            this.logger.error(
                `Failed to sign in user: ${signInDto.email}`,
                error.stack,
            ); // Error log
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        this.logger.log(`Fetching profile for user: ${req.user?.email}`); // Log request
        this.logger.debug(`User payload from token: ${JSON.stringify(req.user)}`); // Debug-level log
        return req.user;
    }
}
