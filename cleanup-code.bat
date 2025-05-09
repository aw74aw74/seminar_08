@echo off
chcp 1251
echo Удаление неиспользуемых файлов...

rem Удаление файлов для тестирования
del /q "src\App.test.js"
del /q "src\setupTests.js"

rem Удаление файла для веб-виталов
del /q "src\reportWebVitals.js"

rem Удаление неиспользуемых CSS файлов
del /q "src\App.css"

rem Страница профиля используется в проекте, поэтому не удаляем её

rem Удаление пустых директорий
rd /s /q "src\assets\images"
rd /s /q "src\assets\styles"
rd /s /q "src\hooks"
rd /s /q "src\styles\components"
rd /s /q "src\utils"

echo Очистка завершена!
pause
