import hashlib
from random import randint
from flask import Flask,redirect, request, session,url_for,render_template
from flask_mysqldb import MySQL

from flask_mail import *

from user import user_operation



import numpy as np
import pandas
import sklearn
import pickle

# importing model
model = pickle.load(open('model.pkl','rb'))
sc = pickle.load(open('standscaler.pkl','rb'))
ms = pickle.load(open('minmaxscaler.pkl','rb'))



app=Flask(__name__)
app.secret_key="super secret key"

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'
 
mysql = MySQL(app)


app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=465
app.config['MAIL_USERNAME']='santhoshdhana88@gmail.com'
app.config['MAIL_PASSWORD']='cuaydgajbcuxqnsj'
app.config['MAIL_USE_TLS']=False
app.config['MAIL_USE_SSL']=True

mail=Mail(app)

otp=randint(0000,9999) 
@app.route('/')
def welcome():
    return render_template('index.html')

@app.route('/first')
def first():
    return render_template('first.html')

@app.route('/submit',methods=['POST','GET'])   
def submit():
    msg=''
    f=0
    if request.method=='POST':
        try:
            email=str(request.form['email'])
            username=str(request.form['username'])
            password=str(request.form['password'])
            cursor = mysql.connection.cursor()

            
            cursor.execute('Select * from customer_details')
            c=cursor.fetchall()
            for i in c:

                if(i[3]==email):
                    if(i[2]==username):
                        if(i[5]==password):
                            return redirect(url_for('first'))
                               

                        else:
                            msg='Invalid password'
                            break
                            
                    else:
                         msg='Invalid username'
                         break
                else:
                     print("kjsdjk")
                     msg='Invalid Email'



        except:
            return render_template('index.html',msg=msg)
    return render_template('index.html',msg=msg)
        
name=''  
username=''
password=''   
email=''
dob=''  
otp=randint(0000,9999) 


@app.route('/signup',methods=['POST','GET'])
def signup():
     
    if request.method=='POST':
        msg=''
        try:
        
            name=str(request.form['name'])
            username=str(request.form['Username'])
            password=str(request.form['password'])
            email=str(request.form['email'])
            dob=str(request.form['dob'])
            
            cursor = mysql.connection.cursor()

            cursor.execute('Select * from customer_details')
            c=cursor.fetchall()
            for i in c:
                if(i[2]==username):
                    msg='Invalid username'
                    return render_template('index.html',msg1=msg)
                elif(i[3]==email):
                    msg='Invalid email'
                    return render_template('index.html',msg1=msg)
                
            msg=Message('OTP',sender='santhoshdhana88@gmail.com',recipients=[email])
            msg.body=str(otp) 
            
         
            mail.send(msg)

            # op = user_operation()
            # op.user_signup_insert(name,username,email,password,dob)
            
            return render_template('verify.html',email=email,username=username,name=name,password=password,dob=dob)



        except Exception as e:
            print(e)
            msg='Error'
            return render_template('index.html',msg1=msg)
    else:
        return render_template('first.html')
    



@app.route('/verify',methods=['POST'])
def verify():
    try:
        if request.method=='POST':
            
            userotp1=(request.form['otp1'])
            userotp2=(request.form['otp2'])
            userotp3=(request.form['otp3'])
            userotp4=(request.form['otp4'])
       
            userotp=((int)(userotp1)*1000+(int)(userotp2)*100+(int)(userotp3)*10+(int)(userotp4))


            name=str(request.form['name'])
            username=str(request.form['username'])
            password=str(request.form['password'])
            email=str(request.form['email'])
            dob=str(request.form['dob'])
            
            
            if otp == int(userotp):
                print("hiii")
                op = user_operation()
                op.user_signup_insert(name,username,email,password,dob)
                return redirect(url_for('first'))
            else:
                msg='Invalid otp'
                return render_template('verify.html',msg=msg,email=email,username=username,name=name,password=password,dob=dob)

    except Exception as e:
         print(e)
         msg='Invalid otp'
         return render_template('verify.html',msg=msg,email=email,username=username,name=name,password=password,dob=dob)



@app.route('/fertilizer')
def fertilizer():
   return render_template("fertilizer.html")

@app.route('/about')
def about():
   return render_template("about.html")

@app.route('/crop')
def crop():
   return render_template("crop.html")

@app.route('/season')
def season():
   return render_template("season.html")

@app.route('/contact')
def contact():
   return render_template("contact.html")

@app.route('/login')
def login():
    return render_template('index.html')


@app.route('/forgot')
def forgot():
    return render_template("forgot.html")

@app.route('/forgot1',methods=['POST','GET'])
def forgot1():
    try:
        if request.method=='POST':
            email=str(request.form['email'])
            pass1=str(request.form['pass'])
            pass2=str(request.form['repass'])
            f=0
            cursor = mysql.connection.cursor()
            cursor.execute('Select * from customer_details')
            c=cursor.fetchall()
            for i in c:
                if(i[3]==email):
                    f=1
                    if(i[5]==pass1):
                        return render_template("forgot.html",msg='Password already exists')
                    else:
                        break

            if f==1:
                if(pass1!='' and pass2!=''):
                    sq='UPDATE customer_details SET Password = %s WHERE Email = %s'
                    record=[pass1,email]
                    cursor.execute(sq,record)
                    mysql.connection.commit()
                    cursor.close()
                    return redirect(url_for('login'))
                else:
                    return render_template("forgot.html",msg='Invalid Password')
                
            else:
                return render_template("forgot.html",msg='Invalid Email')

    except Exception as e:
       
        return render_template("forgot.html",msg='Invalid Email')
@app.route('/home')
def home():
    return render_template('home.html')





@app.route("/predict",methods=['POST'])
def predict():
    N = request.form['Nitrogen']
    P = request.form['Phosporus']
    K = request.form['Potassium']
    temp = request.form['Temperature']
    humidity = request.form['Humidity']
    ph = request.form['Ph']
    rainfall = request.form['Rainfall']

    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    scaled_features = ms.transform(single_pred)
    final_features = sc.transform(scaled_features)
    prediction = model.predict(final_features)

    crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
                 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
                 14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
                 19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"}

    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = "{} is the best crop to be cultivated right there".format(crop)
       
    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
    return render_template('predict.html',result = result,crop=crop,feature_list=feature_list)



@app.route('/order',methods=['POST','GET'])   
def order():
    
    try:
        
        if request.method=='POST':
            
            email=str(request.form['email'])
            
            phone=str(request.form['phone'])
           
            pro_name=str(request.form.get('product_name'))
           
            pro_cost=str(request.form.get('product_cost'))
            
            pro_qua=str(request.form.get('product_quantity'))
           
            cost=str(request.form.get('total_cost'))
   

            print( email,phone,pro_name,pro_cost,pro_qua,cost)

            cursor = mysql.connection.cursor()
            sq='INSERT INTO shopping (Email,Phone_Number,Product_Name,Product_Cost,Product_Quanity,Total_cost) VALUES(%s,%s,%s,%s,%s,%s)'
            record=[email,phone,pro_name,pro_cost,pro_qua,cost]
            cursor.execute(sq,record)
            mysql.connection.commit()
            cursor.close()
           
            return render_template('home.html')
    
    except Exception as e:
        
        print(e)
        return render_template('order.html')

@app.route('/cancel')
def cancel():
    return render_template('first.html')

if __name__=='__main__':
    app.run(debug=True)