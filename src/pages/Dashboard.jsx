import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHabits, deleteHabit, updateHabit } from '../services/api';

const Dashboard = () => {
  // This state holds the list of habits we fetch from the backend
  const [habits, setHabits] = useState([]);

  // State to hold the user's search query
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect runs automatically exactly once when the page first loads
  useEffect(() => {
    loadHabits();
  }, []);

  // Function to fetch data from your Express server
  const loadHabits = async () => {
    try {
      const response = await getHabits();
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };
  
  // 1. Filter safely (the '?.' prevents a crash if a habit name is accidentally blank)
  const filteredHabits = habits.filter((habit) => 
    habit.habit_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Calculate Statistics dynamically based on the FILTERED array, not the original
  const totalHabits = filteredHabits.length;
  const completedHabits = filteredHabits.filter(habit => habit.status === 'Completed').length;
  const pendingHabits = totalHabits - completedHabits;

  // Function to handle the delete button
  const handleDelete = async (id) => {
    // This perfectly satisfies your requirement: "Are you sure you want to delete?"
    if (window.confirm("Are you sure you want to delete this habit?")) {
      await deleteHabit(id);
      loadHabits(); // Reload the table automatically after deleting
    }
  };

  // Function to toggle between Pending and Completed
  const handleToggleStatus = async (habit) => {
    const newStatus = habit.status === 'Pending' ? 'Completed' : 'Pending';
    await updateHabit(habit.id, { status: newStatus });
    loadHabits(); // Reload the table automatically after updating
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Habit Statistics</h2>


      {/* Statistics Dashboard */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: '#7499be', border: '1px solid #410101', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          <h3>Total Habits</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{totalHabits}</p>
        </div>
        <div style={{ padding: '15px', backgroundColor: '#237734', border: '1px solid #024702', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          <h3>Completed</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{completedHabits}</p>
        </div>
        <div style={{ padding: '15px', backgroundColor: '#7a5e03', border: '1px solid #453502', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          <h3>Pending</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{pendingHabits}</p>
        </div>
      </div>

      {/* Action Bar: Add Button & Search Box */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Link to="/add">
          <button style={{ padding: '10px', cursor: 'pointer' }}>
            + Add New Habit
          </button>
        </Link>

        {/* The Search Input Box */}
        <input 
          type="text" 
          placeholder="🔍 Search habits..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>


      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#937474' }}>
          <tr>
            <th>ID</th>
            <th>Habit Name</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHabits.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No habits found matching your search.</td>
            </tr>
          ) : (
            filteredHabits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.id}</td>
                <td><strong>{habit.habit_name}</strong></td>
                <td>{habit.category}</td>
                <td>{habit.frequency}</td>
                <td>
                  <button 
                    onClick={() => handleToggleStatus(habit)}
                    style={{
                      backgroundColor: habit.status === 'Completed' ? '#d4edda' : '#fff3cd',
                      border: '1px solid #ccc',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {habit.status}
                  </button>
                </td>
                <td>
                  <Link to={`/edit/${habit.id}`}>
                    <button style={{ marginRight: '10px' }}>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(habit.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;