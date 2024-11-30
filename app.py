from flask import Flask, request, jsonify
from flask import Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, origins="*")

from models import Task

@app.route('/tasks', methods=['GET'])
def get_tasks():
    page = request.args.get('page', 1, type=int)
    username_filter = request.args.get('username', None)
    email_filter = request.args.get('email', None)
    status_filter = request.args.get('status', None)
    sort_by = request.args.get('sort_by', 'id')

    query = Task.query

    if username_filter:
        query = query.filter(Task.username.ilike(f'%{username_filter}%'))
    if email_filter:
        query = query.filter(Task.email.ilike(f'%{email_filter}%'))
    if status_filter == 'true' or status_filter == 'false':
        query = query.filter(Task.status == (status_filter.lower() == 'true'))

    tasks_pagination = query.order_by(sort_by).paginate(page=page, per_page=3)
    tasks = tasks_pagination.items
    total_tasks = tasks_pagination.total

    return jsonify({
        'tasks': [{
            'id': task.id,
            'username': task.username,
            'email': task.email,
            'text': task.text,
            'status': task.status,
            'created': task.created.isoformat()
        } for task in tasks],
        'total_tasks': total_tasks
    })


@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    new_task = Task(username=data['username'], email=data['email'], text=data['text'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id}), 201


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    data = request.json
    task.text = data.get('text', task.text)
    task.status = data.get('status', task.status)
    db.session.commit()
    return jsonify({'id': task.id})


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='localhost')
