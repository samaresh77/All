from fastapi import APIRouter, Depends, HTTPException, Header, Cookie, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
from schemas import ItemCreate, ItemUpdate, ItemResponse, ItemCategory, StandardResponse
from datetime import datetime, timedelta
import time

router = APIRouter(prefix="/intermediate", tags=["🚀 Intermediate - Validation"])

# Security
security = HTTPBearer(auto_error=False)


# ==================== DEPENDENCIES ====================
async def common_parameters(
    q: Optional[str] = None, 
    skip: int = 0, 
    limit: int = 100
):
    """
    ## Shared Dependency
    
    This function can be used as a dependency in multiple endpoints.
    It provides common pagination and search parameters.
    """
    return {"q": q, "skip": skip, "limit": limit}


async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    ## Token Verification Dependency
    
    Demonstrates how to create reusable authentication checks.
    """
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if credentials.credentials != "secret-token":
        raise HTTPException(status_code=403, detail="Invalid token")
    return credentials.credentials


async def timing_dependency(request: Request, call_next):
    """
    ## Middleware-style Dependency
    
    Measures request processing time.
    """
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# ==================== ROUTES ====================
@router.get("/items", summary="Using dependencies")
async def read_items(commons: dict = Depends(common_parameters)):
    """
    ## Dependency Injection Demo
    
    Instead of repeating parameters in every endpoint, use `Depends()`.
    
    Benefits:
    - Code reuse
    - Better testing
    - Automatic OpenAPI generation
    """
    return {
        "message": "Items retrieved using shared dependency",
        "params": commons,
        "items": []
    }


@router.post(
    "/items", 
    response_model=ItemResponse,
    summary="Create with Pydantic validation",
    status_code=201
)
async def create_validated_item(item: ItemCreate):
    """
    ## Pydantic Validation Demo
    
    Using ItemCreate schema provides:
    - Automatic validation
    - Type conversion
    - Clear error messages
    - OpenAPI schema generation
    
    Try sending invalid data to see error handling!
    """
    # Simulate database insertion
    return ItemResponse(
        id=1,
        title=item.title,
        description=item.description,
        price=item.price,
        category=item.category,
        is_available=True,
        owner_id=1
    )


@router.patch(
    "/items/{item_id}", 
    response_model=ItemResponse,
    summary="Partial updates with Optional fields"
)
async def update_item_partial(item_id: int, item: ItemUpdate):
    """
    ## Partial Update with Optional Fields
    
    ItemUpdate uses Optional fields, allowing partial updates.
    Only provided fields will be updated.
    """
    # Simulate fetching existing item
    existing = {
        "id": item_id,
        "title": "Old Title",
        "description": "Old description",
        "price": 10.0,
        "category": "other",
        "is_available": True,
        "owner_id": 1
    }
    
    # Apply updates only for provided fields
    update_data = item.model_dump(exclude_unset=True)
    existing.update(update_data)
    
    return ItemResponse(**existing)


@router.get("/protected", summary="Protected route")
async def protected_route(token: str = Depends(verify_token)):
    """
    ## Protected Endpoint
    
    Uses the verify_token dependency to check authentication.
    Try it with header: `Authorization: Bearer secret-token`
    """
    return {
        "message": "You have access!",
        "token": token,
        "secret_data": "This is sensitive information"
    }


@router.get("/headers", summary="Header inspection")
async def inspect_headers(
    user_agent: Optional[str] = Header(None),
    accept_language: Optional[str] = Header(None, alias="Accept-Language"),
    x_custom_header: Optional[str] = Header(None, alias="X-Custom-Header")
):
    """
    ## Header Parameters
    
    Access HTTP headers easily with type conversion.
    Use `alias` for headers with special characters.
    """
    return {
        "headers_received": {
            "User-Agent": user_agent,
            "Accept-Language": accept_language,
            "X-Custom-Header": x_custom_header
        },
        "tip": "Add X-Custom-Header in Swagger's 'Authorize' section"
    }


@router.post("/nested-validation", summary="Complex nested models")
async def nested_validation(data: dict):
    """
    ## Complex Validation Patterns
    
    Demonstrates advanced validation scenarios.
    """
    return {
        "received": data,
        "validated": True,
        "timestamp": datetime.utcnow()
    }


@router.get("/enum-demo/{category}", summary="Enum validation")
async def enum_demo(category: ItemCategory):
    """
    ## Enum Validation
    
    Path parameter restricted to specific values.
    FastAPI shows a dropdown in Swagger UI!
    """
    descriptions = {
        ItemCategory.electronics: "Gadgets and devices",
        ItemCategory.clothing: "Wearable items",
        ItemCategory.food: "Edible products",
        ItemCategory.books: "Reading materials",
        ItemCategory.other: "Miscellaneous"
    }
    
    return {
        "category": category,
        "description": descriptions[category],
        "value": category.value
    }