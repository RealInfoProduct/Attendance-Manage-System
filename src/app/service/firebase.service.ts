import { Injectable } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
// import { from } from 'rxjs';
// import {  signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collectionData, deleteDoc, doc,Firestore, query, setDoc, updateDoc , where} from '@angular/fire/firestore';
import {  Employee, EmployeeBonus, EmployeeAbsent, EmployeeWithdrawal,  MachineList, RegisterUser  } from '../interfaces/interface';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fService:Firestore ) { }

  /////////////////////// Employee Data ////////////////////////

  // new data Employeeadd

    // add new data code here
    addEmployeeData(data: Employee) {
      data.id = doc(collection(this.fService, 'id')).id
      return addDoc(collection(this.fService, 'EmployeeList' ), data)
    }
  
    // get all data from Employee
    getAllEmployeeListData() {
      let dataRef = collection(this.fService, 'EmployeeList')
      return collectionData(dataRef, { idField: 'id' })
    }
  
    // Delete all data from Employee
    deleteEmployeeData(data: Employee) {
      let docRef = doc(collection(this.fService, 'EmployeeList' ), data.id);
      return deleteDoc(docRef)
    }
  
    // Update Invoice from Employee
    updateEmployeeData(data: Employee, Employee: any) {
      let dataRef = doc(this.fService, `EmployeeList/${data}` );
      return updateDoc(dataRef, Employee)
    }  

    /////////////////////// Employee Bonus ////////////////////////


    // add new data code here
    addEmployeeBonus(data: EmployeeBonus) {
      data.id = doc(collection(this.fService, 'id')).id
      return addDoc(collection(this.fService, 'EmployeeBonus' ), data)
    }
  
    // get all data from EmployeeBonus
    getAllEmployeeBonus() {
      let dataRef = collection(this.fService, 'EmployeeBonus' )
      return collectionData(dataRef, { idField: 'id' })
    }
  
    // Delete all data from EmployeeBonus
    deleteEmployeeBonus(data: EmployeeBonus) {
      let docRef = doc(collection(this.fService, 'EmployeeBonus' ), data.id);
      return deleteDoc(docRef)
    }
  
    // Update Invoice from EmployeeBonus
    updateEmployeeBonus(data: EmployeeBonus, Employee: any) {
      let dataRef = doc(this.fService, `EmployeeBonus/${data}`);
      return updateDoc(dataRef, Employee)
    } 
    
    
      /////////////////////// Employee Absent ////////////////////////

    // add new data code here
    addEmployeeAbsent(data: EmployeeAbsent) {
      data.id = doc(collection(this.fService, 'id')).id
      return addDoc(collection(this.fService, 'EmployeeAbsent'), data)
    }
  
    // get all data from EmployeeAbsent
    getAllEmployeeAbsent() {
      let dataRef = collection(this.fService, 'EmployeeAbsent')
      return collectionData(dataRef, { idField: 'id' })
    }
  
    // Delete all data from EmployeeAbsent
    deleteEmployeeAbsent(data: EmployeeAbsent) {
      let docRef = doc(collection(this.fService, 'EmployeeAbsent'), data.id);
      return deleteDoc(docRef)
    }
  
    // Update Invoice from EmployeeAbsent
    updateEmployeeAbsent(data: EmployeeAbsent, Employee: any) {
      let dataRef = doc(this.fService, `EmployeeAbsent/${data}`);
      return updateDoc(dataRef, Employee)
    }  



    /////////////////////// Employee Withdrawal ////////////////////////

    // add new data code here
    addEmployeeWithdrawal(data: EmployeeWithdrawal) {
      data.id = doc(collection(this.fService, 'id')).id 
      return addDoc(collection(this.fService, 'EmployeeWithdrawal'), data)
    }
  
    // get all data from EmployeeWithdrawal
    getAllEmployeeWithdrawal() {
      let dataRef = collection(this.fService, 'EmployeeWithdrawal')
      return collectionData(dataRef, { idField: 'id' })
    }
  
    // Delete all data from EmployeeWithdrawal
    deleteEmployeeWithdrawal(data: EmployeeWithdrawal) {
      let docRef = doc(collection(this.fService, 'EmployeeWithdrawal' ), data.id);
      return deleteDoc(docRef)
    }
  
    // Update Invoice from EmployeeWithdrawal
    updateEmployeeWithdrawal(data: EmployeeWithdrawal, Employee: any) {
      let dataRef = doc(this.fService, `EmployeeWithdrawal/${data}` );
      return updateDoc(dataRef, Employee)
    }  

        /////////////////////// Machine List ////////////////////////

    // add new data code here
    addMachineList(data: MachineList) {
      data.id = doc(collection(this.fService, 'id')).id 
      return addDoc(collection(this.fService, 'extraMachineSalList'), data)
    }
  
    // get all data from MachineList
    getMachineList() {
      let dataRef = collection(this.fService, 'extraMachineSalList' )
      return collectionData(dataRef, { idField: 'id' })
    }
  
    // // Delete all data from MachineList
    deleteMachineList(data: MachineList) {
      let docRef = doc(collection(this.fService, 'extraMachineSalList'), data.id);
      return deleteDoc(docRef)
    }

        /////////////////////// registerUser List ////////////////////////

    // add new data code here
    addUserList(data: RegisterUser) {
      data.id = doc(collection(this.fService, 'id')).id 
      return addDoc(collection(this.fService, 'registerUser'), data)
    }

    // get all data from registerUser
    getUserList() {
      let dataRef = collection(this.fService, 'registerUser' )
      return collectionData(dataRef, { idField: 'id' })
    }

}
