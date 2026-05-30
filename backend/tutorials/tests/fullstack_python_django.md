I'll search for the latest Django + React integration patterns and Tailwind CSS setup for 2026 to give you the most current, production-ready
I'll create a comprehensive, step-by-step guide that teaches you Django + React + Tailwind CSS from absolute basics to production level. Since you only know Python, I'll explain every concept carefully.

---

# 🚀 Django + React + Tailwind CSS Mastery Guide
## From Zero to Production (Project by Project)

---

## 📚 What We're Building

| Project | Django Concepts | React Concepts | Styling | Difficulty |
|---------|----------------|----------------|---------|------------|
| 1. Hello World | Setup, Views | Components, JSX | Tailwind basics | ⭐ |
| 2. Counter App | API, DRF | State, useState | Tailwind + CSS | ⭐⭐ |
| 3. Todo List | Models, Serializers | CRUD, useEffect | Tailwind components | ⭐⭐⭐ |
| 4. Weather Dashboard | External APIs | Fetch, Async | Responsive design | ⭐⭐⭐⭐ |
| 5. E-Commerce | Auth, JWT | Context, Router | Full UI system | ⭐⭐⭐⭐⭐ |
| 6. SaaS Platform | Production deploy | Advanced patterns | Custom design system | ⭐⭐⭐⭐⭐ |

---

## 🔧 Project 1: Hello World (Your First Django + React App)

### What We're Building
A simple page that says "Hello from Django + React!" to understand how the two frameworks talk to each other.

### Architecture Understanding
```
┌─────────────────────────────────────────┐
│           BROWSER (Chrome, Firefox)      │
│  ┌─────────────────────────────────────┐ │
│  │     React Frontend (Port 3000)      │ │
│  │  - Shows buttons, forms, colors     │ │
│  │  - Handles clicks, typing           │ │
│  └─────────────────────────────────────┘ │
│              ↕ HTTP Request              │
│  ┌─────────────────────────────────────┐ │
│  │     Django Backend (Port 8000)      │ │
│  │  - Stores data in database          │ │
│  │  - Processes business logic         │ │
│  │  - Returns JSON data                │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

Think of Django as the **brain** (logic, data) and React as the **face** (what users see and click).

---

### Step 1: Create Project Folder

```bash
# Open your terminal (Command Prompt, Terminal, or VS Code terminal)
# Create a folder for our project
mkdir django-react-projects
cd django-react-projects

# Create two folders: backend (Django) and frontend (React)
mkdir project1-hello-world
cd project1-hello-world
mkdir backend
mkdir frontend
```

**What this does:** Creates a clean structure. `backend` will hold Python/Django code. `frontend` will hold JavaScript/React code.

---

### Step 2: Set Up Django Backend

```bash
# Navigate to backend folder
cd backend

# Create a Python virtual environment (isolated space for packages)
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate
# OR activate it (Mac/Linux)
source venv/bin/activate

# You'll see (venv) in your terminal - this means it's active!
```

**What is a virtual environment?** Think of it like a separate room in your house. You install Python packages in this room without affecting the rest of your computer. This prevents version conflicts.

```bash
# Install Django (the Python web framework)
pip install django

# Create a Django project called 'hello_project'
django-admin startproject hello_project .

# Create a Django 'app' called 'api'
# An app is a feature/module (like 'users', 'blog', 'shop')
python manage.py startapp api
```

**What's the difference between a project and an app?**
- **Project** = The entire website (like a restaurant)
- **App** = A specific feature (like the kitchen, the bar, the dining area)

---

### Step 3: Configure Django

Open `backend/hello_project/settings.py` in your code editor and modify it:

```python
# hello_project/settings.py

# Add these to the INSTALLED_APPS list
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',  # <-- ADD THIS - our app
    'corsheaders',  # <-- ADD THIS - allows React to talk to Django
]

# Add corsheaders middleware (must be at the TOP)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # <-- ADD THIS FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Allow React frontend to make requests
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React development server
]

# Add at the bottom of the file
CORS_ALLOW_ALL_ORIGINS = True  # Only for development!
```

**What is CORS?** Imagine your frontend (React at port 3000) wants to ask your backend (Django at port 8000) for data. Browsers block this by default for security (like a bouncer at a club). CORS is the "guest list" that says "port 3000 is allowed to talk to port 8000."

---

### Step 4: Create a Django View (API Endpoint)

Create `backend/api/views.py`:

```python
# api/views.py
from django.http import JsonResponse

def hello_world(request):
    """
    This function handles HTTP requests to /api/hello/
    It returns a JSON response that React can read.
    
    request - the HTTP request object (contains headers, method, etc.)
    JsonResponse - Django's way of sending JSON data
    """
    return JsonResponse({
        'message': 'Hello from Django!',
        'framework': 'Django 5.x',
        'status': 'success'
    })
```

**What is JSON?** JavaScript Object Notation - a text format for data. It looks like Python dictionaries:
```json
{
    "message": "Hello from Django!",
    "framework": "Django 5.x"
}
```

---

### Step 5: Create URL Routes

Create `backend/api/urls.py`:

```python
# api/urls.py
from django.urls import path
from . import views

# URL patterns connect URLs to functions
# When someone visits /api/hello/, Django calls hello_world()
urlpatterns = [
    path('hello/', views.hello_world, name='hello'),
]
```

Update `backend/hello_project/urls.py`:

```python
# hello_project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include our app's URLs under /api/
]
```

**What are URL routes?** Like a mail sorting system. `/api/hello/` gets sent to the `hello_world` function.

---

### Step 6: Install CORS Headers

```bash
# In your terminal (with venv activated)
pip install django-cors-headers
```

---

### Step 7: Run Django Server

```bash
# Make sure you're in the backend folder with venv activated
python manage.py migrate  # Create database tables
python manage.py runserver  # Start the server
```

Visit `http://127.0.0.1:8000/api/hello/` in your browser. You should see:
```json
{"message": "Hello from Django!", "framework": "Django 5.x", "status": "success"}
```

**🎉 Your backend is working!**

---

### Step 8: Set Up React Frontend

Open a **new terminal window** (keep Django running in the first one):

```bash
# Navigate to frontend folder
cd ../frontend

# Create React app using Vite (modern, fast alternative to create-react-app)
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**What is Vite?** A modern build tool that compiles your React code into something browsers understand. It's like a translator - you write modern JavaScript, Vite converts it to old JavaScript that all browsers can run.

**What is npm?** Node Package Manager - like `pip` for Python, but for JavaScript. It downloads libraries.

---

### Step 9: Configure Tailwind CSS

Update `frontend/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `frontend/src/index.css`:

```css
/* This file imports Tailwind's base styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* You can add your own custom CSS below */
body {
  font-family: 'Inter', system-ui, sans-serif;
}
```

**What do these directives do?**
- `@tailwind base` - Reset styles (removes browser defaults)
- `@tailwind components` - Pre-built component classes
- `@tailwind utilities` - All the utility classes (flex, p-4, bg-blue-500, etc.)

---

### Step 10: Create Your First React Component

Replace `frontend/src/App.jsx`:

