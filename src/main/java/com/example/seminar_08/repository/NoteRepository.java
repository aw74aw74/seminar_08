package com.example.seminar_08.repository;

import com.example.seminar_08.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий для работы с заметками
 */
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    
    /**
     * Поиск заметки по идентификатору
     * @param id идентификатор заметки
     * @return Optional, содержащий заметку, если она найдена
     */
    Optional<Note> findById(Long id);
}
