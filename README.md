
# File Upload and Download API

-   User authentication (sign up, sign in, refresh token, logout)
-   File upload
-   File download
-   List files with pagination
-   Update and delete files
-   Secure authentication with JWT
-   CORS enabled for cross-origin requests

## Installation

1.  **Clone the repository**:

```bash
git clone https://github.com/gevorggasparyan/RestAPI_MySQL
cd RestAPI_MySQL
```

2.  **Install dependencies**:

```bash
npm install 
```

3.  **Configure environment variables**:

    Create a `.env` file in the root directory and add the following variables:

    ```
    DB_NAME=your_database
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    PORT=3000
    ```

4.  **Start MySQL server**:

    Ensure your MySQL server is running and accessible with the credentials provided in the `.env` file.

5.  **Run the application**:
```bash
npm run start
```

For development stage:
```bash
npm run dev
```


### Endpoints

-   **POST /auth/signup**: Register a new user

    -   Body: `{ "id": "user@example.com", "password": "yourpassword" }`
-   **POST /auth/signin**: Sign in an existing user

    -   Body: `{ "id": "user@example.com", "password": "yourpassword" }`
-   **POST /auth/signin/new_token**: Refresh the access token

    -   Body: `{ "refreshToken": "yourRefreshToken" }`
-   **GET /auth/info**: Get user information (requires Authorization header with Bearer token)

-   **GET /auth/logout**: Log out the user (requires Authorization header with Bearer token)

-   **POST /file/upload**: Upload a file (requires Authorization header with Bearer token)

    -   Form Data: `file: (select a file)`
-   **GET /file/list**: List all files with pagination (requires Authorization header with Bearer token)

    -   Query Params: `list_size`, `page`
-   **GET /file/download/**

    : Download a specific file (requires Authorization header with Bearer token)

-   **GET /file/**

    : Get information about a specific file (requires Authorization header with Bearer token)

-   **PUT /file/update/**

    : Update a file (requires Authorization header with Bearer token)

    -   Form Data: `file: (select a file)`
-   **DELETE /file/delete/**

    : Delete a specific file (requires Authorization header with Bearer token)
