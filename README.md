This project is an Express.js API for uploading images. It utilizes `ImageKit` for image hosting and management, and `multer` for handling multipart/form-data, particularly for file uploads. The API provides endpoints for a basic health check and for uploading images with specific validation checks.

## Prerequisites

- Node.js installed on your system.
- An ImageKit account with credentials (Public Key, Private Key, and URL Endpoint).

## Installation

1. **Clone the Repository (Optional):** If the project is hosted in a repository, clone it to your local machine.

   ```bash
   git clone [repository_url]
   ```

2. **Environment Setup:**

   Create a `.env` file in the root of the project with the following variables:

   ```env
   IMAGEKIT_PUBLIC_KEY=your_public_key_here
   IMAGEKIT_PRIVATE_KEY=your_private_key_here
   IMAGEKIT_URL_ENDPOINT=your_url_endpoint_here
   ```

3. **Install Dependencies:**

   Navigate to the project directory and run the following command to install necessary packages:

   ```bash
   npm install
   ```

   This will install `express`, `imagekit`, `multer`, `cors`, and `dotenv`.

## Running the Application

1. **Start the Server:**

   In the project directory, run the following command to start the server:

   ```bash
   node index.js
   ```

2. **Accessing the Endpoints:**

   - Health Check: Visit `http://localhost:5000/` to check if the API is running.
   - Image Upload: Send a POST request to `http://localhost:5000/upload` with an image file. The image must be either JPEG or PNG format and not exceed 5MB in size.

## Usage

- **POST /upload:**

  This endpoint accepts a single image file in JPEG or PNG format. The file size should not exceed 5MB.

  Sample `curl` request:

  ```bash
  curl -X POST -F "file=@path_to_your_image.jpg" http://localhost:5000/upload
  ```

  On success, the API returns the URL of the uploaded image.

## Using the HTML Client

- **Upload Image:**

  Choose an image file (JPEG or PNG) by clicking on the "Choose an image file" button.
  Click on "Upload Image" to submit the form.
  The web page will display the uploaded image and a success message if the upload is successful, or an error message if it fails.

- **Interacting with the Server:**

  The HTML client communicates with the Express server running on http://localhost:5000.
  Ensure the server is running to use the HTML client effectively.

## Error Handling

- The API provides basic error responses for invalid file types, file size exceeding limits, and internal server errors.
