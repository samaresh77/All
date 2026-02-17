from fastapi import APIRouter, BackgroundTasks, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import asyncio
import random
import json
from datetime import datetime
from typing import List, Dict

from database import get_db
from models import User
from modules.03_advanced.auth import get_current_active_user

router = APIRouter(prefix="/expert", tags=["⚡ Expert - Async & Real-time"])


# ==================== BACKGROUND TASKS ====================
async def send_email(email: str, message: str):
    """Simulate sending email asynchronously"""
    await asyncio.sleep(2)  # Simulate network delay
    print(f"[EMAIL SENT] To: {email}, Message: {message}")


async def process_image(image_path: str):
    """Simulate heavy image processing"""
    await asyncio.sleep(5)
    print(f"[IMAGE PROCESSED] {image_path}")


async def log_activity(user_id: int, action: str):
    """Log user activity"""
    await asyncio.sleep(0.5)
    print(f"[LOG] User {user_id} performed: {action}")


@router.post("/send-notification", summary="Background email task")
async def send_notification(
    email: str,
    message: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_active_user)
):
    """
    ## Background Tasks
    
    Offload heavy operations to run after response is sent.
    Perfect for: emails, logging, image processing, reports.
    
    Response returns immediately while email sends in background!
    """
    background_tasks.add_task(send_email, email, message)
    background_tasks.add_task(log_activity, current_user.id, "sent_notification")
    
    return {
        "message": "Notification queued",
        "to": email,
        "status": "processing in background",
        "timestamp": datetime.utcnow()
    }


@router.post("/batch-process", summary="Multiple background tasks")
async def batch_process(
    items: List[str],
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_active_user)
):
    """
    ## Batch Background Processing
    
    Queue multiple tasks to run concurrently after response.
    """
    for i, item in enumerate(items):
        background_tasks.add_task(
            log_activity, 
            current_user.id, 
            f"processed_batch_item_{i}"
        )
    
    return {
        "queued": len(items),
        "message": "All items queued for processing"
    }


# ==================== WEBSOCKETS ====================
class ConnectionManager:
    """Manage WebSocket connections"""
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_connections: Dict[int, WebSocket] = {}
    
    async def connect(self, websocket: WebSocket, user_id: int = None):
        await websocket.accept()
        self.active_connections.append(websocket)
        if user_id:
            self.user_connections[user_id] = websocket
    
    def disconnect(self, websocket: WebSocket, user_id: int = None):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if user_id and user_id in self.user_connections:
            del self.user_connections[user_id]
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
    
    async def send_to_user(self, user_id: int, message: str):
        if user_id in self.user_connections:
            await self.user_connections[user_id].send_text(message)


manager = ConnectionManager()


@router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    """
    ## WebSocket Chat
    
    Real-time bidirectional communication.
    Test in Swagger UI or use a WebSocket client.
    
    ### JavaScript Test Client:
    ```javascript
    const ws = new WebSocket('ws://localhost:8000/expert/ws/chat');
    ws.onmessage = (event) => console.log(event.data);
    ws.send('Hello Server!');
    ```
    """
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            timestamp = datetime.utcnow().strftime("%H:%M:%S")
            
            # Echo back with timestamp
            response = f"[{timestamp}] Server received: {data}"
            await websocket.send_text(response)
            
            # Broadcast to all (optional)
            if data.startswith("broadcast:"):
                await manager.broadcast(f"Broadcast: {data[10:]}")
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected")


@router.websocket("/ws/live-data")
async def websocket_live_data(websocket: WebSocket):
    """
    ## Live Data Stream
    
    Server pushes data continuously to client.
    Great for: dashboards, stock prices, sensor data.
    """
    await websocket.accept()
    try:
        while True:
            # Simulate live data
            data = {
                "timestamp": datetime.utcnow().isoformat(),
                "temperature": round(random.uniform(20, 30), 2),
                "humidity": round(random.uniform(40, 60), 2),
                "cpu_usage": round(random.uniform(0, 100), 2)
            }
            await websocket.send_json(data)
            await asyncio.sleep(1)  # Update every second
    except WebSocketDisconnect:
        print("Live data client disconnected")


# ==================== STREAMING ====================
async def fake_data_stream():
    """Generate streaming data"""
    for i in range(100):
        yield f"data: Chunk {i} at {datetime.utcnow().isoformat()}\n\n"
        await asyncio.sleep(0.1)


@router.get("/stream", summary="Server-Sent Events (SSE)")
async def stream_data():
    """
    ## Streaming Response
    
    Send data in chunks without closing connection.
    Perfect for: progress bars, logs, large datasets.
    """
    return StreamingResponse(
        fake_data_stream(),
        media_type="text/event-stream"
    )


# ==================== ADVANCED PATTERNS ====================
@router.get("/async-demo", summary="Async/await patterns")
async def async_demo():
    """
    ## Concurrent Execution Demo
    
    Shows how asyncio runs tasks concurrently.
    """
    async def task(name: str, delay: float):
        await asyncio.sleep(delay)
        return f"Task {name} completed after {delay}s"
    
    # Run 3 tasks concurrently (total time ~1s, not 3s)
    results = await asyncio.gather(
        task("A", 1.0),
        task("B", 0.5),
        task("C", 0.8)
    )
    
    return {
        "results": results,
        "pattern": "concurrent_execution",
        "note": "All tasks ran in parallel, total time ~1s"
    }


@router.post("/webhook-simulator", summary="Webhook handler")
async def webhook_handler(payload: dict):
    """
    ## Webhook Receiver
    
    Accept callbacks from external services.
    Verify signatures in production!
    """
    print(f"[WEBHOOK RECEIVED] {json.dumps(payload, indent=2)}")
    
    return {
        "received": True,
        "timestamp": datetime.utcnow(),
        "tip": "In production, verify webhook signatures"
    }