import hashlib
from random import randint
from flask import Flask,redirect, request, session,url_for,render_template
from flask_mysqldb import MySQL


app=Flask(__name__)
app.secret_key="super secret key"

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'
 
mysql = MySQL(app)

class user_operation:
  
    
    
    def user_signup_insert(self,name,username,email,password,dob):
        cursor = mysql.connection.cursor()
        sq='INSERT INTO customer_details (Name,Username,Email,DOB,Password) VALUES(%s,%s,%s,%s,%s)'
        record=[name,username,email,dob,password]
        cursor.execute(sq,record)
        mysql.connection.commit()
        cursor.close()

        return
    
