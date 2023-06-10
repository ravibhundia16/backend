# Backend Boilerplate

This repository is created for NodeJS boilerplate code

This repository uses NodeJS + ExpressJS setup

This repository uses v18.15.0 of Node and v9.5.0 version of npm

# It contains below boilerplates

1. Javascript + SQL database (Postgres with sequelize orm)
2. Javascript + NoSQL database (MongoDB with mongoose orm)
3. Typescript + NoSQL database (MongoDB with mongoose orm)
4. Typescript + SQL database (Postgres with sequelize orm)

# Branch Naming convesion are as below:

1. For boilerplate level

- We will use script type and db type as prefix for every branch name
  For Ex:
  - If branch is for Javascript + SQL boilerplate than branch prefix should be: `js-sql-`
  - If branch is for Typescript + NoSQL boilerplate than branch prefix should be: `ts-nosql-`

2. For module level

- We will add prefix with module name in branch
  For Ex:
  - If branch is for user module than branch name should be like: `js-sql-user` or `ts-nosql-user`

# File Naming convension

- We will add file type as a postfix in name
  For Ex:
  - If file is use for routes than name ends with `.route.js` or `.route.ts`
  - If file is use for controller functiopn than name ends with `.controller.js` or `.controller.ts`

# Project Bootstraping
This branch contains below things
- Create node server
- Project structure
- Database connection with sequelize
- Code formatting rules with eslint and prettier
- Pre-commit validation using husky
- Logging machanism