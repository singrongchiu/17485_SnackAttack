import sys
import smtplib

import database.users as users
import cipher

USER_N = 4
USER_D = 1
PW_N = 8
PW_D = 1
EMAIL_N = 6
EMAIL_D = -1

def encrypt_credentials(username, password, email):
    encrypted_username = cipher.encrypt(username, USER_N, USER_D)
    encrypted_pw = cipher.encrypt(password, PW_N, PW_D)
    encrypted_email = cipher.encrypt(email, EMAIL_N, EMAIL_D)

    return encrypted_username, encrypted_pw, encrypted_email

def create_account(username, password, email):
    encrypted_username, encrypted_pw, encrypted_email = encrypt_credentials(username, password, email) 
    return users.create_new_user(encrypted_username, encrypted_pw, encrypted_email)

def login(username, password):
    encrypted_username, encrypted_pw, encrypted_email = encrypt_credentials(username, password, "") 
    return users.sign_in(encrypted_username, encrypted_pw)





