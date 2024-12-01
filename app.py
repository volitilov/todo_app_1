from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import desc

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, origins="*")

from models import Task

@app.route('/tasks', methods=['GET'])
def get_tasks():
    page = request.args.get('page', 1, type=int)
    status_filter = request.args.get('status', None)
    sort_by = request.args.get('sort_by', 'created')
    sort_order = request.args.get('sort_order', 'desc')

    query = Task.query

    if status_filter == 'true' or status_filter == 'false':
        query = query.filter(Task.status == (status_filter.lower() == 'true'))

    if sort_by == 'created':
        if sort_order == 'desc':
            query = query.order_by(desc(Task.created))
        else:
            query = query.order_by(Task.created)
    elif sort_by == 'email':
        if sort_order == 'desc':
            query = query.order_by(desc(Task.email))
        else:
            query = query.order_by(Task.email)
    elif sort_by == 'username':
        if sort_order == 'desc':
            query = query.order_by(desc(Task.username))
        else:
            query = query.order_by(Task.username)
    elif sort_by == 'status':
        if sort_order == 'desc':
            query = query.order_by(desc(Task.status))
        else:
            query = query.order_by(Task.status)
    else:
        query = query.order_by(Task.id)

    tasks_pagination = query.paginate(page=page, per_page=3)
    tasks = tasks_pagination.items
    total_tasks = tasks_pagination.total

    return jsonify({
        'tasks': [{
            'id': task.id,
            'username': task.username,
            'email': task.email,
            'text': task.text,
            'status': task.status,
            'created': task.created.isoformat(),
            'text_is_edited': task.text_is_edited,
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
    task.text_is_edited = data.get('text_is_edited', task.text_is_edited)
    db.session.commit()
    return jsonify({'id': task.id})


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='localhost')