```jsx
// App.jsx
import { useState, useEffect } from 'react';

function App() {
  // useState creates a variable that React watches for changes
  // When message changes, React re-renders the component
  const [message, setMessage] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  // useEffect runs code when the component loads (like Python's __init__)
  useEffect(() => {
    // Fetch data from Django backend
    fetch('http://127.0.0.1:8000/api/hello/')
      .then(response => response.json())  // Convert response to JSON
      .then(data => {
        setMessage(data.message);  // Update state with Django's message
        setLoading(false);         // Stop showing loading
      })
      .catch(error => {
        setMessage('Error: ' + error.message);
        setLoading(false);
      });
  }, []); // Empty array = run once when component mounts

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
        {/* Tailwind classes explained:
            bg-white = white background
            rounded-2xl = large rounded corners
            shadow-xl = extra large shadow
            p-12 = padding (3rem)
            text-center = center text
        */}
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚀 Django + React
        </h1>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-indigo-600 font-semibold">
              {message}
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700 text-sm">
                ✅ Backend connected successfully!
              </p>
            </div>
          </div>
        )}
        
        {/* Normal CSS example */}
        <style>{`
          .custom-border {
            border: 2px solid #e0e7ff;
          }
        `}</style>
        <div className="custom-border mt-6 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">
            This box uses normal CSS inside React
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

**Let's break down the React concepts:**

| Concept | Python Equivalent | What It Does |
|---------|------------------|--------------|
| `useState` | Instance variable | Stores data that triggers UI updates when changed |
| `useEffect` | `__init__` method | Runs code when component loads or updates |
| `fetch()` | `requests.get()` | Makes HTTP requests to APIs |
| ` JSX` | f-strings with HTML | Describes what the UI should look like |
| `className` | `class` attribute | Applies CSS classes (called `className` because `class` is a Python/JS keyword) |

---

### Step 11: Run React

```bash
# In the frontend folder
npm run dev
```

Visit `http://localhost:5173` (Vite's default port). You should see your beautiful Hello World app!

**🎉 Project 1 Complete!**

---

## 📋 Project 2: Counter App (Understanding State & API Communication)

### What We're Building
A counter that stores its value in Django's database, so it persists even if you refresh the page.

### Step 1: Django Model (Database Table)

```python
# backend/api/models.py
from django.db import models

class Counter(models.Model):
    """
    This creates a database table called 'api_counter'
    with columns: id, value, created_at, updated_at
    """
    value = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Counter: {self.value}"
```

**What is a Model?** Like a Python class that Django turns into a database table. Each instance is a row.

```bash
# Run these commands to create the database table
python manage.py makemigrations  # Create migration file
python manage.py migrate         # Apply to database
```

---

### Step 2: Django Serializer (JSON Converter)

```python
# backend/api/serializers.py
from rest_framework import serializers
from .models import Counter

class CounterSerializer(serializers.ModelSerializer):
    """
    Converts Counter model instances to JSON format.
    Like json.dumps() but for Django models.
    """
    class Meta:
        model = Counter
        fields = ['id', 'value', 'created_at', 'updated_at']
```

**What is a Serializer?** A translator. It converts Python objects (from the database) into JSON that React can understand, and vice versa.

---

### Step 3: Django Views with REST Framework

```python
# backend/api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Counter
from .serializers import CounterSerializer

@api_view(['GET', 'POST'])
def counter_detail(request):
    """
    GET  - Retrieve the current counter value
    POST - Update the counter value
    """
    # Get or create the counter (we only want one)
    counter, created = Counter.objects.get_or_create(id=1)
    
    if request.method == 'GET':
        serializer = CounterSerializer(counter)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Get the action from request body
        action = request.data.get('action')
        
        if action == 'increment':
            counter.value += 1
        elif action == 'decrement':
            counter.value -= 1
        elif action == 'reset':
            counter.value = 0
        
        counter.save()
        serializer = CounterSerializer(counter)
        return Response(serializer.data)
```

