# RiwiMediCare Plus - Backend API

Robust RESTful system designed to efficiently manage supply requests for medicines and medical supplies between clinics and distribution warehouses.

##  Datos del Desarrollador
* **Coder Name::** Alejandro Israel Villanueva Orozco
* **Clan:** NODE AM
* **GitHub Repository:** [https://github.com/alejandrovillanuevaorozco/PRUEBA_DESEMPENO_BACKEND.git](https://github.com/alejandrovillanuevaorozco/PRUEBA_DESEMPENO_BACKEND.git)

---

##  Tecnologías Utilizadas
🛠 Technologies Used
Runtime & Framework: Node.js, Express.js

Language: TypeScript (Strict typing and advanced interfaces)

Database & ORM: PostgreSQL, Sequelize ORM

Security & Authentication: JSON Web Token (JWT), Bcrypt (password encryption)

File Management: Multer (in-memory processing for bulk JSON seeders)

Documentation: Swagger (Swagger-JSDoc and Swagger UI Express)

Containerization: Docker and Docker Compose

---

## Project Structure

```text
├── package.json
├── package-lock.json
├── tsconfig.json
├── docker-compose.yml
├── backup_RiwiMediCare.sql
├── file.json
├── README.md
└── src
    ├── config
    │   ├── config.ts
    │   ├── cors.ts
    │   └── database.ts
    ├── controllers
    │   ├── auth.controller.ts
    │   ├── clinic.controller.ts
    │   ├── request.controller.ts
    │   ├── seeder.controller.ts
    │   └── user.controller.ts
    ├── docs
    │   └── swagger.ts
    ├── dto
    │   ├── auth.dto.ts
    │   ├── clinic.dto.ts
    │   ├── request.dto.ts
    │   └── user-response.dto.ts
    ├── error
    │   └── appError.ts
    ├── index.ts
    ├── middlewares
    │   ├── auth.middleware.ts
    │   └── upload.middleware.ts
    ├── models
    │   ├── associations.ts
    │   ├── audit.model.ts
    │   ├── clinic.model.ts
    │   ├── index.ts
    │   ├── medicine.model.ts
    │   ├── request.model.ts
    │   ├── role.model.ts
    │   ├── user.model.ts
    │   └── warehouse.model.ts
    ├── repositories
    │   ├── clinic.repository.ts
    │   ├── interfaces
    │   │   ├── role.repository.interface.ts
    │   │   └── user.repository.interface.ts
    │   ├── request.repository.ts
    │   ├── role.repository.ts
    │   └── user.repository.ts
    ├── routes
    │   ├── admin.routes.ts
    │   ├── auth.routes.ts
    │   ├── request.routes.ts
    │   ├── seeder.routes.ts
    │   └── user.routes.ts
    ├── server.ts
    └── services
        ├── auth.service.ts
        ├── clinic.service.ts
        ├── request.service.ts
        ├── seeder.service.ts
        └── user.service.ts

## ⚙️ Installation Guide

### Option A: Local Execution (Without Docker)
1. Clone the repository and navigate into the project folder:
   ```bash
   git clone [https://github.com/alejandrovillanuevaorozco/PRUEBA_DESEMPENO_BACKEND.git](https://github.com/alejandrovillanuevaorozco/PRUEBA_DESEMPENO_BACKEND.git)
   cd PRUEBA_DESEMPENO_BACKEND

Install Node.js dependencies:

Bash
npm install
Set up local environment variables by creating a .env file based on the example below.

Run the server in development mode:

Bash
npm run dev
Option B: Docker Execution (Recommended)
Ensure Docker and Docker Compose are active on your system.

Create your .env file in the project root with the required parameters.

Start the containers in the background, forcing a build:

Bash
docker-compose up -d --build
🔐 Environment Variables Example (.env)
Create a file named .env in the root directory with the following structure:

Fragmento de código
DB_CONTAINER_NAME=riwi-medicare-db
POSTGRES_USER=medicare_user
POSTGRES_PASSWORD=tu_password_segura
POSTGRES_DB=RiwiMediCare
POSTGRES_PORT=5432

APP_CONTAINER_NAME=riwi-medicare-backend
APP_PORT=3000

DB_CPU_LIMIT=2
DB_MEM_LIMIT=512MB

APP_CPU_LIMIT=2
APP_MEM_LIMIT=512MB

NODE_ENV=development

CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:4200,[https://midominio.com](https://midominio.com),[https://www.midominio.com](https://www.midominio.com)

JWT_SECRET=TuClaveSecretaSuperSegura
🚀 Running the Project
API REST Base URL: http://localhost:3000

Interactive Documentation (Swagger UI): http://localhost:3000/api/docs

📦 Loading Seeders via JSON File (Multer)
To automatically populate the database with initial data (roles, users, clinics, warehouses, and medicines):

Make sure the server and database are up and running.

Use an HTTP client tool (such as Postman or Insomnia).

Set up a POST request to the following route:
http://localhost:3000/api/seeders/load

In the Body tab, select the multipart/form-data option.

Add a key (KEY) named file, change its type to File, and upload a test .json file matching this structure:

JSON
{
  "roles": [
    { "id": 1, "name": "Administrador" },
    { "id": 2, "name": "Gestor de Solicitudes" }
  ],
  "users": [
    { "name": "Admin Principal", "email": "admin@riwi.com", "password": "123", "role_id": 1 }
  ],
  "clinics": [
    { "name": "Clínica Central", "nit": "900123456-1", "manager": "Dr. Juan Perez" }
  ],
  "warehouses": [
    { "name": "Almacén Norte", "location": "Zona Norte" }
  ],
  "medicines": [
    { "name": "Paracetamol 500mg", "description": "Caja x 100", "stock": 5000 }
  ]
}