import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createHabit, getHabitById, updateHabit } from '../services/api';

const HabitForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Grabs the ID from the URL if we are editing

  // State to hold the form data
  const [formData, setFormData] = useState({
    habit_name: '',
    category: '',
    frequency: 'Daily', // Default value
    start_date: ''
  });

  // If there is an ID in the URL, fetch that habit's data to pre-fill the form
  useEffect(() => {
    if (id) {
      loadHabitData();
    }
  }, [id]);

  const loadHabitData = async () => {
    try {
      const response = await getHabitById(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching habit details:", error);
    }
  };

  // Handle typing in the input boxes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the Submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    try {
      if (id) {
        // If we have an ID, we are UPDATING an existing habit
        await updateHabit(id, formData);
      } else {
        // If we don't have an ID, we are CREATING a new habit
        await createHabit(formData);
      }
      navigate('/'); // Send the user back to the Dashboard after saving
    } catch (error) {
      console.error("Error saving habit:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h2>{id ? 'Edit Habit' : 'Add New Habit'}</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Habit Name (Required, Min 3 characters) */}
        <div>
          <label><strong>Habit Name:</strong></label><br />
          <input 
            type="text" 
            name="habit_name" 
            value={formData.habit_name} 
            onChange={handleChange} 
            required 
            minLength="3"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Category (Required) */}
        <div>
          <label><strong>Category:</strong></label><br />
          <input 
            type="text" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Frequency (Required Dropdown) */}
        <div>
          <label><strong>Frequency:</strong></label><br />
          <select 
            name="frequency" 
            value={formData.frequency} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {/* Start Date (Required) */}
        <div>
          <label><strong>Start Date:</strong></label><br />
          <input 
            type="date" 
            name="start_date" 
            value={formData.start_date} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            {id ? 'Update Habit' : 'Save Habit'}
          </button>
          <Link to="/">
            <button type="button" style={{ padding: '10px 20px', cursor: 'pointer' }}>Cancel</button>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default HabitForm;