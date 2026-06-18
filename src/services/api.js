import axios from 'axios';

// Create a base connection to your Express backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api/habits',
});

// 1. Fetch all habits (Translates to GET /api/habits)
export const getHabits = () => API.get('/');

// 2. Create a new habit (Translates to POST /api/habits)
export const createHabit = (newHabit) => API.post('/', newHabit);

// 3. Update a habit / Mark as complete (Translates to PUT /api/habits/:id)
export const updateHabit = (id, updatedData) => API.put(`/${id}`, updatedData);

// 4. Delete a habit (Translates to DELETE /api/habits/:id)
export const deleteHabit = (id) => API.delete(`/${id}`);

// 5. Fetch a single habit by its ID (Translates to GET /api/habits/:id)
export const getHabitById = (id) => API.get(`/${id}`);

export default API;