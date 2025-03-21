package com.example.seminar_08.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Модель заметки
 */
@Entity
@Data
@NoArgsConstructor
public class Note {
    
    /**
     * Уникальный идентификатор заметки
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Заголовок заметки (не может быть пустым)
     */
    @Column(nullable = false)
    private String title;

    /**
     * Содержимое заметки (не может быть пустым)
     */
    @Column(nullable = false)
    private String content;

    /**
     * Дата создания заметки (устанавливается автоматически)
     */
    private LocalDateTime createdAt;

    /**
     * Метод, вызываемый перед сохранением заметки
     * Устанавливает дату создания, если она не установлена
     */
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
