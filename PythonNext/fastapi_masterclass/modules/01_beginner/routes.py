from fastapi import APIRouter, Query, Path, HTTPException
from typing import Optional, List
from schemas import StandardResponse

router = APIRouter(prefix="/beginner", tags=["🌱 Beginner - Basics"])

# In-memory storage for demo purposes
items_db = {}
counter = 0


@router.get("/", summary="Root endpoint", response_description="Welcome message")
async def root():
    """
    ## Welcome to FastAPI Beginner Module!
    
    This is the simplest endpoint possible. It returns a welcome message.
    
    ### What you'll learn:
    - Basic GET requests
    - Automatic JSON serialization
    - Interactive documentation
    """
    return {
        "message": "Hello FastAPI Beginner!",
        "module": "01 - Basic Routing",
        "docs_url": "/docs"
    }


@router.get("/items", summary="List all items")
async def list_items(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Max items to return"),
    search: Optional[str] = Query(None, description="Search by name")
):
    """
    ## Query Parameters Demo
    
    Learn how to use:
    - **skip/limit**: Pagination
    - **search**: Optional filtering
    - **Query()**: Validation and metadata
    
    Try it in Swagger UI with different values!
    """
    item_list = list(items_db.values())
    
    if search:
        item_list = [i for i in item_list if search.lower() in i["name"].lower()]
    
    total = len(item_list)
    item_list = item_list[skip : skip + limit]
    
    return {
        "items": item_list,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.post("/items", summary="Create new item", status_code=201)
async def create_item(item: dict):
    """
    ## POST Request Demo
    
    Create a new item. FastAPI automatically:
    - Validates the JSON body
    - Converts types
    - Generates documentation
    
    ### Request Body Example:
    ```json
    {
        "name": "Laptop",
        "price": 999.99,
        "in_stock": true
    }
    ```
    """
    global counter
    counter += 1
    item["id"] = counter
    items_db[counter] = item
    
    return StandardResponse(
        success=True,
        message="Item created successfully",
        data=item
    )


@router.get("/items/{item_id}", summary="Get specific item")
async def get_item(
    item_id: int = Path(..., ge=1, description="The ID of the item to get")
):
    """
    ## Path Parameters Demo
    
    Extract values from the URL path with validation.
    
    - `{item_id}` in path becomes a parameter
    - `Path(...)` adds validation (must be >= 1)
    - Automatic type conversion
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return {
        "item": items_db[item_id],
        "retrieved_at": "just now"
    }


@router.put("/items/{item_id}", summary="Update item")
async def update_item(item_id: int, item: dict):
    """
    ## PUT Request Demo
    
    Full update of an item. Replaces the entire resource.
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    
    item["id"] = item_id
    items_db[item_id] = item
    
    return StandardResponse(
        success=True,
        message="Item updated successfully",
        data=item
    )


@router.patch("/items/{item_id}", summary="Partial update")
async def patch_item(item_id: int, updates: dict):
    """
    ## PATCH Request Demo
    
    Partial update - only changes the fields you provide.
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    
    items_db[item_id].update(updates)
    
    return StandardResponse(
        success=True,
        message="Item partially updated",
        data=items_db[item_id]
    )


@router.delete("/items/{item_id}", summary="Delete item")
async def delete_item(item_id: int):
    """
    ## DELETE Request Demo
    
    Remove an item from the database.
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    
    deleted = items_db.pop(item_id)
    
    return StandardResponse(
        success=True,
        message="Item deleted",
        data={"deleted_item": deleted}
    )


@router.get("/math/{operation}", summary="Math operations")
async def math_operation(
    operation: str = Path(..., regex="^(add|subtract|multiply|divide)$"),
    a: float = Query(..., description="First number"),
    b: float = Query(..., description="Second number")
):
    """
    ## Advanced Path Parameters
    
    Using regex validation on path parameters.
    Only allows: add, subtract, multiply, divide
    """
    ops = {
        "add": a + b,
        "subtract": a - b,
        "multiply": a * b,
        "divide": a / b if b != 0 else float("inf")
    }
    
    if b == 0 and operation == "divide":
        raise HTTPException(status_code=400, detail="Cannot divide by zero")
    
    return {
        "operation": operation,
        "a": a,
        "b": b,
        "result": ops[operation]
    }