# LocalConnect Community Platform

## About the Project

LocalConnect is a lightweight web platform designed to help people living in the same neighborhood stay connected.

The application allows residents to share updates, report issues in their locality, and stay informed about community activity. The goal of the platform is to create a simple digital space where neighbors can communicate and coordinate everyday matters.

Examples of how the platform might be used include sharing announcements, reporting infrastructure problems, or informing neighbors about upcoming community activities.

## Current Features

The current version of LocalConnect includes several features that were added during development.

Some of these features clearly support neighborhood communication, while others appear more complex than what might normally be expected in a simple community platform.

The engineering team has begun reviewing the system to determine whether the existing features truly align with the intended users of the product.

### Existing Functional Areas

Neighborhood Feed  
Residents can share updates and announcements that are visible to the community.

Issue Reporting  
Users can report problems in the neighborhood such as broken streetlights or garbage collection issues.

Task Assignment  
The platform allows tasks to be created and assigned to specific people.

Community Metrics Dashboard  
The system displays activity metrics related to platform usage.

Contributor Leaderboard  
A leaderboard shows users who have been most active on the platform.

## The Challenge

Your task is to investigate how the current system works and evaluate whether the features implemented in the platform make sense for a neighborhood community application.

Some features may be useful, while others may feel unnecessarily complex or misaligned with the purpose of the product.

You should review the system carefully and determine whether the current feature set effectively supports communication and coordination among neighborhood residents.

## Investigation Hints

While exploring the application, consider the following questions:

- Does each feature meaningfully support interaction between neighbors?
- Does the feature simplify community communication?
- Does the feature feel more suited for a workplace productivity tool rather than a neighborhood platform?

Understanding the role of each feature will help you decide what improvements may be necessary.

## Documentation Requirement

Create a file named `Changes.md`.

In this file explain:

- What you discovered about the existing features
- Which features did not align well with the product’s intended users
- What improvements you implemented in the system

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js (version 18 or later recommended)
- PostgreSQL
- npm or yarn

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd localconnect-community-app
```

Install project dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory and configure your database connection:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/localconnect"
```

### Database Setup

Run the Prisma migration to create the database schema:

```bash
npx prisma migrate dev
```

### Running the Application

Start the backend server:

```bash
node server/index.js
```

In a separate terminal, start the frontend:

```bash
npm run dev
```

The application should now be running locally.

## Goal

This project is part of a product investigation challenge.

The objective is not only to modify code, but also to evaluate whether the system’s features truly serve the needs of the intended users.

Explore the system carefully, understand how it works, and improve the product where necessary.
