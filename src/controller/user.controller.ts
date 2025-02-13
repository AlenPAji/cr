import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import { CreateUserDto } from '../dtos/user.dto';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const userData: CreateUserDto = req.body;
      
      // Pass data to service layer
      const user = await this.userService.createUser(userData);
      
      // Send response back
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  }
}
