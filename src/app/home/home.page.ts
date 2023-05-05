import { Component, Inject, ViewChild } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  taskList: string[] = [];
  taskName: string = "";
  @ViewChild('taskInput') input : any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private authService: AuthService,
              private router: Router,
              private taskService: TaskService ) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.input.setFocus();
    }, 350);
  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
      this.taskService.addTask(task);
      this.taskName = "";
    }
    
  }

  async updateTask(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      { text: 'Update', handler: data => {
          this.taskList[index] = data.editTask; }
      }
     ],
    });

    await alert.present();
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

}
