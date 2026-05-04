-- profiles table for user metadata
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policy for users to create their own profile (via a trigger or function)
-- This policy allows inserts for authenticated users if the id matches auth.uid()
CREATE POLICY "Users can create own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- users table for task assignment purposes (distinct from auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view all assignable users
CREATE POLICY "Authenticated users can view users" ON users FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for authenticated users to create users (e.g., team members)
CREATE POLICY "Authenticated users can create users" ON users FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update users
CREATE POLICY "Authenticated users can update users" ON users FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy for authenticated users to delete users
CREATE POLICY "Authenticated users can delete users" ON users FOR DELETE USING (auth.role() = 'authenticated');

-- tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL, -- The user who created the task
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Open', -- e.g., 'Open', 'In Progress', 'Completed'
    due_date DATE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL, -- The user assigned to the task
    priority TEXT NOT NULL DEFAULT 'Medium', -- e.g., 'Low', 'Medium', 'High'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own tasks
CREATE POLICY "Users can view own tasks" ON tasks FOR SELECT USING (auth.uid() = user_id OR auth.uid() = assigned_to);

-- Policy for users to create tasks
CREATE POLICY "Users can create tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own tasks (and tasks assigned to them)
CREATE POLICY "Users can update own tasks" ON tasks FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = assigned_to);

-- Policy for users to delete their own tasks
CREATE POLICY "Users can delete own tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);

-- Function to set updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on task changes
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Optional: Create a trigger to automatically create a profile for new auth.users
-- This is often handled in a Supabase Edge Function or a database hook
-- For simplicity, we'll assume the client-side handles profile creation after signup.