export class GetTodoDto {
  owner: string;
}

export class CreateTodoDto extends GetTodoDto {
  title: string;
  description: string;
}

export class DeleteTodoDto extends GetTodoDto {
  todoId: string;
}
