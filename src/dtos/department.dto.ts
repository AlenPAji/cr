export interface CreateDepartmentDto {
    name: string;
    leadId?: string;      // Optional department lead
    employeeIds?: string[];  // Optional array of employees
    roles?: string[];     // Optional department roles
    description: string;
    id?:Number // Added optional description
  }