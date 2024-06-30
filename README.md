# RapidAnd Demo

![image](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![image](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![image](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## Overview

This document provides an overview of the architecture and principles applied in the development of RapidAnd Demo. The application is designed to be robust, scalable, and maintainable, adhering to industry best practices and architectural patterns.

## Architecture

### High-Level Architecture

The application follows a [three-tier architecture](https://www.ibm.com/topics/three-tier-architecture), consisting of the presentation layer, business logic layer, and data access layer. This separation of concerns allows for independent development, testing, and maintenance of each layer.

- **Presentation Layer**: Responsible for the user interface and user experience. It communicates with the business logic layer to retrieve data and display it to the user.
- **Business Logic Layer**: Contains the core functionality of the application, processing user commands, making logical decisions, and evaluations. It communicates with the data access layer to retrieve, manipulate, and store data.
- **Data Access Layer**: Provides access to data sources such as databases, file systems, or external services. It abstracts the underlying data source to the business logic layer.

### Technical Stack

- **Frontend**: [React Native Web](https://reactnative.dev/) for building the user interface, utilizing [Expo](https://expo.dev/) for an efficient development workflow and easy access to native APIs.
- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) for RESTful API development, incorporating [Prisma](https://www.prisma.io/) as the ORM for efficient database management.
- **Database**: [PostgreSQL](https://www.postgresql.org/) for relational data storage.
- **Deployment**: Containerized using [Docker](https://www.docker.com/).
- **Linting and formatting**: [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality and consistency.

## Principles Applied

- SOLID Principles
- DRY
- KISS
