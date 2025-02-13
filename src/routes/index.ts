import express, { Request, Response, NextFunction, Router } from 'express';
import { UserController } from '../controller/user.controller';
import {AuthController} from '../controller/auth.controller'
const router: Router = express.Router();
import { AuthRequest, authMiddleware } from '../middleware/auth.middleware';
import { roleGuard } from '../middleware/role.guard';

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ 
    message: 'Response received successfully',
});
  
});

const userController = new UserController();
const authController=new AuthController()

// When POST request comes to /api/users
router.post('/create-admin', (req, res) => userController.createUser(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/protected', 
  authMiddleware,
  (req: AuthRequest, res) => {
    // Now TypeScript knows about req.user
   // console.log(req.user?.id);  // Using id instead of userId
    res.json({ user: req.user });
  }
);
// router.get('/create-department', 
//   authMiddleware,
//   roleGuard(['admin']),
//   (req: AuthRequest, res) => {
//     res.json({ message: 'Admin route' });
//   }
// );


export default router;