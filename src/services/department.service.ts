import { DepartmentModel } from '../models/department.model';
import { CreateDepartmentDto } from '../dtos/department.dto';
import { UserModel } from '../models/user.model';

export class DepartmentService {
  async createDepartment(data: CreateDepartmentDto) {
    // Verify that lead exists only if leadId is provided
    if (data.leadId) {
      const lead = await UserModel.findById(data.leadId);
      if (!lead) {
        throw new Error('Department lead not found');
      }
    }

    // Verify all employees exist if provided
    if (data.employeeIds && data.employeeIds.length > 0) {
      const employees = await UserModel.find({
        _id: { $in: data.employeeIds }
      });

      if (employees.length !== data.employeeIds.length) {
        throw new Error('One or more employees not found');
      }
    }

    // Generate unique ID
    const lastDepartment = await DepartmentModel.findOne().sort({ id: -1 });
    const newId = lastDepartment ? lastDepartment.id + 1 : 1;

    // Assign newId to data
    data.id = newId;

    // Create department
    const department = new DepartmentModel(data);

    return await department.save();
  }
}
