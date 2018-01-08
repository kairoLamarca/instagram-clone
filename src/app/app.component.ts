import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { //implementa a interface OnInit e fica obrigatório implementar os métodos dela
  title = 'app';

  ngOnInit(): void {
    const config = {
      apiKey: "AIzaSyB21olT9Flx78OShJS15I6AAP6ilGnFLUs",
      authDomain: "jta-instagram-clone-c673b.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-c673b.firebaseio.com",
      projectId: "jta-instagram-clone-c673b",
      storageBucket: "jta-instagram-clone-c673b.appspot.com",
      messagingSenderId: "1091614775826"
    };

    firebase.initializeApp(config); //inicializar o firebase com as configurações de acesso do firebase
  }
}
