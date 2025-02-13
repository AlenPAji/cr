import express, { Request, Response, NextFunction, Router } from 'express';
import {AuthController} from '../controller/auth.controller'
import { DepartmentController } from '../controller/department.controller';
const router: Router = express.Router();
import { AuthRequest, authMiddleware } from '../middleware/auth.middleware';
import { roleGuard } from '../middleware/role.guard';

const departmentcontroller=new DepartmentController();




router.post('/create-department', (req, res) => departmentcontroller.createDepartment(req, res));



export default router;