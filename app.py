from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
  app = Flask(__name__)
  app.config['SECRET_KEY'] = "superRandomSecretKey123987_!@#%$"
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
  
  db.init_app(app)
  migrate.init_app(app, db)
  CORS(app)

  return app
