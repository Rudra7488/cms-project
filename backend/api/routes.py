# backend/api/routes.py (Final Version with UPDATE and DELETE)

import os
from flask import Blueprint, request, jsonify, current_app, abort
from werkzeug.utils import secure_filename
from .db import get_db

api_blueprint = Blueprint('api', __name__, url_prefix='/api')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    """Checks if a file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- Route 1: Get ALL posts ---
@api_blueprint.route('/posts', methods=['GET'])
def get_all_posts():
    db = get_db()
    posts = db.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    posts_list = [dict(row) for row in posts]
    return jsonify({'posts': posts_list})

# --- Route 2: Create a new post ---
@api_blueprint.route('/posts/create', methods=['POST'])
def create_new_post():
    # ... (Yeh function waisa hi rahega, koi badlaav nahi)
    if 'image' not in request.files:
        return jsonify({'error': 'Image file is required'}), 400
    file = request.files['image']
    title = request.form['title']
    content = request.form['content']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        image_url = f'/uploads/{filename}'
        db = get_db()
        cursor = db.execute(
            'INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)',
            (title, content, image_url)
        )
        db.commit()
        new_post_id = cursor.lastrowid
        return jsonify({'message': 'Post created successfully!', 'post': {'id': new_post_id, 'title': title, 'content': content, 'image_url': image_url}}), 201
    return jsonify({'error': 'File type not allowed'}), 400

# --- NAYA Route 3: Get a SINGLE post by ID ---
@api_blueprint.route('/posts/<int:id>', methods=['GET'])
def get_post_by_id(id):
    db = get_db()
    post = db.execute('SELECT * FROM posts WHERE id = ?', (id,)).fetchone()
    if post is None:
        abort(404, description=f"Post id {id} doesn't exist.")
    return jsonify(dict(post))

# --- NAYA Route 4: UPDATE a post by ID ---
# Note: Hum yahan sirf title aur content update kar rahe hain, image nahi.
@api_blueprint.route('/posts/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.get_json()
    if not data or 'title' not in data or 'content' not in data:
        return jsonify({'error': 'Title and content are required for update'}), 400

    db = get_db()
    db.execute(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        (data['title'], data['content'], id)
    )
    db.commit()
    return jsonify({'message': f'Post {id} updated successfully.'})

# --- NAYA Route 5: DELETE a post by ID ---
@api_blueprint.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    db = get_db()
    # Optional: Pehle image file ko server se delete karein
    post = db.execute('SELECT image_url FROM posts WHERE id = ?', (id,)).fetchone()
    if post:
        # image_url is '/uploads/filename.png', humein 'filename.png' chahiye
        filename = os.path.basename(post['image_url'])
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            
    # Ab database se post delete karein
    db.execute('DELETE FROM posts WHERE id = ?', (id,))
    db.commit()
    return jsonify({'message': f'Post {id} deleted successfully.'})