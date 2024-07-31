# Purchase

## Демонстрация работы приложения
[ссылка](https://youtu.be/bZQWCxqK7KM) на видеоролик

## Использованные технологии:

-   [Java](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
-   [Maven](https://maven.apache.org/download.cgi)
-   [Spring Boot](https://spring.io/projects/spring-boot)
-   [JOOQ](https://www.jooq.org/)
-   [Liquibase](https://www.liquibase.org/)
-   [PostgreSQL](https://www.postgresql.org/download/)
-   [Docker](https://www.docker.com/)
-   [Swagger](https://swagger.io/)
-   [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [React](https://react.dev/)

## Запуск приложения
Пред запуском нужно использовать `jooq-codegen` для генерации сущностей. Это можно сделать через меню `maven`. Сущности должны сгенерироваться по следующему пути `/target/generated-sources/jooq/com/inline/purchase/domain`.

Для запуска бэкенда необходим Docker. В папке purchase в терминале ввести  `docker-compose up` или просто запустив `docker-compose.yml`. Для тестирования можно использовать  [Postman](https://www.postman.com/downloads/)  или  [Swagger](http://localhost:8080/swagger-ui/index.html).

## ER диаграмма бд
![enter image description here](https://sun9-42.userapi.com/impg/qlrKRXF-CkbGzZyhsv-NuM9k3IXuacTIC-a7hA/hqG0ie-w45A.jpg?size=873x455&quality=96&sign=f711a09d5b24346faec7f6f9aa27c473&type=album)
