"""
Testing Module - Learn to test FastAPI applications
Run with: pytest modules/05_master/test_main.py -v
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Import your app components
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from main import app
from database import Base, get_db
from modules.03_advanced.auth import get_password_hash
from models import User

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    """Override database dependency for testing"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="function")
def client():
    """Create a test client with fresh database"""
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def test_user(client):
    """Create a test user and return credentials"""
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123"
    }
    response = client.post("/advanced/register", json=user_data)
    assert response.status_code == 200
    return user_data


@pytest.fixture
def auth_headers(client, test_user):
    """Get authentication headers for test user"""
    response = client.post(
        "/advanced/token",
        data={
            "username": test_user["username"],
            "password": test_user["password"]
        }
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


class TestBeginner:
    """Tests for beginner module"""
    
    def test_root(self, client):
        response = client.get("/beginner/")
        assert response.status_code == 200
        assert "Hello FastAPI" in response.json()["message"]
    
    def test_create_item(self, client):
        item = {"name": "Test Item", "price": 10.5}
        response = client.post("/beginner/items", json=item)
        assert response.status_code == 201
        assert response.json()["success"] is True
    
    def test_read_item(self, client):
        # First create an item
        item = {"name": "Test Item", "price": 10.5}
        create_response = client.post("/beginner/items", json=item)
        item_id = create_response.json()["data"]["id"]
        
        # Then read it
        response = client.get(f"/beginner/items/{item_id}")
        assert response.status_code == 200
        assert response.json()["item"]["name"] == "Test Item"
    
    def test_item_not_found(self, client):
        response = client.get("/beginner/items/999")
        assert response.status_code == 404


class TestIntermediate:
    """Tests for intermediate module"""
    
    def test_validation_error(self, client):
        """Test Pydantic validation catches bad data"""
        bad_item = {
            "title": "",  # Too short
            "price": -5   # Negative price
        }
        response = client.post("/intermediate/items", json=bad_item)
        assert response.status_code == 422  # Validation error
    
    def test_enum_validation(self, client):
        response = client.get("/intermediate/enum-demo/invalid")
        assert response.status_code == 422  # Invalid enum value
    
    def test_protected_without_auth(self, client):
        response = client.get("/intermediate/protected")
        assert response.status_code == 401


class TestAdvanced:
    """Tests for advanced module with authentication"""
    
    def test_register_user(self, client):
        user = {
            "email": "new@example.com",
            "username": "newuser",
            "password": "password123"
        }
        response = client.post("/advanced/register", json=user)
        assert response.status_code == 200
        assert response.json()["email"] == user["email"]
    
    def test_login_success(self, client, test_user):
        response = client.post(
            "/advanced/token",
            data={
                "username": test_user["username"],
                "password": test_user["password"]
            }
        )
        assert response.status_code == 200
        assert "access_token" in response.json()
    
    def test_login_failure(self, client):
        response = client.post(
            "/advanced/token",
            data={"username": "wrong", "password": "wrong"}
        )
        assert response.status_code == 401
    
    def test_create_item_auth(self, client, auth_headers):
        item = {
            "title": "My Item",
            "description": "A test item",
            "price": 29.99,
            "category": "electronics"
        }
        response = client.post("/advanced/items", json=item, headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["title"] == item["title"]
    
    def test_get_my_items(self, client, auth_headers):
        response = client.get("/advanced/items", headers=auth_headers)
        assert response.status_code == 200
        assert isinstance(response.json(), list)


class TestExpert:
    """Tests for expert module"""
    
    def test_background_task_queued(self, client, auth_headers):
        response = client.post(
            "/expert/send-notification",
            params={"email": "test@test.com", "message": "Hello"},
            headers=auth_headers
        )
        assert response.status_code == 200
        assert "queued" in response.json()["message"].lower() or "processing" in response.json()["status"]
    
    @pytest.mark.asyncio
    async def test_websocket_connection(self, client):
        """Test WebSocket connectivity"""
        with client.websocket_connect("/expert/ws/chat") as websocket:
            websocket.send_text("Hello")
            data = websocket.receive_text()
            assert "Server received" in data


# Run tests with: pytest modules/05_master/test_main.py -v --tb=short