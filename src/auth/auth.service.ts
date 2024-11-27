import {Injectable, BadRequestException, UnauthorizedException, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {SignUpDto} from './dto/sign-up.dto';
import {SignInDto} from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name); // Scoped logger for AuthService

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {
    }

    async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
        const {email, name, password} = signUpDto;

        this.logger.log(`Received sign-up request for email: ${email}`); // Log request

        try {
            // Check if user already exists
            const existingUser = await this.userModel.findOne({email});
            if (existingUser) {
                this.logger.warn(`Sign-up failed: User already exists with email: ${email}`); // Warning log
                throw new BadRequestException('User already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            this.logger.debug(`Password hashed successfully for email: ${email}`); // Debug log

            // Create and save the user
            const user = new this.userModel({
                email,
                name,
                password: hashedPassword,
            });
            await user.save();

            this.logger.log(`User registered successfully with email: ${email}`); // Success log
            return {message: 'User registered successfully'};
        } catch (error) {
            this.logger.error(
                `Sign-up process failed for email: ${email}`,
                error.stack,
            ); // Error log
            throw error;
        }
    }

    async signIn(signInDto: SignInDto): Promise<{ token: string }> {
        const {email, password} = signInDto;

        this.logger.log(`Received sign-in request for email: ${email}`); // Log request

        try {
            // Find the user
            const user = await this.userModel.findOne({email});
            if (!user) {
                this.logger.warn(`Sign-in failed: No user found with email: ${email}`); // Warning log
                throw new UnauthorizedException('Invalid credentials');
            }

            // Validate the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Sign-in failed: Invalid password for email: ${email}`); // Warning log
                throw new UnauthorizedException('Invalid credentials');
            }

            // Generate JWT token
            const payload = {email, sub: user._id};
            const token = this.jwtService.sign(payload);

            this.logger.log(`User signed in successfully with email: ${email}`); // Success log
            return {token};
        } catch (error) {
            this.logger.error(
                `Sign-in process failed for email: ${email}`,
                error.stack,
            ); // Error log
            throw error;
        }
    }
}
