# Dynamic Data Table Manager

A full-stack application for managing dynamic data tables with advanced features like real-time search, sorting, pagination, column management, CSV import/export, inline editing, and theme toggling.

## Project Overview

This is a complete MERN-based (MongoDB, Express, React, Node.js) data management system designed to handle large datasets efficiently. The application includes a powerful backend API and a responsive frontend with Redux state management.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18
- **Database**: MongoDB 8.0 (Mongoose ODM)
- **Middleware**: CORS for cross-origin requests
- **Environment**: dotenv for configuration

### Frontend
- **Library**: React 18.3
- **Build Tool**: Vite 5.0
- **State Management**: Redux Toolkit 1.9
- **Styling**: Tailwind CSS 3.4
- **CSS Processing**: PostCSS with Autoprefixer
- **Package Manager**: npm

## Features

### Core Features
✓ **Dynamic Data Table** - Display tabular data with support for multiple columns
✓ **Sorting** - Click column headers to toggle ascending/descending sort
✓ **Global Search** - Search across all fields in real-time
✓ **Pagination** - Display 10 rows per page with navigation controls
✓ **Column Management** - Show/hide columns dynamically with modal interface
✓ **Column Persistence** - Save column visibility preferences to localStorage
✓ **Inline Editing** - Double-click rows to edit fields directly
✓ **Row Actions** - Edit and delete operations with proper handling
✓ **Delete Confirmation** - Modal popup confirmation before deleting records

### Import & Export
✓ **CSV Import** - Upload and parse CSV files to add bulk data
✓ **CSV Export** - Export current table view with only visible columns
✓ **Format Validation** - Error handling for invalid CSV formats

### UI/UX Features
✓ **Dark Mode** - Toggle between light and dark themes
✓ **Theme Persistence** - Save theme preference to localStorage
✓ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
✓ **Modal Dialogs** - Column management and delete confirmations
✓ **Input Validation** - Age must be numeric, proper error messages

## Project Structure

```
project-root/
├── Backend/
│   ├── models/
│   │   └── User.js              # MongoDB User schema
│   ├── routes/
│   │   └── users.js             # API endpoints (GET, POST, PUT, DELETE, SEARCH)
│   ├── scripts/
│   │   └── seedData.js          # Seed 500 dummy records into MongoDB
│   ├── server.js                # Express server setup & configuration
│   ├── .env                     # Environment variables (MongoDB URI, PORT)
│   └── package.json             # Backend dependencies
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                  # Top navigation with theme toggle
│   │   │   ├── DataTable.jsx              # Main table component with sorting/pagination
│   │   │   ├── TableRow.jsx               # Individual row rendering with inline editing
│   │   │   ├── ManageColumnsModal.jsx     # Column visibility management
│   │   │   ├── DeleteConfirmationModal.jsx # Delete confirmation dialog
│   │   │   ├── ImportExportButtons.jsx    # CSV import/export controls
│   │   │   ├── SearchInput.jsx            # Global search functionality
│   │   │   └── Pagination.jsx             # Pagination controls
│   │   ├── store/
│   │   │   ├── store.js                   # Redux store configuration
│   │   │   └── slices/
│   │   │       ├── tableSlice.js          # Table data & pagination state
│   │   │       ├── columnSlice.js         # Column visibility state
│   │   │       └── themeSlice.js          # Dark mode state
│   │   ├── App.jsx                        # Main application component
│   │   ├── main.jsx                       # React entry point
│   │   ├── index.css                      # Global styles & theme variables
│   │   └── api.js                         # API client for backend communication
│   ├── tailwind.config.js                 # Tailwind CSS configuration
│   ├── postcss.config.js                  # PostCSS configuration
│   ├── vite.config.js                     # Vite bundler configuration
│   ├── index.html                         # HTML template
│   └── package.json                       # Frontend dependencies
│
└── README.md                               # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud URI like MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/data-table-db
   PORT=5000
   ```
   > For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

4. Seed the database with 500 dummy records:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   > For development with auto-reload: `npm run dev`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in terminal)

The frontend will automatically connect to the backend API at `http://localhost:5000`

## Usage Guide

