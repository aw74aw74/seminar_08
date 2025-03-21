package com.example.seminar_08.service;

import com.example.seminar_08.model.Note;
import com.example.seminar_08.repository.NoteRepository;
import com.example.seminar_08.aspect.TrackUserAction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Сервис для работы с заметками
 */
@Service
@RequiredArgsConstructor
public class NoteService {
    
    private final NoteRepository noteRepository;

    /**
     * Создание новой заметки
     * @param note заметка для создания
     * @return созданная заметка
     */
    @TrackUserAction
    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    /**
     * Получение списка всех заметок
     * @return список всех заметок
     */
    @TrackUserAction
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    /**
     * Получение заметки по идентификатору
     * @param id идентификатор заметки
     * @return Optional, содержащий заметку, если она найдена
     */
    @TrackUserAction
    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    /**
     * Обновление существующей заметки
     * @param id идентификатор заметки
     * @param updatedNote обновленная заметка
     * @return Optional, содержащий обновленную заметку, если она найдена
     */
    @TrackUserAction
    public Optional<Note> updateNote(Long id, Note updatedNote) {
        Optional<Note> existingNote = noteRepository.findById(id);
        if (existingNote.isPresent()) {
            updatedNote.setId(id);
            return Optional.of(noteRepository.save(updatedNote));
        }
        return Optional.empty();
    }

    /**
     * Удаление заметки по идентификатору
     * @param id идентификатор заметки
     */
    @TrackUserAction
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}
