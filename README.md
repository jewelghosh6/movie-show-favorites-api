# movie-show-favorites-api
Basic crud api for storing favorites movie & TV shows

# Project Setup Guide

This explains how to install dependencies, run migrations, seed data, and start the server for this project.

---

## Prerequisites

Make sure the following are installed on your system:

- Node.js (v22 or higher)
- npm or yarn
- TypeScript
- Sequelize CLI
- A compatible database ( MySQL)

---

## Installation

Install all dependencies:

```npm install```


---

## Database Setup

Add `.env` file sample `.env.example` is provided

### Run Migrations

Compile TypeScript and apply all database migrations:

```npm run migrate-db```

### Undo Migrations

Revert all applied migrations:

```npm run migrate-db-undo```



## Seeding the Database

### Seed Data

Populate the database with initial data:


```npm run seed-db```


### Undo Seed Data

Remove seeded data:

```npm run seed-db-undo```


## Running the Server

### Development Mode

Start the app with hot reload:


```npm run dev```


### Production Mode

Run the compiled version:

```npm start```
