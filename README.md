# CGI-Task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

## Requirements

1. Node version 14
2. JSON Server


## How To Run
1. Clone Repo by using git clone [https://github.com/iftakhar450/CGI-task.git](https://github.com/iftakhar450/CGI-task.git)
2. Checkout Develope Branch by using `git checkout develop`
3. Run In the Terminal `npm install`
4. Run In the Terminal `json-server db.json`
5. Run in the Terminal `npm run start`


After executing above commands the Frontend App will be running on 
[http://localhost:4200](http://localhost:4200) and JSON-server running on PORT = 3000

## Task Details

### 1. Show average temperature graph
On the dashboard it showing the average temperature by weekly as default. We can view the average temperature by yearly and daily by selecting the group button on the top of the graph.

### 2.  Showing Measurements from all the devices
Next to the graph a table is added to show the all the measurement from all the machines and can filtered by machine name , temperature value and by date.

### 3.  Showing the critical values
In the last all the measurement where the temperature is exceeded above 90 is showing in that table and we can filter by the properties.


## Important Notes
1. On all the tables fields default sorting and  pagination is implemented.
2. In the app navigation some dummy element added  as mention in the Task Details docs except logout button.
3. The logout button routing the user to login page where user can simply login by clicking <button name="button">Sign In</button> button.

## Other functionalities

 1. lint is implemented to improve the code quality.
 2. Prettierrc is used to beautify the code.
 3. Husky is used to run the lint and Prettierrc automatically before every `git commit` command.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

