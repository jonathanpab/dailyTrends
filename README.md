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
Also I have added the database schema (FeedSchema.ts) and the repository with 
its correspondent interface.  
Besides, mongodb-memory-server and jest libraries to test the model and 
how it will be saved into the mongodb. Mongodb-memory-server acts like a 
database without make changes in the real db.

### Adding endpoints to the project
- Adding tslog for avoid to use console log and set a level for logging  
- Adding dotenv to allow get environment config from other places 
(now env is commited because is a test, but it is a known error)
- Adding module-alias library to allow to define custom path aliases for the 
project modules, instead of writing long relative paths  
- Create the endpoints that allow to create and get news to the feed

### Adding scrappers to get news
- Adding axios for requests (I tried to use got, but it requires change the style format to EMS) 
and cheerio for parse and find elements using jquery style
- Adding scrapers for El mundo and El país, both inherit from BaseScraper that has common methods

### Adding cron job to execute scrapers daily
- Adding node-cron library
- Create Service for scraping and save info into database
- Add Cron file to execute daily