### Table Interactions
- **Sort**: Click on any column header to sort ascending/descending
- **Search**: Use the search bar to filter across all columns in real-time
- **Paginate**: Use the pagination buttons to navigate between pages
- **Edit**: Double-click any field to edit inline, press Enter to save or Escape to cancel
- **Delete**: Click the delete button, confirm in the modal popup

### Column Management
- Click "Manage Columns" button in the header
- Check/uncheck columns to show/hide them
- Click "Reset" to restore default columns
- Close the modal to apply changes (persisted in localStorage)

### Import/Export
- **Import CSV**: Click "Import CSV", select a .csv file from your computer
  - File format: Should have headers matching column names
  - Supported columns: name, email, age, role, department, location
- **Export CSV**: Click "Export CSV" to download current table as .csv file
  - Only visible columns are exported

### Theme
- Click the theme toggle icon (sun/moon) in the header to switch between light and dark modes
- Your preference is saved and persists across sessions

## API Endpoints

### Base URL
`http://localhost:5000/api/users`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Fetch all users with pagination, search, and sorting |
| POST | `/` | Create a new user |
| GET | `/:id` | Fetch a single user by ID |
| PUT | `/:id` | Update a user |
| DELETE | `/:id` | Delete a user |
| POST | `/import` | Bulk import users from CSV |

### Query Parameters (GET /)
- `page` (number): Page number (default: 1)
- `limit` (number): Records per page (default: 10)
- `search` (string): Search term across all fields
- `sortBy` (string): Field to sort by (default: _id)
- `order` (string): 'asc' or 'desc' (default: asc)

### Request/Response Examples

**Get users with search and sorting:**
```
GET /api/users?page=1&limit=10&search=john&sortBy=name&order=asc
```

**Create a user:**
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28,
  "role": "Developer",
  "department": "Engineering",
  "location": "New York"
}
```

**Update a user:**
```bash
PUT /api/users/64f7d1c2e5f9a1b2c3d4e5f6
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 29
}
```

**Delete a user:**
```bash
DELETE /api/users/64f7d1c2e5f9a1b2c3d4e5f6
```

## State Management (Redux)

### tableSlice.js
- `data`: Array of user records
- `filteredData`: Searched and filtered records
- `currentPage`: Active page number
- `itemsPerPage`: Records per page
- `totalRecords`: Total count for pagination
- `sortConfig`: Current sorting configuration
- `loading`: Loading state for API calls
- `editingRow`: Currently editing row ID
- `editingData`: Edited field values

### columnSlice.js
- `visibleColumns`: Array of column names to display
- `allColumns`: All available columns

### themeSlice.js
- `isDarkMode`: Dark/Light mode state
- Actions: `toggleTheme`, `loadThemeFromStorage`

## Development

### Building for Production

**Frontend:**
```bash
cd Frontend
npm run build
```
Output will be in `Frontend/dist/` directory

**Backend:**
Backend is production-ready. Use environment variables for database connection and port configuration.

### Debugging

The application includes console logging for debugging. Check browser DevTools (Frontend) and terminal (Backend) for logs.

## Features Breakdown

### Dynamic Column Management
Users can manage which columns to display without losing data. The UI remains responsive, and changes are instantly reflected in the table.

### Advanced Search
Global search filters across all columns simultaneously, providing real-time results as users type.

### Inline Editing
Double-click any cell to edit directly in the table. Validation ensures data integrity before saving.

### CSV Operations
- **Import**: Accepts .csv files and validates format before inserting into database
- **Export**: Downloads only visible columns in .csv format for easy data sharing

### Dark Mode
Complete theme support with persistent storage, ensuring the UI is comfortable in any lighting condition.

## Error Handling

- Invalid CSV format: Shows error message with details
- Duplicate email: Backend validates unique email addresses
- Age validation: Frontend ensures age is numeric
- API errors: User-friendly error messages displayed in modals
- Network errors: Automatic retry mechanism with user feedback

## Performance Considerations

- **Client-side pagination**: 10 records per page to reduce DOM rendering
- **Debounced search**: Prevents excessive API calls during typing
- **Lazy loading**: Data fetched on-demand based on current page
- **Redux persistence**: Theme and column preferences cached locally
- **Optimized re-renders**: Redux selectors prevent unnecessary component updates
