"use client";

import { useEffect, useState } from "react";

const BACKEND = process.env.NEXT_PUBLIC_API_URL;

type Student = {
  id: number;
  name: string;
  age: number;
  roll_no: number;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ name: "", age: "", roll_no: "" });

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${BACKEND}/students`);
      const data = await res.json();
      setStudents(data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async () => {
    try {
      await fetch(`${BACKEND}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          age: parseInt(form.age),
          roll_no: parseInt(form.roll_no),
        }),
      });
      setForm({ name: "", age: "", roll_no: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Management System</h1>
        
        {/* Add Student Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Roll Number"
              type="number"
              value={form.roll_no}
              onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            onClick={addStudent}
            disabled={!form.name || !form.age || !form.roll_no}
          >
            Add Student
          </button>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Students List</h2>
          {students.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No students found. Add some students to get started!</p>
          ) : (
            <div className="grid gap-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                      <p className="text-gray-600">Age: {student.age} • Roll No: {student.roll_no}</p>
                    </div>
                    <div className="text-sm text-gray-500">ID: {student.id}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
