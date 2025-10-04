# Daily Trends

### First of all I define the project structure.
I'm going to divide the structure in layers usind Domain driven design

- Domain contains models, scrappers and services (business logic and models)
- Infrastructure contains database and repositories
- Application contains controllers and routes
- Config contains project setup and environment
- Tests for testing purpose

#### Note: 
This is a simple skeleton, it doesn't have any library or dependency yet. 
It will be configured later.

### Adding docker compose to start mongo db

Execute it to start docker
`docker-compose up -d`
Check the list of dockers
`docker ps`

### Adding feed model and test for connection and repository
I have added IFeed as Interface with the fields that news item should have  
Also I have added the database schema (Feed.ts) and the repository with 
its correspondent interface
Besides, mongodb-memory-server and jest libraries to test the model and 
how it will be saved into the mongodb. Mongodb-memory-server acts like a 
database without make changes in the real db.
