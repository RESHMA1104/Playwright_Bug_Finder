import { faker } from '@faker-js/faker';

export interface TrainingEmployeeData {
    empId: string;
    employeeName: string;
    trainerName: string;
}

export function generateTrainingEmployeeData(): TrainingEmployeeData {
    return {
        empId: `EMP${faker.number.int({
            min: 10000,
            max: 99999
        })}`,

        employeeName: faker.person.fullName(),

        trainerName: faker.person.fullName()
    };
}