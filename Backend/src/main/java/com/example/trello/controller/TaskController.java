package com.example.trello.controller;

import com.example.trello.model.Task;
import com.example.trello.service.TaskService;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getAll(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        return service.getAllByUserId(userId);
    }

    @PostMapping
    public Task create(@RequestBody Task t, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        t.setUserId(userId);
        return service.create(t);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable String id, @RequestBody Task t, HttpServletRequest request) {
        return service.update(id, t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}