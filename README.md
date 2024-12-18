# Microservicio Mapa

## Descripción

Este microservicio es parte de un sistema más grande que se conecta a un API Gateway, Eureka (para el descubrimiento de servicios) y un servidor de configuración. El microservicio se encarga de gestionar edificios y puntos de reciclaje en una ciudad, proporcionando endpoints para obtener información sobre estos elementos.

## Tecnologías Utilizadas

- Java 17
- Spring Boot
- Spring Cloud Netflix Eureka
- Spring Cloud Config
- Spring Data JPA
- H2 Database
- Thymeleaf

## Estructura del Proyecto

### Clases Principales

1. **MicroservicioMapaApplication**: Clase principal que inicia la aplicación Spring Boot. Implementa `CommandLineRunner` para inicializar algunos datos en la base de datos en memoria H2.

2. **MapaController**: Controlador REST que expone endpoints para obtener información sobre edificios y puntos de reciclaje.

3. **ViewController**: Controlador que maneja las vistas Thymeleaf, específicamente para mostrar el tablero de edificios.

4. **Building**: Entidad JPA que representa un edificio en la base de datos.

5. **RecyclingPoint**: Entidad JPA que representa un punto de reciclaje en la base de datos.

6. **BuildingRepository**: Repositorio JPA para la entidad `Building`.

7. **RecyclingPointRepository**: Repositorio JPA para la entidad `RecyclingPoint`.

8. **CityService**: Servicio que maneja la lógica de negocio relacionada con los edificios.

9. **ResiduosService**: Servicio que maneja la lógica de negocio relacionada con los puntos de reciclaje.

## Endpoints

### Edificios

- **GET /mapa/edificios**: Obtiene la lista de edificios.

### Puntos de Reciclaje

- **GET /mapa/residuos**: Obtiene la lista de puntos de reciclaje.

## Configuración

### application.properties

```ini
spring.application.name=microservicio-mapa
server.port=8095
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
spring.cloud.config.uri=http://localhost:8888
spring.config.import=optional:configserver:http://localhost:8888
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
spring.sql.init.mode=always
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.datasource.username=sa
spring.datasource.password=root
management.endpoints.web.exposure.include=prometheus,health,info
management.endpoint.prometheus.enabled=true
