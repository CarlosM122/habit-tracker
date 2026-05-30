package com.habittracker.backend.controller;

import com.habittracker.backend.dto.HabitRequest;
import com.habittracker.backend.dto.HabitResponse;
import com.habittracker.backend.service.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*")
public class HabitController {

    private final HabitService habitService;

    public HabitController(HabitService habitService) {
        this.habitService = habitService;
    }

    @GetMapping
    public ResponseEntity<List<HabitResponse>> getMyHabits() {
        return ResponseEntity.ok(habitService.getMyHabits());
    }

    @PostMapping
    public ResponseEntity<HabitResponse> createHabit(@RequestBody HabitRequest request) {
        return ResponseEntity.ok(habitService.createHabit(request));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<HabitResponse> completeHabit(@PathVariable Long id) {
        return ResponseEntity.ok(habitService.completeHabit(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id) {
        habitService.deleteHabit(id);
        return ResponseEntity.noContent().build();
    }
}