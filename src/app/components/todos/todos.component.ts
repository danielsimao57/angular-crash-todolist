import { Component, OnInit } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import {Todo} from '../../models/Todo'

import{TodoService} from '../../service/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  // Constructor is use to import services
  constructor(private todoService: TodoService) {}

  // Live cicle
  ngOnInit(){
    this.todoService.getTodos().subscribe(todos =>{
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo){
    //Remove from UI
    this.todos = this.todos.filter(t =>{
      t.id !== todo.id
      //Remove from server
      this.todoService.deleteTodo(todo).subscribe();
    })
  }

  addTodo(todo: Todo){
    this.todoService.addTodo(todo).subscribe(todo =>{
      this.todos.push(todo);
    })
  }

}
