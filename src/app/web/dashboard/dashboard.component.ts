import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, EmployeeBonus, EmployeeAbsent, EmployeeWithdrawal, MachineList } from 'src/app/interfaces/interface';
import { Router } from '@angular/router';
import { msgTitle } from 'src/assets/Constant/message-constant';
import { ConfirmationService, MessageService } from 'primeng/api';
import { msgType } from 'src/assets/Constant/message-constant';
import { FirebaseService } from '../../Service/firebase.service';
import { environment } from 'src/environments/environment.prod';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employeeForm: any = FormGroup;
  employeeBonusForm: any = FormGroup;
  employeeAbsentForm: any = FormGroup;
  employeeWithdrawalForm: any = FormGroup;
  machineForm: any = FormGroup;
  employeedata: any = []
  userId: any;
  absentUserId: any;
  bonuseUserId: any;
  isEdit = false;
  employeeButton = true
  employeeBonusButton = false
  empolyeeReportButton = false
  bounsboount = false
  absentButton = false
  withdrawalButton = true
  machineButton = false
  employeeList: any;
  employeeBonusList: any
  machineDataList: any
  employeeAbsentList: any
  employeeWithdrawalList: any
  isLoader: boolean = false
  item: any;
  dateRange: any
  dateRangePdf: any
  dateWiseEmployeeBonusGet: any
  dateWiseEmployeeWithdrawalGet: any
  dateWiseEmployeeAbsentGet: any
  dateWiseDataGet: any
  dateWiseExtraSalGet: any
  totalSalary: number = 0
  totalSalaryCut: number = 0
  finalAmtTotal: number = 0
  balanceAmount: number = 0
  reportSelectLastDate: any = moment().endOf('month').format("DD-MM-YYYY");
  reportSelectFirstDate: any = moment().startOf('month').format("DD-MM-YYYY");
  exportPdfObj: any = {}
  index = 0;
  bonusIndex = 0;
  accountYear: any = new Date().getFullYear()
  userLoginId = localStorage.getItem("userId")
  items : any
  constructor(
    private fb: FormBuilder,
    private firmService: FirebaseService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.employeeFormBuilder();
    this.employeeBonusFormBuilder();
    this.employeeabsentFormBuilder();
    this.employeeWithdrawalFormBuilder();
    this.machineListFormBuilder();
    this.getAllEmployeeListData()
    this.setEmployeeBonusData()
    this.setEmployeeAbsentData()
    this.setEmployeeWithdrawalData()
    this.setMachineData()

    this.items = [{
      label: 'Personal',
      routerLink: 'personal'
  },
  {
      label: 'Seat',
      routerLink: 'seat'
  },
  {
      label: 'Payment',
      routerLink: 'payment'
  },
  {
      label: 'Confirmation',
      routerLink: 'confirmation'
  }
];


  }

  employeeFormBuilder(): void {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['',],
      salary: ['', Validators.required],
      phonenumber: ['',],

    })
  }

  employeeBonusFormBuilder(): void {
    this.employeeBonusForm = this.fb.group({
      employee: [''],
      bonusAmount: ['', Validators.required],
      bonusDate: [moment().format('YYYY-MM-DD')],
    })
  }

  employeeWithdrawalFormBuilder(): void {
    this.employeeWithdrawalForm = this.fb.group({
      employee: [''],
      withdrawalAmount: ['', Validators.required],
      withdrawalDate: [moment().format('YYYY-MM-DD')],
    })
  }

  employeeabsentFormBuilder(): void {
    this.employeeAbsentForm = this.fb.group({
      absentEmployee: ['', Validators.required],
      dayCount: [1, Validators.required],
      absentDate: [moment().format('YYYY-MM-DD')],
    })
  }

  machineListFormBuilder(): void {
    this.machineForm = this.fb.group({
      machineEmployee: [''],
      machineAmount: ['', Validators.required],
      machineDate: [moment().format('YYYY-MM-DD')],
    })

  }

  submit(): void {
    const payload: Employee = {
      id: '',
      firstname: this.employeeForm.value.firstname,
      lastname: this.employeeForm.value.lastname,
      salary: this.employeeForm.value.salary,
      phonenumber: this.employeeForm.value.phonenumber,
      userId: this.userLoginId ? this.userLoginId : localStorage.getItem("userId")
    }

    if (this.userId != undefined) {

      this.firmService.updateEmployeeData(this.userId, payload).then(() => {
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.UpdateData'),
          life: 1500
        })
        // this.getAllData()
        this.getAllEmployeeListData()
        // if (environment.isLocalStorage === true) {
        //   this.getAllData()
        // }
        this.employeeForm.reset()
      })
    } else {
      this.firmService.addEmployeeData(payload).then((res) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: this.translate.instant('MSGTITLE.SUCCESS'),
            detail: this.translate.instant('COMMON_MESSAGE.SubmitData'),
            life: 1500
          })
        }
        this.employeeForm.reset()
        // if (environment.isLocalStorage === true) {
        //   this.getAllData();
        // }
      })
    }
  }

  bonusSubmit(): void {
    this.employeeBonusForm.value.employee.forEach((element: any) => {
      const data: EmployeeBonus = {
        id: '',
        firstName: element.firstname,
        employeeId: element.id,
        accountYear: this.accountYear,
        bonusAmount: this.employeeBonusForm.value.bonusAmount,
        bonusDate: this.employeeBonusForm.value.bonusDate,
        userId: this.userLoginId
      }
      this.firmService.addEmployeeBonus(data).then((res) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: this.translate.instant('MSGTITLE.SUCCESS'),
            detail: this.translate.instant('COMMON_MESSAGE.SubmitData'),
            life: 1500
          })
        }
      })
    });
    this.employeeBonusForm.controls.employee.reset()
    this.employeeBonusForm.controls.bonusAmount.reset()
    this.setEmployeeBonusData()
  }

  withdrawalSubmit(): void {
    this.employeeWithdrawalForm.value.employee.forEach((element: any) => {
      const data: EmployeeWithdrawal = {
        id: '',
        firstName: element.firstname,
        employeeId: element.id,
        accountYear: this.accountYear,
        withdrawalAmount: this.employeeWithdrawalForm.value.withdrawalAmount,
        withdrawalDate: this.employeeWithdrawalForm.value.withdrawalDate,
        userId: this.userLoginId
      }
      this.firmService.addEmployeeWithdrawal(data).then((res) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: this.translate.instant('MSGTITLE.SUCCESS'),
            detail: this.translate.instant('COMMON_MESSAGE.SubmitData'),
            life: 1500
          })
        }
      })
    });
    this.employeeWithdrawalForm.controls.employee.reset()
    this.employeeWithdrawalForm.controls.withdrawalAmount.reset()
    this.setEmployeeWithdrawalData()
  }

  absentSubmit(): void {
    this.employeeAbsentForm.value.absentEmployee.forEach((element: any) => {
      const data: EmployeeAbsent = {
        id: '',
        firstName: element.firstname,
        employeeId: element.id,
        accountYear: this.accountYear,
        dayCount: this.employeeAbsentForm.value.dayCount,
        absentDate: this.employeeAbsentForm.value.absentDate,
        userId: this.userLoginId
      }
      this.firmService.addEmployeeAbsent(data).then((res) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: this.translate.instant('MSGTITLE.SUCCESS'),
            detail: this.translate.instant('COMMON_MESSAGE.SubmitData'),
            life: 1500
          })
        }
      })
    });
    this.setEmployeeAbsentData()
    this.employeeAbsentForm.controls.absentEmployee.reset()
  }

  machineSubmit(): void {
    this.machineForm.value.machineEmployee.forEach((element: any) => {
      const data: MachineList = {
        id: '',
        firstName: element.firstname,
        employeeId: element.id,
        accountYear: this.accountYear,
        machineAmount: this.machineForm.value.machineAmount,
        machineDate: this.machineForm.value.machineDate,
        userId: this.userLoginId
      }
      this.firmService.addMachineList(data).then((res) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: this.translate.instant('MSGTITLE.SUCCESS'),
            detail: this.translate.instant('COMMON_MESSAGE.SubmitData'),
            life: 1500
          })
        }
      })
    });
    this.machineForm.controls.machineEmployee.reset()
    this.machineForm.controls.machineAmount.reset()
    this.setMachineData()
  }

  setEmployeeBonusData(): void {
    this.isLoader = true;
    this.firmService.getAllEmployeeBonus().subscribe((res) => {
      if (res) {
        this.employeeBonusList = res.filter((id: any) => id.userId === this.userLoginId)
        this.isLoader = false;
        this.defaultselectedBonusAttendanceDateRange();
      }
    })
  }

  setEmployeeAbsentData(): void {
    this.isLoader = true;
    this.firmService.getAllEmployeeAbsent().subscribe((res) => {
      if (res) {
        this.employeeAbsentList = res.filter((id: any) => id.userId === this.userLoginId)
        this.isLoader = false;
        this.defaultselectedBonusAttendanceDateRange();
      }
    })
  }

  setEmployeeWithdrawalData(): void {
    this.isLoader = true;
    this.firmService.getAllEmployeeWithdrawal().subscribe((res) => {
      if (res) {
        this.employeeWithdrawalList = res.filter((id: any) => id.userId === this.userLoginId)
        this.isLoader = false;
        this.defaultselectedBonusAttendanceDateRange();
      }
    })
  }

  setMachineData(): void {
    this.isLoader = true;
    this.firmService.getMachineList().subscribe((res) => {
      if (res) {
        this.machineDataList = res.filter((id: any) => id.userId === this.userLoginId)
        this.isLoader = false;
        this.defaultselectedBonusAttendanceDateRange();
      }
    })
  }

  deleteEmployeeData(data: any): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header: this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      accept: async () => {
        await this.firmService.deleteEmployeeData(data)
        this.getAllEmployeeListData()
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.DeletedData'),
          life: 2000
        });
      }
    })
  }

  deleteBonusData(data: any): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header: this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      accept: async () => {
        await this.firmService.deleteEmployeeBonus(data)
        this.setEmployeeBonusData()
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.DeletedData'),
          life: 2000
        });
      }
    })
  }

  deleteWithdrawalData(data: any): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header: this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      accept: async () => {
        await this.firmService.deleteEmployeeWithdrawal(data)
        this.setEmployeeWithdrawalData()
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.DeletedData'),
          life: 2000
        });
      }
    })
  }

  deleteAbsentData(data: any): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header: this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      accept: async () => {
        await this.firmService.deleteEmployeeAbsent(data)
        this.setEmployeeAbsentData()
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.DeletedData'),
          life: 2000
        });
      }
    })
  }

  deleteMachineData(data: any): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header: this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      accept: async () => {
        await this.firmService.deleteMachineList(data)
        this.setMachineData()
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.DeletedData'),
          life: 2000
        });
      }
    })
  }

  editEmployeeData(data: any): void {
    this.userId = data.id
    this.isEdit = true;
    this.employeeForm.controls['firstname'].setValue(data.firstname)
    this.employeeForm.controls['lastname'].setValue(data.lastname)
    this.employeeForm.controls['salary'].setValue(data.salary)
    this.employeeForm.controls['phonenumber'].setValue(data.phonenumber)
  }

  editBonusData(data: any): void {
    this.bonuseUserId = data.id
    this.isEdit = true;
    this.employeeBonusForm.controls['employee'].setValue(data.firstname)
    this.employeeBonusForm.controls['bonusAmount'].setValue(data.bonusAmount)
    this.employeeBonusForm.controls['bonusDate'].setValue(data.bonusDate)
  }

  editAbsentData(data: any): void {
    this.absentUserId = data.id
    this.isEdit = true;
    this.employeeAbsentForm.controls['absentDate'].setValue(data.absentDate)
  }

  employeeAdd(): void {
    this.employeeForm.reset()
    this.isEdit = false;
  }

  getAllEmployeeListData(): void {
    this.isLoader = true;
    this.firmService.getAllEmployeeListData().subscribe((res => {
      if (res) {
        this.employeeList = res.filter((id: any) => id.userId === this.userLoginId)
        this.isLoader = false;
      }
    }))
  }

  selectedDateRange(data: any): void {
    this.reportSelectFirstDate = moment(data[0]).format("DD-MM-YYYY")
    this.reportSelectLastDate = moment(data[1]).format("DD-MM-YYYY")

    if (data.every((ele: any) => ele)) {
      this.dateWiseEmployeeBonusGet = this.employeeBonusList.filter((ele: any) => {
        const date1 = moment(ele.bonusDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }

    if (data.every((ele: any) => ele)) {
      this.dateWiseEmployeeWithdrawalGet = this.employeeWithdrawalList.filter((ele: any) => {
        const date1 = moment(ele.withdrawalDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }

    if (data.every((ele: any) => ele)) {
      this.dateWiseEmployeeAbsentGet = this.employeeAbsentList.filter((ele: any) => {
        const date1 = moment(ele.absentDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }
    if (data.every((ele: any) => ele)) {
      this.dateWiseExtraSalGet = this.machineDataList.filter((ele: any) => {
        const date1 = moment(ele.machineDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }
    this.reportCalculation()
  }

  reportCalculation(): void {
    this.employeeList.forEach((element: any) => {
      const absentEmpList = this.dateWiseEmployeeAbsentGet?.filter((id: any) => id.employeeId === element.id)
      if (absentEmpList.length === 0) {
        element['absentDay'] = 0
      } else {
        element['absentDay'] = absentEmpList.map((id: any) => id.dayCount ?? 1).reduce((pre: any, next: any) => pre + next)
      }

      const bonusCount = this.dateWiseEmployeeBonusGet?.filter((id: any) => id.employeeId === element.id)
      if (bonusCount.length === 0) {
        element['totalBonusAmount'] = 0
      } else {
        element['totalBonusAmount'] = bonusCount.map((id: any) => id.bonusAmount).reduce((pre: any, next: any) => pre + next)
      }

      const withdrawalCount = this.dateWiseEmployeeWithdrawalGet?.filter((id: any) => id.employeeId === element.id)
      if (withdrawalCount.length === 0) {
        element['totalWithdrawalAmount'] = 0
      } else {
        element['totalWithdrawalAmount'] = withdrawalCount.map((id: any) => id.withdrawalAmount).reduce((pre: any, next: any) => pre + next)
      }
      const extraSalCount = this.dateWiseExtraSalGet?.filter((id: any) => id.employeeId === element.id)
      if (extraSalCount.length === 0) {
        element['totalExtraSalAmount'] = 0
      } else {
        element['totalExtraSalAmount'] = extraSalCount.map((id: any) => id.machineAmount).reduce((pre: any, next: any) => pre + next)
      }

      element['salaryCut'] = Number(((element.salary / 30) * (element.absentDay)).toFixed(2))
      element['remainSalary'] = Number((element.salary - element.salaryCut - element.totalWithdrawalAmount + element.totalExtraSalAmount).toFixed(2))
      element['finalAmount'] = Number((element.remainSalary + element.totalBonusAmount).toFixed(0))

    });
    if (this.employeeList.length != 0) {
      this.totalSalary = this.employeeList?.map((id: any) => id.salary).reduce((pre: any, next: any) => pre + next)
      this.totalSalaryCut = Number(this.employeeList.map((id: any) => id.remainSalary).reduce((pre: any, next: any) => pre + next).toFixed(2))
      // this.balanceAmount = this.employeeList.map((id:any)=> id.balance).reduce((pre: any, next: any) => pre + next)
      this.finalAmtTotal = this.employeeList.map((id: any) => id.finalAmount).reduce((pre: any, next: any) => pre + next)
    }


  }

  defaultselectedDateRange(): void {
    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.dateRange = [firstDay, lastDay];

    this.dateWiseEmployeeBonusGet = this.employeeBonusList.filter((ele: any) => {
      const date1 = moment(ele.bonusDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })


    this.dateWiseEmployeeWithdrawalGet = this.employeeWithdrawalList.filter((ele: any) => {
      const date1 = moment(ele.withdrawalDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })


    this.dateWiseEmployeeAbsentGet = this.employeeAbsentList.filter((ele: any) => {
      const date1 = moment(ele.absentDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })

    this.dateWiseExtraSalGet = this.machineDataList.filter((ele: any) => {
      const date1 = moment(ele.machineDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })

    this.reportCalculation()
  }

  pdfGenerate(): void {
    const headerName = [
      { name: "Name" },
      { name: "Salary" },
      { name: "Day" },
      { name: "Absent" },
      { name: "Upad" },
      // { name: "Cut" },
      { name: "Extra" },
      { name: "Remain" },
      { name: "Bonus" },
      { name: "Final AMT" },
      { name: "Signature" },
    ]

    const header = headerName.map((id: any) => id.name)
    const exportData: any = [];

    // const sortFirmData = this.dateWiseDataGet?.sort((a: any, b: any) => { return a.invoiceNo - b.invoiceNo })
    this.employeeList.forEach((element: any) => {
      let tempArry = [
        this.exportPdfObj.firstname = element.firstname,
        this.exportPdfObj.salary = element.salary,
        this.exportPdfObj.totalDay = 30,
        this.exportPdfObj.absent = element.absentDay,
        this.exportPdfObj.withdrawal = element.totalWithdrawalAmount,
        // this.exportPdfObj.salarycut = element.salaryCut,
        this.exportPdfObj.extraSalary = element.totalExtraSalAmount,  //(element.salary - (element.salary / 30) * (element.absentDay)).toFixed(2),
        this.exportPdfObj.remainSalary = element.remainSalary,
        this.exportPdfObj.bonusAmount = element.totalBonusAmount,
        this.exportPdfObj.finalPayble = element.finalAmount,

      ];
      exportData.push(tempArry)
    });
    const theme = {
      theme: 'grid'
    }

    let doc = new jsPDF();
    (doc as any).autoTable(header, exportData, theme)
    // this.dateRangePdf = [ 'Report Date:-  ' + this.reportSelectFirstDate ? this.reportSelectFirstDate : fday + 
    // '  To  ' + this.reportSelectLastDate ? this.reportSelectLastDate : lday ];
    this.dateRangePdf = ['Report Date:-  ' + this.reportSelectFirstDate + '  To  ' + this.reportSelectLastDate + '                         ' + 'Total Amount:- ' + this.finalAmtTotal];

    doc.setFontSize(14)
    doc.text(this.dateRangePdf, 17, 10,);
    doc.save(`${'AttendanceList'}`)
  }

  report(i: any): void {
    if (i === 0) {
      this.employeeButton = true
      this.employeeBonusButton = false
      this.empolyeeReportButton = false
    }
    if (i === 1) {
      this.employeeBonusButton = true
      this.employeeButton = false
      this.empolyeeReportButton = false
      this.defaultselectedBonusAttendanceDateRange();
    }
    if (i === 2) {
      this.employeeBonusButton = false
      this.employeeButton = false
      this.empolyeeReportButton = true
      this.defaultselectedDateRange()
    }

  }

  selectedBonusAttendanceDateRange(data: any): void {
    if (data.every((ele: any) => ele)) {
      this.dateWiseEmployeeWithdrawalGet = this.employeeWithdrawalList.filter((ele: any) => {
        const date1 = moment(ele.withdrawalDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }

    if (data.every((ele: any) => ele)) {
      this.dateWiseEmployeeAbsentGet = this.employeeAbsentList.filter((ele: any) => {
        const date1 = moment(ele.absentDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }

    if (data.every((ele: any) => ele)) {
      this.dateWiseEmployeeBonusGet = this.employeeBonusList.filter((ele: any) => {
        const date1 = moment(ele.bonusDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }

    if (data.every((ele: any) => ele)) {
      this.dateWiseExtraSalGet = this.machineDataList.filter((ele: any) => {
        const date1 = moment(ele.machineDate)
        const date2 = moment(data[0]).format("YYYY-MM-DD")
        const date3 = moment(data[1]).format("YYYY-MM-DD")

        if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
          return ele
        }
      })
    }
  }

  defaultselectedBonusAttendanceDateRange(): void {
    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.dateRange = [firstDay, lastDay];

    this.dateWiseEmployeeBonusGet = this.employeeBonusList?.filter((ele: any) => {
      const date1 = moment(ele.bonusDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })

    this.dateWiseEmployeeWithdrawalGet = this.employeeWithdrawalList?.filter((ele: any) => {
      const date1 = moment(ele.withdrawalDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })

    this.dateWiseEmployeeAbsentGet = this.employeeAbsentList?.filter((ele: any) => {
      const date1 = moment(ele.absentDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })

    this.dateWiseExtraSalGet = this.machineDataList?.filter((ele: any) => {
      const date1 = moment(ele.machineDate)
      const date2 = moment(firstDay).format("YYYY-MM-DD")
      const date3 = moment(lastDay).format("YYYY-MM-DD")

      if (date1.isBefore(date3) && date1.isAfter(date2) || (date1.isSame(date2) || date1.isSame(date3))) {
        return ele
      }
    })

  }

  bonusattendance(i: any): void {
    if (i === 0) {
      this.bounsboount = false
      this.absentButton = false
      this.withdrawalButton = true
      this.machineButton = false
    }
    if (i === 1) {
      this.bounsboount = false
      this.absentButton = true
      this.withdrawalButton = false
      this.machineButton = false
    }
    if (i === 2) {
      this.bounsboount = true
      this.absentButton = false
      this.withdrawalButton = false
      this.machineButton = false
    }
    if (i === 3) {
      this.bounsboount = false
      this.absentButton = false
      this.withdrawalButton = false
      this.machineButton = true
    }
  }

}
