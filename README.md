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