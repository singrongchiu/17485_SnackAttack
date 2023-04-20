# 17485_SnackAttack

To compile:

In one terminal, start the frontend:
```
cd react-frontend
npm start
```

In another terminal, start the backend:
```
python backend/app.py
```

## Login Page

<img width="214" alt="image" src="https://user-images.githubusercontent.com/60490533/233429266-6b07adf5-e5b4-4ab9-ad09-2de50d648043.png">

- Username text field: enter username IF you've created an account. 
- Password text field: enter password with corresponding username IF you've created an account

If you have not created an account, click on the "Create User" button. 

If an account has been created, click the "Submit" button after filling out the appropriate information. Once you do, you should receive a pop-up indicating that the login was successful or unsuccessful. If the login was unsuccessful, the login details were incorrect.



## Create New User Page

<img width="229" alt="image" src="https://user-images.githubusercontent.com/60490533/233429405-59e1667f-a037-4dc0-a02d-1ef47cc518af.png">

- Email text field: enter the email you would like associated with your account.
- Username text field: create a username
- Password text field: create a password

Click the "Submit" button once all text fields have been filled out. There will be a pop-up indicating if the user was successfully created.


## Projects Login/Creation Page

<img width="231" alt="image" src="https://user-images.githubusercontent.com/60490533/233429623-3c4d00b1-9894-4415-acd2-c06137846108.png">

### Create New Project
Create a new project by filling out the following fields:
- Name: name of project
- Description: a short description of project
- ProjectID: a unique ID for the project

If the ProjectID is not unique, a pop-up will notify you and you will need to enter a new unique ProjectID. A pop-up will also appear to indicate the successful creation of a new project and will automatically redirect you to the Project page for the new project. Click the "Submit" button once all fields are completed.
     
### Use Existing Project
Enter the Project page of an existing project by entering the unique Project ID associated with the project. Click the "Submit" button once the text field is filled out.
     
Click the "Logout" button to logout.

## Project Page

<img width="959" alt="image" src="https://user-images.githubusercontent.com/60490533/233430844-e607b562-3e8c-4fed-9bcc-dc6d70736e7c.png">
 
Enter the quantity of hardware to check in or check out for the corresponding hardware set. A pop-up will notify you of the total amount checked in or out depending the on the availability and capacity of the hardware set.

Clicking the "Leave" button will take you back to the Projects Create/Login Page. Clicking the "Logout" button will logout the user and take you back to the Login page.
  
## Potential Future Improvements 
