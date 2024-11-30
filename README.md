# Проект: ToDo List

## Описание
Это приложение представляет собой простой список задач (ToDo list), где пользователи могут создавать, просматривать и сортировать задачи. Администратор имеет возможность редактировать задачи и отмечать их как выполненные.

## Технологии
* __Backend__: Python (Flask, SQLAlchemy)
* __Frontend__: React с использованием MobX для управления состоянием
* __База данных__: SQLite (для простоты)

## Структура проекта

### Backend (Flask + SQLite)
* `app.py` - Основной файл приложения Flask.
* `models.py` - Определение моделей базы данных (задачи).
* `migrations/` - Папка для миграций базы данных.
* `config.py` - Конфигурация приложения.
* `requirements.txt` - Зависимости проекта.

### Frontend (React + MobX)
#### todo/src/
  * `index.js` - Точка входа в приложение.
  * `App.js` - Основной компонент приложения.
  * `api.js` - Настройка для `axios`.
  * `styles.module.css` - Стили для главной страницы
  * `stores/` - Хранилища `MobX` store.
  * `components/` - Папка с компонентами React.
  * `styles/` - Папка со стилями (CSS или SCSS).

## Функциональность

### Общие функции
* __Просмотр задач__: Пользователи могут просматривать список задач с пагинацией по 3 задачи на странице.

* __Сортировка задач__: Возможность сортировки задач по имени пользователя, email и статусу.

* __Создание задач__: Любой пользователь может создать новую задачу.

### Функции администратора
* __Вход__: Администратор может войти в систему с логином "admin" и паролем "123".

* __Редактирование задач__: Администратор может редактировать текст задачи.

* __Отметка выполнения__: Администратор может отметить задачу как выполненную.

