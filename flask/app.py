from flask import Flask,redirect,url_for
app=Flask(__name__)

@app.route('/')
def welcome():
    return ' <h1>Hi<h1>'
    

@app.route('/first')
def first():
    return ' <h1>First<h1>'


@app.route('/second')
def second():
    return ' <h1>Second<h1>'
@app.route('/ss')
def ss():
    s=34
    if(s<50):
        a='first'
        return redirect(url_for(a))
    else:
        a='second'
        return redirect(url_for(a))

if __name__=='__main__':
    app.run(debug=True)