**What is `@api_view`?** A decorator (like Python's `@property`) that tells Django "this function handles HTTP requests and returns JSON."

---

### Step 4: Update URLs

```python
# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello'),
    path('counter/', views.counter_detail, name='counter'),
]
```

Install DRF:
```bash
pip install djangorestframework
```

Add to `settings.py`:
```python
INSTALLED_APPS = [
    # ... existing apps ...
    'rest_framework',
]
```

---

### Step 5: React Counter Component

```jsx
// frontend/src/App.jsx
import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/api';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load counter from Django on page load
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      const response = await fetch(`${API_URL}/counter/`);
      const data = await response.json();
      setCount(data.value);
    } catch (error) {
      console.error('Error fetching counter:', error);
    }
  };

  const updateCounter = async (action) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/counter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      setCount(data.value);
    } catch (error) {
      console.error('Error updating counter:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Main card container */}
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-700">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Counter App
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Data persists in Django database
        </p>

        {/* Counter Display */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-center">
          <span className="text-6xl font-bold text-white">
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => updateCounter('decrement')}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            −
          </button>
          
          <button
            onClick={() => updateCounter('reset')}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            Reset
          </button>
          
          <button
            onClick={() => updateCounter('increment')}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            +
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <p className="text-center text-gray-400 mt-4 animate-pulse">
            Saving to database...
          </p>
        )}

        {/* Normal CSS for custom animation */}
        <style>{`
          @keyframes bounce-in {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-in {
            animation: bounce-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;
```

**Key Concepts Explained:**

| React Concept | Explanation |
|--------------|-------------|
| `async/await` | Like Python's `async def` - handles asynchronous operations without callback hell |
| `fetch()` with options | `method: 'POST'` sends data, `headers` tells server it's JSON, `body` is the data |
| `JSON.stringify()` | Converts JavaScript object to JSON string (opposite of `json.loads()`) |
| `disabled={loading}` | Disables buttons while request is in flight |
| `transform hover:scale-105` | Tailwind: scales element up 5% on hover |

---

## 📋 Project 3: Todo List (Full CRUD Operations)

### What We're Building
A complete todo application with create, read, update, delete operations.

### Django Backend

```python
# backend/api/models.py
from django.db import models

class Todo(models.Model):
    """
    A Todo item with title, description, completion status, and priority.
    """
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']  # Newest first
    
    def __str__(self):
        return self.title
```

```python
# backend/api/serializers.py
from rest_framework import serializers
from .models import Todo, Counter

class TodoSerializer(serializers.ModelSerializer):
    """
    Serializes Todo model. The 'id' field is read-only (auto-generated).
    """
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'priority', 'created_at', 'due_date']
        read_only_fields = ['id', 'created_at']
```

```python
# backend/api/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    """
    ViewSet automatically provides:
    - list()    → GET /api/todos/
    - create()  → POST /api/todos/
    - retrieve()→ GET /api/todos/1/
    - update()  → PUT /api/todos/1/
    - destroy() → DELETE /api/todos/1/
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Custom endpoint: GET /api/todos/stats/"""
        total = Todo.objects.count()
        completed = Todo.objects.filter(completed=True).count()
        pending = total - completed
        
        return Response({
            'total': total,
            'completed': completed,
            'pending': pending,
            'completion_rate': round((completed / total * 100), 2) if total > 0 else 0
        })
    
    @action(detail=True, methods=['post'])
    def toggle(self, request, pk=None):
        """Custom endpoint: POST /api/todos/1/toggle/"""
        todo = self.get_object()
        todo.completed = not todo.completed
        todo.save()
        serializer = self.get_serializer(todo)
        return Response(serializer.data)
```

```python
# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'todos', views.TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

**What is a ViewSet?** A "super view" that handles all CRUD operations automatically. It's like Django's generic views but for APIs.

---

### React Frontend

```jsx
// frontend/src/App.jsx
import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/api';

// Reusable component: TodoItem
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
      todo.completed 
        ? 'bg-gray-50 border-gray-200 opacity-75' 
        : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1">
        <h3 className={`font-semibold ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
        )}
        <div className="flex gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(todo.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(`${API_URL}/todos/`);
    const data = await response.json();
    setTodos(data);
  };

  const fetchStats = async () => {
    const response = await fetch(`${API_URL}/todos/stats/`);
    const data = await response.json();
    setStats(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const url = editingId 
      ? `${API_URL}/todos/${editingId}/`
      : `${API_URL}/todos/`;
    
    const method = editingId ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ title: '', description: '', priority: 'medium', completed: false });
      setEditingId(null);
      fetchTodos();
      fetchStats();
    }
  };

  const handleToggle = async (id) => {
    await fetch(`${API_URL}/todos/${id}/toggle/`, { method: 'POST' });
    fetchTodos();
    fetchStats();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/todos/${id}/`, { method: 'DELETE' });
    fetchTodos();
    fetchStats();
  };

  const handleEdit = (todo) => {
    setFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      completed: todo.completed,
    });
    setEditingId(todo.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
          <p className="text-gray-600">Built with Django + React + Tailwind</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-500">Done</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none h-24"
            />
            <div className="flex gap-4">
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {editingId ? 'Update Todo' : 'Add Todo'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', description: '', priority: 'medium', completed: false });
                  }}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No todos yet!</p>
              <p className="text-sm">Add one above to get started</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>

      {/* Normal CSS for custom scrollbar */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #c7c7c7;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a0a0a0;
        }
      `}</style>
    </div>
  );
}

export default App;
```

---

## 📋 Project 4: Weather Dashboard (External APIs & Async Operations)

### What We're Building
A weather app that fetches real weather data from an external API and stores search history in Django.

### Django Backend

```python
# backend/api/models.py
import requests
from django.db import models
from django.conf import settings

class WeatherSearch(models.Model):
    city = models.CharField(max_length=100)
    temperature = models.FloatField()
    description = models.CharField(max_length=200)
    humidity = models.IntegerField()
    wind_speed = models.FloatField()
    icon = models.CharField(max_length=50)
    searched_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-searched_at']
    
    def __str__(self):
        return f"{self.city}: {self.temperature}°C"

# backend/api/views.py
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import WeatherSearch
from .serializers import WeatherSearchSerializer

OPENWEATHER_API_KEY = 'your_api_key_here'  # Get from openweathermap.org

@api_view(['GET', 'POST'])
def weather_search(request):
    if request.method == 'GET':
        # Return search history
        searches = WeatherSearch.objects.all()[:10]
        serializer = WeatherSearchSerializer(searches, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        city = request.data.get('city')
        
        # Fetch from OpenWeather API
        url = f'https://api.openweathermap.org/data/2.5/weather'
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'  # Celsius
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if response.status_code != 200:
            return Response({'error': data.get('message', 'City not found')}, status=400)
        
        # Save to database
        weather = WeatherSearch.objects.create(
            city=city,
            temperature=data['main']['temp'],
            description=data['weather'][0]['description'],
            humidity=data['main']['humidity'],
            wind_speed=data['wind']['speed'],
            icon=data['weather'][0]['icon']
        )
        
        serializer = WeatherSearchSerializer(weather)
        return Response(serializer.data)
```

---

### React Frontend

```jsx
// frontend/src/App.jsx
import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/api';

function WeatherCard({ data }) {
  const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{data.city}</h2>
          <p className="text-blue-100 capitalize">{data.description}</p>
        </div>
        <div className="text-6xl">
          {weatherIcons[data.icon] || '🌡️'}
        </div>
      </div>
      
      <div className="text-6xl font-bold mb-6">
        {Math.round(data.temperature)}°C
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-blue-100 text-sm">Humidity</p>
          <p className="text-2xl font-semibold">{data.humidity}%</p>
        </div>
        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-blue-100 text-sm">Wind Speed</p>
          <p className="text-2xl font-semibold">{data.wind_speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await fetch(`${API_URL}/weather/`);
    const data = await response.json();
    setHistory(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/weather/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather');
      }
      
      setWeather(data);
      fetchHistory();
      setCity('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-blue-200">Real-time weather data powered by OpenWeather</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-14"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-center mt-2">{error}</p>
          )}
        </form>

        {/* Weather Display */}
        {weather && (
          <div className="mb-10 animate-fade-in">
            <WeatherCard data={weather} />
          </div>
        )}

        {/* Search History */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Searches</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCity(item.city);
                  handleSearch({ preventDefault: () => {} });
                }}
                className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left transition-all hover:scale-105"
              >
                <p className="text-white font-semibold">{item.city}</p>
                <p className="text-blue-200">{Math.round(item.temperature)}°C</p>
                <p className="text-xs text-blue-300 mt-1">
                  {new Date(item.searched_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Normal CSS animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
```

---

## 📋 Project 5: E-Commerce Store (Authentication & Advanced State)

### What We're Building
A full e-commerce app with user authentication, shopping cart, and product management.

### Django Backend - Authentication Setup

```python
# backend/api/models.py
from django.contrib.auth.models import User
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'product']
    
    @property
    def total_price(self):
        return self.product.price * self.quantity

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    shipping_address = models.TextField()
```

```python
# backend/api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Category, CartItem, Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'image', 'category', 'category_id', 'stock', 'is_active']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price', 'added_at']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'status', 'total_amount', 'created_at', 'shipping_address']
```

```python
# backend/api/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Product, Category, CartItem, Order
from .serializers import *

# Authentication Views
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'user': UserSerializer(user).data,
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=401)
    
    refresh = RefreshToken.for_user(user)
    return Response({
        'user': UserSerializer(user).data,
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    })

# Product ViewSet
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_slug = request.query_params.get('category')
        if category_slug:
            products = self.queryset.filter(category__slug=category_slug)
        else:
            products = self.queryset
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

# Cart ViewSet
class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(items, many=True)
        total = sum(item.total_price for item in items)
        return Response({'items': serializer.data, 'total': total})
    
    @action(detail=False, methods=['post'])
    def add(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        product = Product.objects.get(id=product_id)
        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            item.quantity += quantity
            item.save()
        
        return Response({'message': 'Added to cart'})
    
    @action(detail=False, methods=['post'])
    def remove(self, request):
        item_id = request.data.get('item_id')
        CartItem.objects.filter(id=item_id, user=request.user).delete()
        return Response({'message': 'Removed from cart'})
```

```python
# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'cart', views.CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.register),
    path('auth/login/', views.login),
    path('auth/refresh/', TokenRefreshView.as_view()),
]
```

Install JWT:
```bash
pip install djangorestframework-simplejwt
```

Update `settings.py`:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
```

---

### React Frontend - Complete E-Commerce

```jsx
// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  });

  return (
    <AuthContext.Provider value={{ user, login, logout, getAuthHeaders, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

```jsx
// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

const API_URL = 'http://127.0.0.1:8000/api';

// ==================== COMPONENTS ====================

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Shop</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 font-medium">
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-indigo-600 font-medium relative">
                  Cart
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">Hi, {user.username}</span>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-indigo-600 font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock < 10 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Low Stock
          </span>
        )}
      </div>
      
      <div className="p-6">
        <p className="text-sm text-indigo-600 font-medium mb-1">{product.category.name}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => onAddToCart(product.id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== PAGES ====================

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our Store</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Quality meets affordability.
          </p>
          <Link 
            to="/products"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { getAuthHeaders } = useAuth();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products/`);
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/categories/`);
    const data = await response.json();
    setCategories(data);
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/add/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      
      if (response.ok) {
        alert('Added to cart!');
      } else {
        alert('Please login first');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
        
        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Create Account</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.passwordConfirm}
              onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors mt-6"
          >
            Create Account
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

Install React Router:
```bash
npm install react-router-dom
```

---

## 📋 Project 6: Production-Ready SaaS Platform

### What We're Building
A complete SaaS application with:
- Multi-tenancy
- Stripe payments
- Email notifications
- Admin dashboard
- Docker deployment
- CI/CD pipeline

### Project Structure
```
saas-platform/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── users/
│   │   ├── subscriptions/
│   │   ├── projects/
│   │   └── notifications/
│   └── templates/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   └── styles/
│   └── public/
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── .github/
    └── workflows/
        └── deploy.yml
```

### Docker Configuration

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Run gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "config.wsgi:application"]
```

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: saas_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - DATABASE_URLI'll continue the comprehensive Django + React + Tailwind guide, completing the production-level SaaS project and adding deployment instructions.

---

```yaml
      - DATABASE_URL=postgres://postgres:${DB_PASSWORD}@db:5432/saas_db
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    depends_on:
      - db
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  celery:
    build: ./backend
    command: celery -A config worker -l info
    volumes:
      - ./backend:/app
    depends_on:
      - db
      - redis

  celery-beat:
    build: ./backend
    command: celery -A config beat -l info
    volumes:
      - ./backend:/app
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
```

### Django Production Settings

```python
# backend/config/settings/production.py
from .base import *

DEBUG = False

ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# Security
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': '5432',
    }
}

# Cache
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.getenv('REDIS_URL'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Static & Media
STATIC_ROOT = '/app/staticfiles'
MEDIA_ROOT = '/app/media'
MEDIA_URL = '/media/'

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = os.getenv('SENDGRID_API_KEY')

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/app/logs/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

### Stripe Integration (Django)

```python
# backend/apps/subscriptions/models.py
import stripe
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class Plan(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stripe_price_id = models.CharField(max_length=100)
    interval = models.CharField(max_length=20, choices=[
        ('month', 'Monthly'),
        ('year', 'Yearly'),
    ])
    features = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class Subscription(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('canceled', 'Canceled'),
        ('past_due', 'Past Due'),
        ('unpaid', 'Unpaid'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True)
    stripe_subscription_id = models.CharField(max_length=100)
    stripe_customer_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    current_period_start = models.DateTimeField()
    current_period_end = models.DateTimeField()
    cancel_at_period_end = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.plan.name}"
    
    @property
    def is_active(self):
        return self.status == 'active' and self.current_period_end > timezone.now()

# backend/apps/subscriptions/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import stripe
from .models import Plan, Subscription
from .serializers import PlanSerializer, SubscriptionSerializer

class PlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Plan.objects.filter(is_active=True)
    serializer_class = PlanSerializer
    permission_classes = []

class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def create_checkout(self, request):
        plan_id = request.data.get('plan_id')
        plan = Plan.objects.get(id=plan_id)
        
        # Get or create Stripe customer
        subscription, created = Subscription.objects.get_or_create(
            user=request.user,
            defaults={'stripe_customer_id': ''}
        )
        
        if not subscription.stripe_customer_id:
            customer = stripe.Customer.create(
                email=request.user.email,
                metadata={'user_id': request.user.id}
            )
            subscription.stripe_customer_id = customer.id
            subscription.save()
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            customer=subscription.stripe_customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price': plan.stripe_price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f"{settings.FRONTEND_URL}/subscription/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.FRONTEND_URL}/subscription/cancel",
        )
        
        return Response({'checkout_url': session.url})
    
    @action(detail=False, methods=['post'])
    def cancel(self, request):
        subscription = self.get_queryset().first()
        if not subscription:
            return Response({'error': 'No active subscription'}, status=400)
        
        stripe.Subscription.modify(
            subscription.stripe_subscription_id,
            cancel_at_period_end=True
        )
        
        subscription.cancel_at_period_end = True
        subscription.save()
        
        return Response({'message': 'Subscription will cancel at period end'})

# Webhook handler
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)
    
    # Handle events
    if event['type'] == 'invoice.payment_succeeded':
        subscription_id = event['data']['object']['subscription']
        subscription = Subscription.objects.get(stripe_subscription_id=subscription_id)
        subscription.status = 'active'
        subscription.save()
    
    elif event['type'] == 'invoice.payment_failed':
        subscription_id = event['data']['object']['subscription']
        subscription = Subscription.objects.get(stripe_subscription_id=subscription_id)
        subscription.status = 'past_due'
        subscription.save()
    
    return HttpResponse(status=200)
```

### React SaaS Frontend - Advanced Patterns

```jsx
// frontend/src/context/SubscriptionContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const { user, getAuthHeaders } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
      fetchPlans();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${API_URL}/subscriptions/`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setSubscription(data[0] || null);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    const response = await fetch(`${API_URL}/plans/`);
    const data = await response.json();
    setPlans(data);
  };

  const subscribe = async (planId) => {
    const response = await fetch(`${API_URL}/subscriptions/create_checkout/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ plan_id: planId }),
    });
    const data = await response.json();
    window.location.href = data.checkout_url; // Redirect to Stripe
  };

  const value = {
    subscription,
    plans,
    loading,
    isSubscribed: subscription?.is_active || false,
    subscribe,
    refresh: fetchSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
```

```jsx
// frontend/src/components/PricingCards.jsx
import { useSubscription } from '../context/SubscriptionContext';

function PricingCards() {
  const { plans, isSubscribed, subscribe, subscription } = useSubscription();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-2xl p-8 ${
            plan.slug === 'pro'
              ? 'bg-gradient-to-b from-indigo-600 to-purple-700 text-white scale-105 shadow-2xl'
              : 'bg-white border border-gray-200 text-gray-900'
          }`}
        >
          {plan.slug === 'pro' && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </span>
          )}
          
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className={`mb-6 ${plan.slug === 'pro' ? 'text-indigo-100' : 'text-gray-500'}`}>
            {plan.description}
          </p>
          
          <div className="mb-8">
            <span className="text-5xl font-bold">${plan.price}</span>
            <span className={`text-lg ${plan.slug === 'pro' ? 'text-indigo-200' : 'text-gray-400'}`}>
              /{plan.interval}
            </span>
          </div>
          
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <svg className={`w-5 h-5 ${plan.slug === 'pro' ? 'text-green-300' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => subscribe(plan.id)}
            disabled={isSubscribed && subscription?.plan?.id === plan.id}
            className={`w-full py-3 rounded-xl font-bold transition-all ${
              plan.slug === 'pro'
                ? 'bg-white text-indigo-600 hover:bg-gray-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubscribed && subscription?.plan?.id === plan.id
              ? 'Current Plan'
              : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

```jsx
// frontend/src/components/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

function AdminDashboard() {
  const { getAuthHeaders } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    growthData: [],
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const response = await fetch(`${API_URL}/admin/dashboard/`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    setStats(data.stats);
    setRecentUsers(data.recentUsers);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="bg-blue-500"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          icon="⭐"
          color="bg-green-500"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue}`}
          icon="💰"
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Signups</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {user.plan || 'Free'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.dateJoined).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center">
      <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run tests
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test_db
        run: |
          cd backend
          python manage.py test
      
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install frontend dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build frontend
        run: |
          cd frontend
          npm run build
      
      - name: Run frontend tests
        run: |
          cd frontend
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/saas-platform
            git pull origin main
            docker-compose down
            docker-compose up -d --build
            docker-compose exec backend python manage.py migrate
            docker-compose exec backend python manage.py collectstatic --noinput
```

### Nginx Configuration

```nginx
# nginx/nginx.conf
upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /app/staticfiles/;
    }

    location /media/ {
        alias /app/media/;
    }
}
```

---

## 📚 Complete Learning Path Summary

| Project | Django Skills | React Skills | Tailwind Skills | Production Concepts |
|---------|--------------|--------------|-----------------|---------------------|
| **1. Hello World** | Setup, Views, CORS | Components, JSX, useState/useEffect | Basic utilities, gradients | Project structure |
| **2. Counter** | Models, Serializers, DRF | State management, API calls | Buttons, cards, animations | Database persistence |
| **3. Todo List** | ViewSets, CRUD, Filtering | Lists, forms, conditional rendering | Complex layouts, custom scrollbars | RESTful design |
| **4. Weather** | External APIs, Error handling | Async/await, error states | Glassmorphism, responsive grids | Third-party integration |
| **5. E-Commerce** | JWT Auth, Relationships | Context API, React Router, Protected routes | Full UI system, hover effects | Authentication patterns |
| **6. SaaS Platform** | Stripe, Celery, Multi-tenancy | Advanced hooks, Charts, Admin dashboards | Custom design system | Docker, CI/CD, Monitoring |

---

## 🎯 Key Concepts Map (Python → React)

| Python Concept | React/JavaScript Equivalent | Purpose |
|---------------|---------------------------|---------|
| `class` | `function` + Hooks | Component definition |
| `__init__` | `useEffect(() => {}, [])` | Initialization |
| `self.variable` | `useState()` | State management |
| `@property` | `useMemo()` | Computed values |
| `list.append()` | `setState([...prev, new])` | Immutable updates |
| `dict.update()` | `setState({...prev, ...new})` | Object updates |
| `requests.get()` | `fetch()` | HTTP requests |
| `json.dumps()` | `JSON.stringify()` | Serialization |
| `json.loads()` | `response.json()` | Deserialization |
| `try/except` | `try/catch` | Error handling |
| `if/else` | `condition ? a : b` | Ternary operator |
| `for item in list` | `list.map(item => ...)` | Iteration |
| `def` | `function` or `const fn = () =>` | Function definition |
| `*args` | `...props` | Spread operator |
| `lambda` | Arrow functions `() =>` | Anonymous functions |

---

## 🚀 Next Steps After Completing All Projects

1. **TypeScript**: Add type safety to all your React components
2. **Next.js**: Learn server-side rendering with React
3. **GraphQL**: Replace REST with Apollo Client
4. **React Native**: Build mobile apps with your React skills
5. **Microservices**: Split your Django monolith
6. **Kubernetes**: Orchestrate your Docker containers
7. **AWS/GCP**: Deploy to cloud infrastructure
I'll expand on the most critical production concepts and add advanced features. Let me search for the latest patterns first, then give you deep dives.

---

# 🚀 Advanced Django + React Production Guide
## Deep Dives: Real-Time, AI, Testing & Deployment

---

## Part 1: Real-Time Features with WebSockets (Django Channels)

### What We're Building
A live chat system where messages appear instantly without refreshing.

### Architecture
```
┌─────────────┐      HTTP      ┌─────────────┐
│   React     │ ◄────────────► │   Django    │
│  (Browser)  │                │   (REST)    │
└──────┬──────┘                └─────────────┘
       │
       │ WebSocket (persistent connection)
       ▼
┌─────────────┐                ┌─────────────┐
│   React     │ ◄────────────► │  Channels   │
│  (Browser)  │   ws://chat    │  (Consumer) │
└─────────────┘                └──────┬──────┘
                                      │
                                      ▼
                                ┌─────────────┐
                                │   Redis     │
                                │  (Message   │
                                │   Broker)   │
                                └─────────────┘
```

**Why WebSockets?** Normal HTTP is like sending a letter—you ask, you get a reply, connection closes. WebSocket is like a phone call—connection stays open, both sides can talk anytime.

---

### Step 1: Install Django Channels

```bash
# In your backend folder with venv activated
pip install channels channels-redis daphne
```

**What is each?**
- **Channels** = Django's WebSocket support (like adding a phone line to your restaurant)
- **Redis** = Message broker (like a receptionist who routes calls)
- **Daphne** = WebSocket server (like a phone switchboard)

---

### Step 2: Configure Django for Channels

```python
# backend/config/asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# This handles both HTTP and WebSocket
application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Normal Django HTTP
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                # We'll define chat routes here
                __import__('apps.chat.routing').websocket_urlpatterns
            )
        )
    ),
})
```

```python
# backend/config/settings/base.py
INSTALLED_APPS = [
    'daphne',  # Must be FIRST, before django.contrib
    'django.contrib.admin',
    'django.contrib.auth',
    # ... other apps ...
    'channels',
    'apps.chat',
]

# Tell Django to use Channels
ASGI_APPLICATION = 'config.asgi.application'

# Redis as the message broker
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('redis', 6379)],  # 'redis' is the Docker service name
        },
    },
}
```

---

### Step 3: Create Chat Models

```python
# backend/apps/chat/models.py
from django.db import models
from django.contrib.auth.models import User

class ChatRoom(models.Model):
    """
    A room where multiple users can chat.
    Like a WhatsApp group or Slack channel.
    """
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    participants = models.ManyToManyField(User, related_name='chat_rooms')
    is_private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Message(models.Model):
    """
    A single chat message.
    """
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.sender.username}: {self.content[:50]}"
```

---

### Step 4: Create WebSocket Consumer

```python
# backend/apps/chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatRoom, Message

class ChatConsumer(AsyncWebsocketConsumer):
    """
    A consumer handles WebSocket connections.
    Think of it as a view, but for WebSockets instead of HTTP.
    """
    
    async def connect(self):
        """
        Called when a client opens a WebSocket connection.
        Like someone picking up the phone.
        """
        # Get room name from URL (e.g., /ws/chat/room-name/)
        self.room_slug = self.scope['url_route']['kwargs']['room_slug']
        self.room_group_name = f'chat_{self.room_slug}'
        
        # Check if user is authenticated
        self.user = self.scope['user']
        if self.user.is_anonymous:
            await self.close()  # Hang up if not logged in
            return
        
        # Join the room group (like joining a conference call)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name  # Unique ID for this connection
        )
        
        await self.accept()  # Say "hello, connection accepted"
        
        # Send previous messages
        messages = await self.get_recent_messages()
        await self.send(text_data=json.dumps({
            'type': 'history',
            'messages': messages
        }))
    
    async def disconnect(self, close_code):
        """
        Called when client closes connection.
        Like hanging up the phone.
        """
        # Leave the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        """
        Called when client sends a message.
        Like hearing someone speak on the phone.
        """
        data = json.loads(text_data)
        message_content = data['message']
        
        # Save to database
        message = await self.save_message(message_content)
        
        # Broadcast to everyone in the room
        # This is the magic—send to ALL connected clients
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',  # Calls chat_message method
                'message': {
                    'id': message['id'],
                    'content': message['content'],
                    'sender': message['sender'],
                    'timestamp': message['timestamp'],
                }
            }
        )
    
    async def chat_message(self, event):
        """
        Called when a message is broadcast to the group.
        Sends the message to this specific client.
        """
        await self.send(text_data=json.dumps({
            'type': 'message',
            'data': event['message']
        }))
    
    @database_sync_to_async
    def save_message(self, content):
        """
        Database operations must be async-safe.
        This wrapper lets us use Django ORM in async code.
        """
        room = ChatRoom.objects.get(slug=self.room_slug)
        message = Message.objects.create(
            room=room,
            sender=self.user,
            content=content
        )
        return {
            'id': message.id,
            'content': message.content,
            'sender': message.sender.username,
            'timestamp': message.created_at.isoformat(),
        }
    
    @database_sync_to_async
    def get_recent_messages(self):
        """Get last 50 messages for chat history."""
        room = ChatRoom.objects.get(slug=self.room_slug)
        messages = room.messages.select_related('sender').all()[:50]
        return [
            {
                'id': m.id,
                'content': m.content,
                'sender': m.sender.username,
                'timestamp': m.created_at.isoformat(),
            }
            for m in messages
        ]
```

---

### Step 5: WebSocket Routing

```python
# backend/apps/chat/routing.py
from django.urls import re_path
from . import consumers

# URL patterns for WebSocket connections
# ws://localhost:8000/ws/chat/room-name/
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_slug>[\w-]+)/$', consumers.ChatConsumer.as_asgi()),
]
```

---

### Step 6: React WebSocket Hook

```jsx
// frontend/src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for WebSocket connections.
 * Like useEffect, but for persistent connections.
 */
export function useWebSocket(url) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const ws = useRef(null);  // Use ref so it doesn't cause re-renders

  useEffect(() => {
    // Create WebSocket connection
    const token = localStorage.getItem('access_token');
    const socket = new WebSocket(`${url}?token=${token}`);
    
    ws.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected!');
      setConnected(true);
      setError(null);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'history') {
        // Load previous messages
        setMessages(data.messages);
      } else if (data.type === 'message') {
        // New message arrived
        setMessages(prev => [...prev, data.data]);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('Connection error');
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [url]);

  // Send message function (wrapped in useCallback for stability)
  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message }));
    } else {
      setError('Not connected');
    }
  }, []);

  return { connected, messages, sendMessage, error };
}
```

---

### Step 7: React Chat Component

```jsx
// frontend/src/components/ChatRoom.jsx
import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../context/AuthContext';

function ChatRoom({ roomSlug }) {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Connect to WebSocket
  const wsUrl = `ws://localhost:8000/ws/chat/${roomSlug}/`;
  const { connected, messages, sendMessage, error } = useWebSocket(wsUrl);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">#{roomSlug}</h2>
          <p className="text-sm text-gray-500">
            {connected ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Connected
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Disconnected
              </span>
            )}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {messages.length} messages
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.sender === user?.username;
          
          return (
            <div
              key={msg.id || index}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                isMe
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}>
                {!isMe && (
                  <p className={`text-xs font-semibold mb-1 ${
                    isMe ? 'text-indigo-200' : 'text-indigo-600'
                  }`}>
                    {msg.sender}
                  </p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  isMe ? 'text-indigo-200' : 'text-gray-400'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={connected ? "Type a message..." : "Connecting..."}
            disabled={!connected}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!connected || !inputMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
```

---

## Part 2: AI Integration (OpenAI + Django + React)

### What We're Building
An AI-powered content generator that uses GPT-4 to create blog posts, with usage tracking.

### Django Backend

```python
# backend/apps/ai/models.py
from django.db import models
from django.contrib.auth.models import User
import uuid

class AIRequest(models.Model):
    """
    Tracks every AI API call for billing and monitoring.
    Like a phone bill that tracks every call.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_requests')
    prompt = models.TextField()
    response = models.TextField()
    tokens_used = models.PositiveIntegerField()
    model = models.CharField(max_length=50, default='gpt-4')
    cost_usd = models.DecimalField(max_digits=10, decimal_places=6)
    processing_time_ms = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

class UserAIQuota(models.Model):
    """
    Tracks how much AI usage each user has left.
    Like a data plan on your phone.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='ai_quota')
    monthly_limit = models.PositiveIntegerField(default=100000)  # tokens
    tokens_used_this_month = models.PositiveIntegerField(default=0)
    reset_date = models.DateField()
    
    @property
    def tokens_remaining(self):
        return max(0, self.monthly_limit - self.tokens_used_this_month)
    
    @property
    def percent_used(self):
        return (self.tokens_used_this_month / self.monthly_limit) * 100
```

```python
# backend/apps/ai/services.py
import openai
import time
from django.conf import settings
from django.db import transaction
from .models import AIRequest, UserAIQuota

openai.api_key = settings.OPENAI_API_KEY

class AIService:
    """
    Service class that handles all AI interactions.
    Like a manager who handles all external vendor calls.
    """
    
    # Cost per 1K tokens (as of 2026)
    PRICING = {
        'gpt-4': {'input': 0.03, 'output': 0.06},
        'gpt-4-turbo': {'input': 0.01, 'output': 0.03},
        'gpt-3.5-turbo': {'input': 0.0005, 'output': 0.0015},
    }
    
    @classmethod
    def generate_content(cls, user, prompt, model='gpt-4-turbo', max_tokens=1000):
        """
        Generate AI content with usage tracking.
        Returns the generated text and usage info.
        """
        # Check quota
        quota, _ = UserAIQuota.objects.get_or_create(
            user=user,
            defaults={'reset_date': timezone.now().date()}
        )
        
        if quota.tokens_remaining <= 0:
            raise ValueError("Monthly AI quota exceeded. Upgrade your plan.")
        
        # Call OpenAI API
        start_time = time.time()
        
        try:
            response = openai.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that generates high-quality content."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=max_tokens,
                temperature=0.7,
            )
            
            processing_time = int((time.time() - start_time) * 1000)
            
            # Calculate usage
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            total_tokens = response.usage.total_tokens
            
            # Calculate cost
            pricing = cls.PRICING.get(model, cls.PRICING['gpt-4-turbo'])
            cost = (input_tokens / 1000 * pricing['input'] + 
                   output_tokens / 1000 * pricing['output'])
            
            # Save to database (within transaction for safety)
            with transaction.atomic():
                ai_request = AIRequest.objects.create(
                    user=user,
                    prompt=prompt,
                    response=response.choices[0].message.content,
                    tokens_used=total_tokens,
                    model=model,
                    cost_usd=cost,
                    processing_time_ms=processing_time
                )
                
                # Update quota
                quota.tokens_used_this_month += total_tokens
                quota.save()
            
            return {
                'content': response.choices[0].message.content,
                'tokens_used': total_tokens,
                'cost': cost,
                'processing_time': processing_time,
            }
            
        except openai.error.RateLimitError:
            raise ValueError("AI service is currently busy. Please try again.")
        except openai.error.APIError:
            raise ValueError("AI service error. Please try again later.")

    @classmethod
    def stream_content(cls, user, prompt, model='gpt-4-turbo'):
        """
        Stream AI content word-by-word for better UX.
        Like watching text appear as someone types.
        """
        quota, _ = UserAIQuota.objects.get_or_create(
            user=user,
            defaults={'reset_date': timezone.now().date()}
        )
        
        if quota.tokens_remaining <= 0:
            raise ValueError("Monthly AI quota exceeded.")
        
        # This returns a generator that yields chunks
        response = openai.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            stream=True,  # Enable streaming
            max_tokens=1000,
        )
        
        full_content = ""
        total_tokens = 0
        
        for chunk in response:
            if chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                full_content += content
                yield {
                    'type': 'chunk',
                    'content': content,
                }
        
        # Save final result
        # (In production, you'd count tokens properly)
        AIRequest.objects.create(
            user=user,
            prompt=prompt,
            response=full_content,
            tokens_used=len(full_content.split()) * 2,  # Rough estimate
            model=model,
            cost_usd=0,  # Calculate properly
            processing_time_ms=0
        )
```

```python
# backend/apps/ai/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import StreamingHttpResponse
import json
from .services import AIService
from .models import UserAIQuota
from .serializers import AIRequestSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_content(request):
    """
    Generate AI content (non-streaming).
    Returns complete response.
    """
    prompt = request.data.get('prompt')
    model = request.data.get('model', 'gpt-4-turbo')
    
    if not prompt:
        return Response({'error': 'Prompt is required'}, status=400)
    
    try:
        result = AIService.generate_content(
            user=request.user,
            prompt=prompt,
            model=model
        )
        return Response(result)
    except ValueError as e:
        return Response({'error': str(e)}, status=429)
    except Exception as e:
        return Response({'error': 'AI service error'}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def stream_content(request):
    """
    Stream AI content using Server-Sent Events (SSE).
    React reads this as a stream.
    """
    prompt = request.query_params.get('prompt')
    model = request.query_params.get('model', 'gpt-4-turbo')
    
    if not prompt:
        return Response({'error': 'Prompt is required'}, status=400)
    
    def event_stream():
        try:
            for chunk in AIService.stream_content(request.user, prompt, model):
                yield f"data: {json.dumps(chunk)}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingHttpResponse(
        event_stream(),
        content_type='text/event-stream'
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quota(request):
    """Get user's remaining AI quota."""
    quota, _ = UserAIQuota.objects.get_or_create(
        user=request.user,
        defaults={'reset_date': timezone.now().date()}
    )
    
    return Response({
        'monthly_limit': quota.monthly_limit,
        'tokens_used': quota.tokens_used_this_month,
        'tokens_remaining': quota.tokens_remaining,
        'percent_used': quota.percent_used,
        'reset_date': quota.reset_date,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_history(request):
    """Get user's AI request history."""
    requests = request.user.ai_requests.all()[:50]
    serializer = AIRequestSerializer(requests, many=True)
    return Response(serializer.data)
```

---

### React AI Component with Streaming

```jsx
// frontend/src/components/AIContentGenerator.jsx
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://127.0.0.1:8000/api';

function AIContentGenerator() {
  const { user, getAuthHeaders } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quota, setQuota] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo');
  const abortController = useRef(null);

  useEffect(() => {
    fetchQuota();
    fetchHistory();
  }, []);

  const fetchQuota = async () => {
    const response = await fetch(`${API_URL}/ai/quota/`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    setQuota(data);
  };

  const fetchHistory = async () => {
    const response = await fetch(`${API_URL}/ai/history/`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    setHistory(data);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedContent('');
    
    // Create abort controller for cancellation
    abortController.current = new AbortController();
    
    try {
      // Use streaming for better UX
      const response = await fetch(
        `${API_URL}/ai/stream/?prompt=${encodeURIComponent(prompt)}&model=${selectedModel}`,
        {
          headers: getAuthHeaders(),
          signal: abortController.current.signal,
        }
      );
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              setIsGenerating(false);
              fetchQuota();
              fetchHistory();
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setGeneratedContent(prev => prev + parsed.content);
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Generation cancelled');
      } else {
        alert('Error: ' + error.message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancel = () => {
    abortController.current?.abort();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    // Show toast notification
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Content Generator</h1>
          <p className="text-gray-600">Powered by GPT-4</p>
        </div>

        {/* Quota Bar */}
        {quota && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Monthly Usage: {quota.tokens_used.toLocaleString()} / {quota.monthly_limit.toLocaleString()} tokens
              </span>
              <span className="text-sm text-gray-500">
                {quota.tokens_remaining.toLocaleString()} remaining
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  quota.percent_used > 90 ? 'bg-red-500' : 
                  quota.percent_used > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(quota.percent_used, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="gpt-4-turbo">GPT-4 Turbo (Fast)</option>
              <option value="gpt-4">GPT-4 (Best Quality)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 (Cheapest)</option>
            </select>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would you like to create?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Write a blog post about sustainable energy..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-32 mb-4"
          />
          
          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate
                </>
              )}
            </button>
            
            {isGenerating && (
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Output Section */}
        {generatedContent && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Generated Content</h3>
              <button
                onClick={handleCopy}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {generatedContent}
                {isGenerating && (
                  <span className="inline-block w-2 h-4 bg-indigo-600 ml-1 animate-pulse"></span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Generations</h3>
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  setPrompt(item.prompt);
                  setGeneratedContent(item.response);
                }}
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.prompt}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>{item.tokens_used} tokens</span>
                  <span>${item.cost_usd}</span>
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIContentGenerator;
```

---

## Part 3: Testing Deep Dive

### Django Testing

```python
# backend/apps/chat/tests.py
import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth.models import User
from .models import ChatRoom, Message
from .consumers import ChatConsumer

@pytest.mark.asyncio
async def test_chat_consumer():
    """
    Test WebSocket consumer.
    Like testing a phone call.
    """
    # Create test user and room
    user = await database_sync_to_async(User.objects.create_user)(
        username='testuser',
        password='testpass'
    )
    room = await database_sync_to_async(ChatRoom.objects.create)(
        name='Test Room',
        slug='test-room'
    )
    await database_sync_to_async(room.participants.add)(user)
    
    # Create communicator (simulates a browser connection)
    communicator = WebsocketCommunicator(
        ChatConsumer.as_asgi(),
        f'/ws/chat/{room.slug}/'
    )
    communicator.scope['user'] = user
    
    # Connect
    connected, _ = await communicator.connect()
    assert connected
    
    # Receive history
    response = await communicator.receive_json_from()
    assert response['type'] == 'history'
    
    # Send message
    await communicator.send_json_to({'message': 'Hello!'})
    
    # Receive the broadcast
    response = await communicator.receive_json_from()
    assert response['type'] == 'message'
    assert response['data']['content'] == 'Hello!'
    assert response['data']['sender'] == 'testuser'
    
    # Disconnect
    await communicator.disconnect()

@pytest.mark.django_db
def test_message_model():
    """Test database model."""
    user = User.objects.create_user('test', password='pass')
    room = ChatRoom.objects.create(name='Room', slug='room')
    msg = Message.objects.create(room=room, sender=user, content='Test')
    
    assert str(msg) == 'test: Test'
    assert msg.is_read == False
```

### React Testing with Vitest

```jsx
// frontend/src/components/__tests__/ChatRoom.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatRoom from '../ChatRoom';

// Mock the WebSocket hook
vi.mock('../../hooks/useWebSocket', () => ({
  useWebSocket: vi.fn()
}));

import { useWebSocket } from '../../hooks/useWebSocket';

describe('ChatRoom', () => {
  const mockSendMessage = vi.fn();
  
  beforeEach(() => {
    useWebSocket.mockReturnValue({
      connected: true,
      messages: [
        { id: 1, content: 'Hello!', sender: 'Alice', timestamp: '2026-05-27T10:00:00Z' },
        { id: 2, content: 'Hi there!', sender: 'Bob', timestamp: '2026-05-27T10:01:00Z' },
      ],
      sendMessage: mockSendMessage,
      error: null,
    });
  });

  it('renders chat messages', () => {
    render(<ChatRoom roomSlug="general" />);
    
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('sends message on form submit', async () => {
    const user = userEvent.setup();
    render(<ChatRoom roomSlug="general" />);
    
    const input = screen.getByPlaceholderText('Type a message...');
    await user.type(input, 'New message');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    expect(mockSendMessage).toHaveBeenCalledWith('New message');
  });

  it('shows connection status', () => {
    useWebSocket.mockReturnValue({
      connected: false,
      messages: [],
      sendMessage: vi.fn(),
      error: null,
    });
    
    render(<ChatRoom roomSlug="general" />);
    
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });

  it('disables input when disconnected', () => {
    useWebSocket.mockReturnValue({
      connected: false,
      messages: [],
      sendMessage: vi.fn(),
      error: null,
    });
    
    render(<ChatRoom roomSlug="general" />);
    
    const input = screen.getByPlaceholderText('Connecting...');
    expect(input).toBeDisabled();
  });
});
```

```javascript
// frontend/vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // Simulates browser environment
    globals: true,          // Allows global test functions
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

---

## Part 4: Production Deployment Checklist

### Pre-Deployment Security Checklist

```python
# backend/config/settings/production.py (Security Hardening)

# Force HTTPS
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Cookies
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True

# Prevent clickjacking
X_FRAME_OPTIONS = 'DENY'

# Content Security Policy
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'")  # Adjust as needed
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")

# Rate limiting
REST_FRAMEWORK['DEFAULT_THROTTLE_CLASSES'] = [
    'rest_framework.throttling.AnonRateThrottle',
    'rest_framework.throttling.UserRateThrottle',
]
REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] = {
    'anon': '100/day',
    'user': '1000/day',
}
```

### Environment Variables Template

```bash
# .env.production (NEVER commit this file!)

# Django
SECRET_KEY=your-super-secret-key-here-min-50-chars
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_URL=postgres://user:password@db:5432/dbname

# Redis
REDIS_URL=redis://redis:6379/0

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# OpenAI
OPENAI_API_KEY=sk-...

# Email
SENDGRID_API_KEY=SG.xxx

# AWS S3 (for file storage)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_STORAGE_BUCKET_NAME=your-bucket
```

### Docker Compose Production

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    command: >
      sh -c "python manage.py migrate &&
             python manage.py collectstatic --noinput &&
             gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4 --timeout 60"
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.production
      - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  celery-worker:
    build: ./backend
    command: celery -A config worker -l info -c 4
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.production
      - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
    depends_on:
      - db
      - redis
    restart: unless-stopped

  celery-beat:
    build: ./backend
    command: celery -A config beat -l info
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.production
    depends_on:
      - db
      - redis
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/conf.d/default.conf
      - static_volume:/usr/share/nginx/html/static
      - media_volume:/usr/share/nginx/html/media
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - backend
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

volumes:
  postgres_data:
  redis_data:
  static_volume:
  media_volume:
```

### Monitoring with Sentry

```python
# backend/config/settings/production.py
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.celery import CeleryIntegration

sentry_sdk.init(
    dsn="https://your-sentry-dsn@sentry.io/project-id",
    integrations=[
        DjangoIntegration(),
        CeleryIntegration(),
    ],
    traces_sample_rate=0.1,  # Profile 10% of requests
    send_default_pii=True,
)
```

```jsx
// frontend/src/main.jsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://your-sentry-dsn@sentry.io/project-id',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

---

## 📊 Complete Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React App (Vite Build)                                  │   │
│  │  ├── React Router (Pages)                                │   │
│  │  ├── Context API (Auth, Subscription)                    │   │
│  │  ├── Custom Hooks (WebSocket, API, Forms)                │   │
│  │  ├── Tailwind CSS (Styling)                              │   │
│  │  └── Recharts (Charts)                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy)                    │
│  ├── Static files (React build)                                  │
│  ├── Media files (User uploads)                                  │
│  ├── API requests → Django                                       │
│  └── WebSocket upgrade → Daphne                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Django ASGI   │  │  Django WSGI    │  │   Daphne        │
│   (WebSocket)   │  │  (HTTP API)     │  │  (WebSocket)    │
│                 │  │                 │  │                 │
│  Consumers      │  │  ViewSets       │  │  Protocol       │
│  Channel Layers │  │  Serializers    │  │  Router         │
│  Redis Pub/Sub  │  │  Permissions    │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
            │                 │                 │
            └─────────────────┼─────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICES LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  PostgreSQL │  │    Redis    │  │   Celery    │            │
│  │  (Database) │  │  (Cache/    │  │  (Background│            │
│  │             │  │   Queue)    │  │   Tasks)    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                  │
│  EXTERNAL: Stripe, OpenAI, SendGrid, S3                         │
└─────────────────────────────────────────────────────────────────┘
```

---

