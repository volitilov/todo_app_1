from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash
from app import db
from flask_login import UserMixin


class User(UserMixin, db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(120), nullable=False)
  access_token = db.Column(db.String(120), nullable=True)

  def set_password(self, password):
    self.password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)
  
  def add_token(self, token):
    self.access_token = token
  
  def clear_token(self):
    self.access_token = None


class Task(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), nullable=False)
  email = db.Column(db.String(120), nullable=False)
  text = db.Column(db.Text, nullable=False)
  status = db.Column(db.Boolean, default=False)
  created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  text_is_edited = db.Column(db.Boolean, default=False)
