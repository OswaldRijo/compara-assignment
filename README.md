# ComparaOnline Software Engineer Test
Project that solve the software engineer test given by ComparaOnline company.

## Getting started 🚀

The directory is as follows:

    .
    ├── spec
    ├   └── coTestSpec.js               # Tests of the solution
    ├── src  
    ├   ├── coTest.js                   # The implementation of my solution
    ├   └── main.js                     # File that contains the logic for building "products_after_30_days.txt" file
    ├── package.json
    ├── .gitignore
    └── README.md 


### Pre-requisites 📋

The version of Node.js used to build the solution was v12.20.1. Keep in mind that even though using an earlier version,
could not affect the solution, would be better if you have the version mentioned or greater.


## Installing dependencies
Open a terminal and run:
```
npm i
```


## Run the solution Tests⚙️
Open a terminal run: 
```
npm run test
```

The command above will show a coverage summary, if you want a bit more information, then you should run in terminal:

```
 npm run test-coverage-table
 ```

### Products after 30 days
In src folder is a file named as "main.js". This file is responsible for building and printing the information about products
within next 30 days.

To make the file, in terminal run as follows:
```
npm run after-30-days
```
as you may notice in the console, the whole information about the products was printed, same information you can get it from
the document created at src folder called "products_after_30_days.txt"
