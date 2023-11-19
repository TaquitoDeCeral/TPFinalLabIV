import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getStoredData(): any[] {
    const storedDataString = localStorage.getItem('user_data');
    return storedDataString ? JSON.parse(storedDataString) : [];
  }

  saveDataLocally(userData: any) {
    const storedData = this.getStoredData();
    storedData.push(userData);
    localStorage.setItem('user_data', JSON.stringify(storedData));
  }
}