import { Request, Response } from 'express';
import { DepartmentService } from '../services/department.service';
import {CreateDepartmentDto } from '../dtos/department.dto';

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService();
  }

  async createDepartment(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const departmentData: CreateDepartmentDto = req.body;
      
      // Pass data to service layer
      const user = await this.departmentService.createDepartment(departmentData);
      
      // Send response back
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create department' });
    }
  }
}
