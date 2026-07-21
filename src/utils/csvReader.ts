import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface UpdateReader {
    courseName: string;
    traineeName: string;
    empName: string;
    percentage: string;
}

export interface AddTrainingReader {
    projectName: string;
    empId: string;
    employeeName: string;
    course: string;
    trainerName: string;
    trainingType: string;
    startDate: string;
    endDate: string;
    status: string;
    percentCompleted: string;
}

export function readUpdateData(): UpdateReader[] {
    const filePath = path.join(
        process.cwd(),
        'test-data',
        'updateData.csv'
    );

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    }) as UpdateReader[];
}

export function readAddTrainingData(): AddTrainingReader[] {
    const filePath = path.join(
        process.cwd(), 'test-data', 'addEmployee.csv'
    );

    if (!fs.existsSync(filePath)) {
        throw new Error(`Add Training CSV file not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    }) as AddTrainingReader[];
}