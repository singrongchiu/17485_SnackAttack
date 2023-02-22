import sys
import smtplib

sys.path.insert(0, "../")
import database.users as users
import backend.cipher as cipher

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

def login(username, password, email):
    encrypted_username, encrypted_pw, encrypted_email = encrypt_credentials(username, password, email) 
    return users.sign_in(encrypted_username, encrypted_pw, encrypted_email)

def forget_password(email):
    encrypted_user, encrypted_pw = users.get_login(cipher.encrypt(email, EMAIL_N, EMAIL_D))
    decrypted_user = cipher.decrypt(encrypted_user, USER_N, USER_D)
    decrypted_pw = cipher.decrypt(encrypted_pw, PW_N, PW_D)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login('alison.q.jin@gmail.com', 'mgeaedwjlnhngpul')

    subject = "Forgot Login"
    body = f"We have received your request for your login credentials.\nUsername: {decrypted_user}\nPassword: {decrypted_pw}\n\n Please reset your password upon logging in."
    msg = f"Subject: {subject}\n\n{body}"
    server.sendmail("alison.q.jin@gmail.com", email, msg)




