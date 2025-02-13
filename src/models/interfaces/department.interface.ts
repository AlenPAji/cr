export interface IDepartment {
    name: string;
    leadId?: string;      // Optional department lead
    employeeIds?: string[];  // Optional array of employees
    roles?: string[];     // Optional department roles
    description?: string; // Added optional description
    id:number
}