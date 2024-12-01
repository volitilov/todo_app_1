from logging.handlers import RotatingFileHandler
import os, logging
from flask import request, jsonify
import jwt
from sqlalchemy import desc
from models import User, Task
from app import create_app, db

app = create_app()

if not app.debug:
    os.makedirs('tmp/loggs', exist_ok=True)
    handler = RotatingFileHandler('tmp/loggs/app.log', maxBytes=10240, backupCount=3)
    handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    handler.setLevel(logging.WARNING)
    app.logger.addHandler(handler)



# flask shell
@app.shell_context_processor
def make_shell_context():
    '''Запускает shell со сконфигурированым контекстом'''
    return dict(app=app, db=db, User=User, Task=Task)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)

    if not data or not username or not password:
        return jsonify(message='Invalid request data'), 400

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        payload = {'user_id': user.id}
        access_token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        user.add_token(access_token)
        db.session.commit()
        return jsonify(access_token=access_token)
    else:
        return jsonify(message='Invalid username or password'), 401


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    auth_header = request.headers.get('Authorization')
    if auth_header:
        access_token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(access_token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = payload['user_id']
            user = User.query.get(user_id)
            if user:
                user.clear_token()
                db.session.commit()
        except jwt.InvalidTokenError:
            print("Invalid token")
    return response


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
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Missing authorization header'}), 401

    if not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Invalid authorization header'}), 401

    token = auth_header.split(' ')[1]

    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user = User.query.get(payload['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 401

    if user.access_token != token:
        return jsonify({'error': 'Invalid token'}), 401

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
