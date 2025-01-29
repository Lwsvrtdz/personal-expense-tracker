# Expense Tracker

A modern web application built with Laravel and Vue.js for tracking personal and business expenses. The application provides intuitive expense management, category organization, and detailed financial reporting.

## Features

- **Expense Management**
  - Create, edit, and delete expenses
  - Categorize expenses with custom categories and colors
  - Add detailed descriptions and notes to expenses
  - Track expense dates and amounts

- **Category Management**
  - Create custom expense categories
  - Assign unique colors to categories for visual organization
  - Organize expenses by category

- **Comprehensive Reports**
  - Monthly expense summaries
  - Category-wise expense breakdown
  - Expense trends over time
  - Visual charts and graphs for expense analysis

- **User Interface**
  - Modern, responsive design using Tailwind CSS
  - Interactive charts using Chart.js
  - Clean and intuitive navigation
  - Real-time currency formatting

## Tech Stack

- **Backend**
  - Laravel 10
  - MySQL
  - PHP 8.1+
  - Laravel Sail (Docker)

- **Frontend**
  - Vue.js 3
  - Inertia.js
  - Tailwind CSS
  - Chart.js

## Project Structure

```
expense-tracker/
├── src/                    # Laravel application
│   ├── app/               # Application code
│   ├── config/            # Configuration files
│   ├── database/          # Database migrations and seeds
│   ├── resources/         # Frontend resources (Vue, CSS, JS)
│   ├── routes/            # Application routes
│   └── ...
├── docker-compose.yml     # Docker configuration
├── .env                   # Environment variables
└── README.md             # Project documentation
```

## Requirements

- Docker Desktop
- PHP 8.1 or higher
- Composer
- Node.js & NPM
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd expense-tracker
   ```

2. Install PHP dependencies using Laravel Sail:
   ```bash
   docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd)/src:/var/www/html" \
       -w /var/www/html \
       laravelsail/php81-composer:latest \
       composer install --ignore-platform-reqs
   ```

3. Copy the environment file:
   ```bash
   cp src/.env.example .env
   ```

4. Start the Docker containers:
   ```bash
   ./src/vendor/bin/sail up -d
   ```

5. Generate application key:
   ```bash
   ./src/vendor/bin/sail artisan key:generate
   ```

6. Run database migrations:
   ```bash
   ./src/vendor/bin/sail artisan migrate
   ```

7. Install and build frontend dependencies:
   ```bash
   ./src/vendor/bin/sail npm install
   ./src/vendor/bin/sail npm run build
   ```

## Usage

1. Start the application:
   ```bash
   ./src/vendor/bin/sail up -d
   ```

2. Access the application:
   - Open your browser and navigate to `http://localhost`
   - Register a new account or login
   - Start tracking your expenses!

## Development

- Run frontend development server:
  ```bash
  ./src/vendor/bin/sail npm run dev
  ```

- Run tests:
  ```bash
  ./src/vendor/bin/sail test
  ```

## Key Features Usage

1. **Adding Expenses**
   - Navigate to "Expenses" section
   - Click "Add New Expense"
   - Fill in expense details including amount, category, and date
   - Save the expense

2. **Creating Categories**
   - Go to "Categories" section
   - Click "Add New Category"
   - Specify category name and choose a color
   - Save the category

3. **Viewing Reports**
   - Access "Dashboard" for overview
   - Visit "Reports" section for detailed analysis
   - View monthly, category-wise, and trend reports

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contributing

Thank you for considering contributing to the Expense Tracker! Please feel free to submit pull requests or create issues for bugs and feature requests.
