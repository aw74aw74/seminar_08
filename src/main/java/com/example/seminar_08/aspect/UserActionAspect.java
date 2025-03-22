package com.example.seminar_08.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

/**
 * Аспект для логирования действий пользователя.
 * Отслеживает вызовы методов, помеченных аннотацией {@link TrackUserAction}.
 */
@Aspect
@Component
public class UserActionAspect {

    /**
     * Метод, который перехватывает все вызовы методов с аннотацией @TrackUserAction
     * и логирует информацию о вызове.
     *
     * @param joinPoint точка присоединения
     * @return результат выполнения метода
     * @throws Throwable если произошла ошибка при выполнении метода
     */
    @Around("@annotation(com.example.seminar_08.aspect.TrackUserAction)")
    public Object logUserAction(ProceedingJoinPoint joinPoint) throws Throwable {
        // Получаем информацию о методе
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String className = methodSignature.getDeclaringType().getSimpleName();
        String methodName = methodSignature.getName();
        
        // Получаем и форматируем параметры метода
        Object[] args = joinPoint.getArgs();
        String params = Arrays.toString(args);

        // Логируем информацию перед выполнением метода
        System.out.println("=".repeat(50));
        System.out.println("Время вызова: " + LocalDateTime.now());
        System.out.println("Вызов метода: " + className + "." + methodName);
        System.out.println("Параметры: " + params);

        // Засекаем время выполнения
        long start = System.currentTimeMillis();
        Object result = null;
        try {
            // Выполняем метод
            result = joinPoint.proceed();
            return result;
        } catch (Throwable e) {
            // В случае исключения записываем его как результат
            result = "Произошла ошибка: " + e.getMessage();
            throw e;
        } finally {
            // Всегда логируем информацию о выполнении, даже при ошибке
            long executionTime = System.currentTimeMillis() - start;
            System.out.println("Результат: " + result);
            System.out.println("Время выполнения: " + executionTime + "мс");
            System.out.println("=".repeat(50));
        }
    }
}
