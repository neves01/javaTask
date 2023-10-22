package com.todo.henrique.todoList.dto;

import com.todo.henrique.todoList.enums.StatusEnum;

public record TaskDto(String title, String description, StatusEnum status) {
}
