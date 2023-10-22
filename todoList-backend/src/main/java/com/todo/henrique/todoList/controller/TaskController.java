package com.todo.henrique.todoList.controller;

import com.todo.henrique.todoList.dto.TaskDto;
import com.todo.henrique.todoList.model.Task;
import com.todo.henrique.todoList.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/list")
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(taskService.listTasks());
    }

    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody TaskDto taskDto) {
        return ResponseEntity.ok(taskService.addTask(taskDto));
    }

    @PutMapping("/edit/{taskId}")
    public ResponseEntity<Task> editTask(@PathVariable("taskId") Long taskId, @RequestBody TaskDto taskDto) {
        return ResponseEntity.ok(taskService.editTask(taskId, taskDto));
    }

    @PutMapping("/finish/{taskId}")
    public ResponseEntity<Task> finishTask(@PathVariable("taskId") Long taskId) {
        return ResponseEntity.ok(taskService.finishTask(taskId));
    }

    @PutMapping("/pending/{taskId}")
    public ResponseEntity<Task> pendingTask(@PathVariable("taskId") Long taskId) {
        return ResponseEntity.ok(taskService.pendingTask(taskId));
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<Task> delete(@PathVariable("taskId") Long taskId) {
        return ResponseEntity.ok(taskService.delete(taskId));
    }

}
