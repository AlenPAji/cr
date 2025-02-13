import mongoose, { Schema, Document,model } from 'mongoose';
import {IDepartment} from './interfaces/department.interface'


const departmentSchema = new Schema<IDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: false  // Made optional
  },
  employeeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  roles: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true
  },
    id:{
        type:Number,
        required:true
    }
  
}, {
  timestamps: true
});



export const DepartmentModel = model<IDepartment>('Department', departmentSchema);