import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

import { TodoService } from '../../service/todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  //Parent -> Child
  @Input() todo:Todo;
  //Child -> Parent
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // Set Dynamic Classes
  setClasses(){
    let classes = {
      todo: true,
      'is-completed': this.todo.completed
    }
    return classes;
  }

  onToggle(todo: any) {
    // Toggle in the UI
    this.todo.completed = !this.todo.completed ;
    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo =>{
      console.log("todo = ", todo);
    });
  }

  onDelete(todo: any) {
    this.deleteTodo.emit(todo);
  }
}
