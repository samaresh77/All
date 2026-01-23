from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth import auth
from tasks import tasks_api

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"
JWTManager(app)
CORS(app)

app.register_blueprint(auth)
app.register_blueprint(tasks_api)

if __name__ == "__main__":
    app.run(debug=True)
