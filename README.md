# landmaark-backend

Backend API for property listings. Includes endpoints for adding properties, fetching dropdown filters, and filtering/searching properties.

## Setup

1. Copy `.env.example` to `.env` and fill in your MySQL credentials.
2. Run `npm install`.
3. Start server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/admin/property`: Add a property (multipart/form-data)
- `GET /api/options`: Get dropdown filter options
- `GET /api/properties`: Filter/search properties
- `GET /api/properties/:id`: Get single property by id
- `GET /api/all-properties`: Get all properties
