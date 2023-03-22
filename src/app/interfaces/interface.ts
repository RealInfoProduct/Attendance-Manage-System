export interface Employee {
    id: string,
    firstname: string,
    lastname: string,
    salary: number,
    phonenumber: number,
    userId :any
}
export interface EmployeeBonus {
    id: string,
    firstName: string,
    employeeId: string,
    accountYear:string
    bonusAmount: number,
    bonusDate: string,
    userId :any
}
export interface EmployeeAbsent {
    id: string,
    firstName: string,
    accountYear:string
    dayCount: number,
    employeeId: string,
    absentDate: string
    userId :any
}
export interface EmployeeWithdrawal {
    id: string,
    firstName: string,
    accountYear:string
    employeeId: string,
    withdrawalAmount: number,
    withdrawalDate: string
    userId :any
}

export interface MachineList {
    id: string,
    firstName: string,
    accountYear:string
    employeeId: string,
    machineAmount: number,
    machineDate: string,
    userId :any
}

export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
    registerd?:boolean
}
export interface RegisterUser {
    id:string,
    email:string,
}