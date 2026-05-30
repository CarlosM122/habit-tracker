package com.habittracker.backend.service;

import com.habittracker.backend.dto.HabitRequest;
import com.habittracker.backend.dto.HabitResponse;
import com.habittracker.backend.entity.Habit;
import com.habittracker.backend.entity.User;
import com.habittracker.backend.repository.HabitRepository;
import com.habittracker.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class HabitService {

    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    public HabitService(HabitRepository habitRepository, UserRepository userRepository) {
        this.habitRepository = habitRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    private HabitResponse toResponse(Habit habit) {
        boolean completedToday = habit.getLastCompleted() != null &&
                habit.getLastCompleted().equals(LocalDate.now());
        return new HabitResponse(
                habit.getId(),
                habit.getName(),
                habit.getDescription(),
                habit.getStreak(),
                habit.getLastCompleted(),
                completedToday
        );
    }

    public List<HabitResponse> getMyHabits() {
        return habitRepository.findByUser(getCurrentUser())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public HabitResponse createHabit(HabitRequest request) {
        User user = getCurrentUser();
        Habit habit = new Habit();
        habit.setName(request.getName());
        habit.setDescription(request.getDescription());
        habit.setUser(user);
        return toResponse(habitRepository.save(habit));
    }

    public HabitResponse completeHabit(Long id) {
        User user = getCurrentUser();
        Habit habit = habitRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Hábito no encontrado"));

        LocalDate today = LocalDate.now();

        if (today.equals(habit.getLastCompleted())) {
            throw new RuntimeException("Ya completaste este hábito hoy");
        }

        if (habit.getLastCompleted() != null &&
                habit.getLastCompleted().equals(today.minusDays(1))) {
            habit.setStreak(habit.getStreak() + 1);
        } else {
            habit.setStreak(1);
        }

        habit.setLastCompleted(today);
        return toResponse(habitRepository.save(habit));
    }

    public void deleteHabit(Long id) {
        User user = getCurrentUser();
        Habit habit = habitRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Hábito no encontrado"));
        habitRepository.delete(habit);
    }
}