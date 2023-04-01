import cipher
import database.projects as projects

PROJ_N = 4
PROJ_D = 1

def create_project(name, id, description):
    return projects.create_new_project(name, cipher.encrypt(id, PROJ_N, PROJ_D), description)

def login(projectid):
    return projects.project_sign_in(projectid)

def project_check_in(projectid, hwsetname, qty):
    return projects.project_check_in(projectid, hwsetname, qty)

def project_check_out(projectid, hwsetname, qty):
    return projects.project_check_out(projectid, hwsetname, qty)