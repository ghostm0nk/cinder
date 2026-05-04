-- Create the teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view teams" ON teams FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can create teams" ON teams FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update teams" ON teams FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete teams" ON teams FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create the profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    username TEXT,
    team_id UUID REFERENCES teams(id) DEFAULT NULL, -- Link to teams table, optional initially
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create the customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    status TEXT,
    notes TEXT,
    team_id UUID REFERENCES teams(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view customers" ON customers FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert customers" ON customers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update customers" ON customers FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete customers" ON customers FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_name TEXT NOT NULL,
    company TEXT,
    status TEXT,
    source TEXT,
    team_id UUID REFERENCES teams(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view leads" ON leads FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert leads" ON leads FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update leads" ON leads FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete leads" ON leads FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    due_date DATE,
    status TEXT,
    assigned_to UUID REFERENCES profiles(id),
    team_id UUID REFERENCES teams(id),
    related_to_customer_id UUID REFERENCES customers(id), -- Nullable for tasks not related to a specific customer
    related_to_lead_id UUID REFERENCES leads(id),         -- Nullable for tasks not related to a specific lead
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view tasks" ON tasks FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update tasks" ON tasks FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete tasks" ON tasks FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create the activities table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    description TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    team_id UUID REFERENCES teams(id),
    related_to_customer_id UUID REFERENCES customers(id), -- Nullable
    related_to_lead_id UUID REFERENCES leads(id)          -- Nullable
);
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view activities" ON activities FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert activities" ON activities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update activities" ON activities FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete activities" ON activities FOR DELETE USING (auth.uid() IS NOT NULL);