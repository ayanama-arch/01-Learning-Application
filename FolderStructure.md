# ExpressJS Backend Folder Structure - Industry Standard

## Basic Project Structure

```
project-name/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── products.js
│   │   └── index.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── emailService.js
│   │   └── paymentService.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── corsConfig.js
│   └── app.js
├── tests/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   └── routes/
│   └── fixtures/
│       └── sampleData.js
├── docs/
│   ├── api.md
│   └── setup.md
├── logs/
│   ├── access.log
│   └── error.log
├── public/
│   ├── images/
│   ├── css/
│   └── js/
├── uploads/
│   └── temp/
├── scripts/
│   ├── seed.js
│   └── migrate.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Advanced/Enterprise Structure

```
project-name/
├── src/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── controllers/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── loginController.js
│   │   │   │   │   ├── registerController.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── user/
│   │   │   │   │   ├── userController.js
│   │   │   │   │   ├── profileController.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── middleware/
│   │   │   │   ├── auth.js
│   │   │   │   ├── validation/
│   │   │   │   │   ├── userValidation.js
│   │   │   │   │   └── authValidation.js
│   │   │   │   └── index.js
│   │   │   ├── routes/
│   │   │   │   ├── auth.js
│   │   │   │   ├── users.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── v2/
│   │       └── (similar structure for API v2)
│   ├── core/
│   │   ├── database/
│   │   │   ├── connection.js
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_users_table.js
│   │   │   │   └── 002_create_products_table.js
│   │   │   └── seeders/
│   │   │       ├── userSeeder.js
│   │   │       └── productSeeder.js
│   │   ├── models/
│   │   │   ├── base/
│   │   │   │   └── BaseModel.js
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── index.js
│   │   └── repositories/
│   │       ├── BaseRepository.js
│   │       ├── UserRepository.js
│   │       └── ProductRepository.js
│   ├── services/
│   │   ├── external/
│   │   │   ├── paymentGateway.js
│   │   │   ├── emailProvider.js
│   │   │   └── smsProvider.js
│   │   ├── internal/
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   └── notificationService.js
│   │   └── index.js
│   ├── shared/
│   │   ├── constants/
│   │   │   ├── httpCodes.js
│   │   │   ├── errorMessages.js
│   │   │   └── userRoles.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── encryption.js
│   │   │   ├── dateHelper.js
│   │   │   └── responseFormatter.js
│   │   ├── exceptions/
│   │   │   ├── CustomError.js
│   │   │   ├── ValidationError.js
│   │   │   └── NotFoundError.js
│   │   └── types/
│   │       └── common.js
│   ├── config/
│   │   ├── environments/
│   │   │   ├── development.js
│   │   │   ├── production.js
│   │   │   ├── staging.js
│   │   │   └── test.js
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── swagger.js
│   │   └── index.js
│   └── app.js
├── tests/
│   ├── __mocks__/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
│   ├── integration/
│   │   ├── api/
│   │   │   ├── auth.test.js
│   │   │   └── users.test.js
│   │   └── database/
│   ├── e2e/
│   │   └── userFlow.test.js
│   ├── fixtures/
│   │   ├── users.json
│   │   └── products.json
│   ├── helpers/
│   │   ├── testDatabase.js
│   │   └── testServer.js
│   └── setup.js
├── docs/
│   ├── api/
│   │   ├── swagger.yaml
│   │   └── postman_collection.json
│   ├── deployment/
│   │   ├── docker.md
│   │   └── aws.md
│   └── development/
│       ├── setup.md
│       └── contributing.md
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── docker-compose.prod.yml
│   ├── kubernetes/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── terraform/
│       ├── main.tf
│       └── variables.tf
├── scripts/
│   ├── build.sh
│   ├── deploy.sh
│   ├── seed.js
│   ├── migrate.js
│   └── cleanup.js
├── logs/
├── uploads/
├── public/
├── .env
├── .env.example
├── .gitignore
├── .dockerignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── nodemon.json
├── package.json
├── server.js
└── README.md
```

## File Management Best Practices

### 1. **Controllers** (`src/controllers/`)

- Handle HTTP requests and responses
- Keep controllers thin - delegate business logic to services
- Follow naming convention: `resourceController.js`

```javascript
// Example: userController.js
const userService = require("../services/userService");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    return successResponse(res, user, "User retrieved successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById };
```

### 2. **Services** (`src/services/`)

- Contains business logic
- Interacts with repositories/models
- Reusable across different controllers

### 3. **Models** (`src/models/` or `src/core/models/`)

- Database schema definitions
- Model relationships
- Instance methods

### 4. **Routes** (`src/routes/` or `src/api/v1/routes/`)

- Define API endpoints
- Apply middleware
- Connect routes to controllers

```javascript
// Example: routes/users.js
const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

const router = express.Router();

router.get("/:id", auth.authenticate, userController.getUserById);
router.post("/", validation.validateUser, userController.createUser);

module.exports = router;
```

### 5. **Middleware** (`src/middleware/`)

- Authentication & authorization
- Request validation
- Error handling
- Rate limiting

### 6. **Configuration** (`src/config/`)

- Environment-specific configurations
- Database connections
- Third-party service configurations

```javascript
// Example: config/database.js
const mongoose = require("mongoose");
const config = require("./index");

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Key Principles

### 1. **Separation of Concerns**

- Each layer has a specific responsibility
- Controllers handle HTTP, Services handle business logic, Models handle data

### 2. **Modularity**

- Small, focused files
- Clear imports/exports
- Reusable components

### 3. **Scalability**

- Feature-based organization for large applications
- Versioned APIs
- Clear dependency management

### 4. **Maintainability**

- Consistent naming conventions
- Comprehensive documentation
- Automated testing structure

### 5. **Security**

- Environment variables for sensitive data
- Proper middleware organization
- Input validation separation

## File Naming Conventions

- **Controllers**: `resourceController.js` (camelCase)
- **Services**: `resourceService.js` (camelCase)
- **Models**: `Resource.js` (PascalCase)
- **Routes**: `resource.js` (lowercase)
- **Middleware**: `descriptiveName.js` (camelCase)
- **Utils**: `descriptiveName.js` (camelCase)

## Essential Files

### `server.js` (Entry Point)

```javascript
const app = require("./src/app");
const config = require("./src/config");

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### `src/app.js` (Express App Configuration)

```javascript
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routes);

// Error handling
app.use(errorHandler);

module.exports = app;
```

This structure provides a solid foundation that can scale from small projects to enterprise-level applications while maintaining code quality and developer productivity.
