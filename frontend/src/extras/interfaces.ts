export interface TimesheetObject {
    TimesheetId: DatesObject | number,
    AssignmentId: AssignmentsObject | number,
    PeriodEndDate: Date,
    Status: number,
    Sunday: number,
    Monday: number,
    Tuesday: number,
    Wednesday: number,
    Thursday: number,
    Friday: number,
    Saturday: number,
};

export type week = "Sunday" |
    "Monday" |
    "Tuesday" |
    "Wednesday" |
    "Thursday" |
    "Friday" |
    "Saturday" | string;

export type DatesObject = {
    label: string,
    TimesheetId: number,
    Status: number,
}


export interface AssignmentsObject {
    label?: string,
    AssignmentId?: number,
    UserId?: number,
    Email?: string,
    StartDate: string,
    EndDate: string
}
