package com.example.trello.service;

import com.example.trello.model.Task;
import com.example.trello.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAll() {
        return repo.findAll();
    }

    public List<Task> getAllByUserId(String userId) {
        return repo.findByUserId(userId);
    }

    public Task create(Task t) {
        return repo.save(t);
    }

    public Task update(String id, Task t) {
        Task existing = repo.findById(id).orElseThrow();
        existing.setTitle(t.getTitle());
        existing.setDescription(t.getDescription());
        existing.setStatus(t.getStatus());
        return repo.save(existing);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}