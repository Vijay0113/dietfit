## Food delivery

Overview:
 Diet fit healthy Food app website developed using Node.js with features like user authentication (login and register), cash on delivery, and product information. The project utilizes HTML, CSS, JavaScript, and Node.js for the frontend, SQLite3 for the backend database, and Microsoft Azure services for web app hosting, virtual networking, integration, resource management, monitoring insights, and a chat bot.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Azure Services](#azure-services)
- [Demo Screenshots](#demo-screenshots)
- [Demo Video](#demo-video)
- [Project URL](#project-url)
- [Contributing](#contributing)


## Features
- *User Authentication:* Secure user registration and login functionalities.
- *Cash on Delivery:* Provides a cash on delivery option for users.
- *food Information:* Display information about healthy diet food items.

## Installation
1. Clone the repository:
    bash
    git clone https://github.com/[your-username]/[your-repo].git
    cd [your-repo]
    

2. Install dependencies:
    bash
    npm install
    

3. Set up the database:
    bash
    # If not already created, create the SQLite database
    touch database.db

    # Run database migrations
    npm run migrate
    

4. Start the application:
    bash
    npm start
    

## Usage
1. Visit `http://localhost:5000` in your web browser.
2. Use the provided login and register features.
3. Explore the healthy food items and use the cash on delivery option.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- SQLite3

## Azure Services
The project leverages the following Azure services:
- *Web App:* Hosts the Node.js application.
- *Virtual Networking:* Manages network traffic and security.
- *Virtual Networking Integration:* Connects various resources within a virtual network.
- *Resource Group:* Organizes and manages Azure resources.
- *Monitor Insights:* Provides monitoring and analytics for the application.
- *chat Bot:* Integrates a chat bot for enhanced user interaction.

## Demo Screenshots
![Screenshot 1](/path/to/screenshot1.png)
![Screenshot 2](/path/to/screenshot2.png)

## Demo Video
[Watch Demo Video](https://www.youtube.com/watch?v=your-video-id)

## Project URL
[Live Project](https://your-project-url.com)

## Contributing
This project is a collaborative effort, and each team member has a specific role:

1. *Development (Janani):*
   - I am  responsible for coding and implementing new features.
   - To contribute, follow these steps:
      1. Fork the project.
      2. Create your feature branch: `git checkout -b feature/your-feature`.
      3. Commit your changes: `git commit -m 'Add some feature'`.
      4. Push to the branch: `git push origin feature/your-feature`.
      5. Submit a pull request.

2. *Deployment (vijay):*
   - The second team member is responsible for deploying the application on Azure services.
   - Ensure that the deployment is seamless and aligns with the project requirements.

3. *Documentation and Demo (Ragav):*
   - The third team member is responsible for creating and updating the README file, including demo screenshots, video, and voiceover.
   - To contribute, follow these steps:
      1. Fork the project.
      2. Create your documentation branch: `git checkout -b documentation/README.md`.
      3. Commit your changes: `git commit -m 'Update documentation'`.
      4. Push to the branch: `git push origin documentation/README.md`.
      5. Submit a pull request.
