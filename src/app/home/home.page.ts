import { Component, Inject } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  taskList: string[] = [];
  taskName: string = "";

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController) {
  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
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

}
