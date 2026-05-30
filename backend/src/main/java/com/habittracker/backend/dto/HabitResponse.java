package com.habittracker.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class HabitResponse {
    private Long id;
    private String name;
    private String description;
    private Integer streak;
    private LocalDate lastCompleted;
    private boolean completedToday;
}