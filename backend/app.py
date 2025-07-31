# backend/app.py (The final, corrected version with proper indentation)

import os
from flask import Flask
from flask_cors import CORS

def create_app(test_config=None):
    # App banayein aur configure karein
    app = Flask(__name__, instance_relative_config=True)

    # CORS (Cross-Origin Resource Sharing) ko enable karein
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # ===================================================================
    # ===            YEH HISSA AB BILKUL SAHI INDENTED HAI            ===
    # ===================================================================
    
    # Define the base directory for the backend. Yeh create_app ke andar hona chahiye.
    backend_dir = os.path.dirname(os.path.abspath(__file__))

    # Ek default configuration set karein
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'cms.db'),
        # Naya path jo backend se nikal kar frontend/public/uploads tak jaata hai
        UPLOAD_FOLDER=os.path.join(backend_dir, '..', 'frontend', 'public', 'uploads')
    )

    if test_config is None:
        # Agar koi config file hai to usse config load karein
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Testing ke liye config load karein
        app.config.from_mapping(test_config)

    # Sunishchit karein ki instance aur upload folder maujood hain
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
        
    try:
        os.makedirs(app.config['UPLOAD_FOLDER'])
    except OSError:
        pass

    # Database functions ko register karein
    from api import db
    db.init_app(app)

    # API Blueprint ko register karein
    from api.routes import api_blueprint
    app.register_blueprint(api_blueprint)

    return app