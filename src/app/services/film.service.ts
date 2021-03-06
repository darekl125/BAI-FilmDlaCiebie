import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Film } from '../models/Films';

import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  filmCollection: AngularFirestoreCollection<Film>;
  films: Observable<Film[]>;

  constructor(public afs: AngularFireDatabase) { 
    this.films = this.afs.list('/films').valueChanges();
  }

  getFilms(){
    return this.films;
  }

  addUserFilm(userId: String, film: Film){
    this.afs.database.ref('/usersFilm/'+userId).push({
      id: film.id,
      tittle: film.tittle,
      imgURL: film.imgURL
    })
  }

  getUserFilms(userId: String){
    return this.afs.list('/usersFilm/'+userId).valueChanges(); 
  }

  addUserAvoidFilm(userId: String, film: Film){
    this.afs.database.ref('/userAvoidFilms/'+userId).push({
      id: film.id,
      tittle: film.tittle,
      imgURL: film.imgURL
    })
  }

  getUserAvoidFilms(userId: String){
    return this.afs.list('/userAvoidFilms/'+userId).valueChanges(); 
  }
}
