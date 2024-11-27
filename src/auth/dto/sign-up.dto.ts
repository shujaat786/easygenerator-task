import {IsEmail, IsNotEmpty, Matches, MinLength} from 'class-validator';

export class SignUpDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    })
    password: string;
}
