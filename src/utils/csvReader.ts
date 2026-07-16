import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface UpdateReader {
    courseName: string;
    traineeName: string;
    empName: string;
}

export function readUpdateData(): UpdateReader[] {
    const filePath = path.join(process.cwd(), "test-data", "updateData.csv");
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return parse(fileContent, { columns: true, skip_empty_lines: true, trim: true }) as UpdateReader[];
}



