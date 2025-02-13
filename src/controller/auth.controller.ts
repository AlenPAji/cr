import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { MailService } from '../services/mail.service';


export class AuthController {
  private authService: AuthService;

  constructor() {
    const mailService = new MailService();
    this.authService = new AuthService(mailService);
  }

  async login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Validate user credentials
        const validatedUser = await this.authService.validateUser(email, password);

        // Generate tokens
        const tokens = await this.authService.generateTokens(validatedUser);

        res.json({
            user: validatedUser,
            ...tokens
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'An unknown error occurred' });
        }
    }
}


async refreshToken(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;

        // Validate refresh token
        const validatedUser = await this.authService.validateRefreshToken(refreshToken);

        // Generate new tokens
        const tokens = await this.authService.generateTokens(validatedUser);

        res.json(tokens);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'An unknown error occurred' });
        }
    }
}

}
