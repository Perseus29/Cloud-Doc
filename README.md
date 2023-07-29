# Cloud-Doc
Cloud-Doc is a real-time collaborative document editing application that enables users to create, edit, and share documents seamlessly. With CloudText, multiple users can collaborate on the same document simultaneously, making it a powerful tool for team collaboration, note-taking, and brainstorming sessions.

# Here is the link to video demonstartion
- [Video](https://drive.google.com/file/d/1xepCZady0kbbtyBRMrpeH31dW3JL2XNq/view?usp=sharing)

Here is the link to website
- [Cloud-Doc website](https://cloud-doc.netlify.app/)

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Javascript
- HTML
- CSS
- Ejs

## Features
- **File Upload**: Users can easily upload files from their local machine to the web application.
- **Download Anywhere**: Users can download their files from anywhere by using the generated download link.
- **Email Sharing**: Users can provide an email address to which the download link will be sent, allowing easy sharing with others.
- **Secure Links**: Each uploaded file receives a unique and secure link, ensuring privacy and preventing unauthorized access.
- **Responsive Design**: The web application is designed to be responsive and user-friendly across different devices.



## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

To run this project, you must have the following installed:

- Node.js and npm (Node Package Manager)

### Installation

1. Clone this repository to your local machine using Git.
   ```bash
   git clone https://github.com/Perseus29/CloudShare.git
   ```

2. Navigate to the project's directory.


3. Install the required dependencies.
   ```bash
   npm install
   ```

## Configuration

Before running the application, you need to set up some configuration variables. Create a `.env` file in the project directory and add the following:

```env
APP_BASE_URL=http://localhost:4000
db_url=your-mongodb-url
SMTP_HOST=your-smtp-host
SMTP_PORT=your-smtp-port
MAIL_USER=your-smtp-username
MAIL_PASS=your-smtp-password
```

Make sure to replace the placeholder values (`your-smtp-host`, `your-smtp-port`, `your-smtp-username`, `your-smtp-password` , `your-mongodb-url`) with your actual SMTP server and mongodb atlas details for email and database functionality.

## Usage

Start the server
```bash
  npm start
```

3. Open your web browser and go to `http://localhost:4000` to access the FileShare web application.



## Contribution

Contributions are always welcome!

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Feedback

If you have any feedback or want to see any feature live, please reach out to me at newbalance480@gmail.com

## Screenshots

![Home Page](https://github.com/Perseus29/CloudShare/assets/94976184/8a730a0c-cbf6-4849-9e7b-83b4981abeaa)

![Email Page](https://github.com/Perseus29/CloudShare/assets/94976184/e308b122-fa81-42a1-af46-75d533a9ba0e)

![Download Page](https://github.com/Perseus29/CloudShare/assets/94976184/d9c14918-3f49-4b83-b1ca-1133e30e2f68)

