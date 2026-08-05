import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store loaded from mockData.json
let db = {};

async function loadData() {
  try {
    const dataPath = path.join(__dirname, 'data', 'mockData.json');
    const content = await fs.readFile(dataPath, 'utf-8');
    db = JSON.parse(content);
    console.log('Loaded mock database successfully.');
  } catch (error) {
    console.error('Failed to load mock database:', error);
    // Fallback default
    db = { user: {}, courses: [], practice: [], leaderboard: [], notifications: [] };
  }
}

// Initialize database
await loadData();

// API Routes
app.get('/api/user', (req, res) => {
  res.json(db.user);
});

app.get('/api/courses', (req, res) => {
  res.json(db.courses);
});

app.post('/api/courses/enroll', (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: 'courseId is required' });
  }

  let found = false;
  db.courses = db.courses.map(c => {
    if (c.id === courseId) {
      found = true;
      return { ...c, status: 'In Progress', progress: Math.max(c.progress || 0, 5) };
    }
    return c;
  });

  if (!found) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json({ message: 'Enrolled successfully', courseId });
});

app.get('/api/practice', (req, res) => {
  res.json(db.practice);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(db.leaderboard);
});

app.get('/api/notifications', (req, res) => {
  res.json(db.notifications);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
