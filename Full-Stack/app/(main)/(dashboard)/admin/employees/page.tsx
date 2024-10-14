// page.js

import { PrismaClient } from '@prisma/client';
import {DataTable} from './_components/data-table';
import { columns } from './_components/columns';

const prisma = new PrismaClient();

const EmployeesPage = async () => {
  // Fetch employees from the database
  const employees = await prisma.employee.findMany();

  return (
    <div className="p-6 md:p-12 bg-secondary/50 text-secondary-foreground min-h-[calc(100vh-80px)] md:rounded-tl-3xl">
      <div className="flex flex-col mb-8 gap-2">
        <h1 className="text-4xl font-bold">All Employees</h1>
        <p className="text-muted-foreground">
          Here is a list of all employees
        </p>
      </div>
      <DataTable columns={columns} data={employees} />
    </div>
  );
};

export default EmployeesPage;
