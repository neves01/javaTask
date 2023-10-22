package com.todo.henrique.todoList.service;

import com.todo.henrique.todoList.dto.TaskDto;
import com.todo.henrique.todoList.enums.StatusEnum;
import com.todo.henrique.todoList.model.Task;
import com.todo.henrique.todoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    public Task addTask(TaskDto taskDto) {
        Task task = new Task(taskDto.title(), taskDto.description(), StatusEnum.PENDING);
        return taskRepository.save(task);
    }

    public Task editTask(long taskId, TaskDto taskDto) {
        Task updatedTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("ERROR: Task not found!"));
        updatedTask.setDescription(taskDto.description());
        updatedTask.setStatus(taskDto.status());
        updatedTask.setTitle(taskDto.title());
        return taskRepository.save(updatedTask);
    }

    public Task finishTask(long taskId) {
        Task updatedTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("ERROR: Task not found!"));
        updatedTask.setStatus(StatusEnum.COMPLETED);
        return taskRepository.save(updatedTask);
    }

    public Task pendingTask(long taskId) {
        Task updatedTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("ERROR: Task not found!"));
        updatedTask.setStatus(StatusEnum.PENDING);
        return taskRepository.save(updatedTask);
    }

    public Task delete(Long taskId) {
        Task deletedTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("ERROR: Task not found!"));
        taskRepository.delete(deletedTask);
        return deletedTask;
    }
}
