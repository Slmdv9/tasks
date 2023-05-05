import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData,collectionData, collection, addDoc, Firestore, setDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private auth: Auth,
              private firestore: Firestore,
              private storage: Storage ) { }

  
  addTask(
    task: string
  ) {
     addDoc(collection(this.firestore, "tasks"), {
      task
    });
  }
  
}

export interface Task {
  task: string
}