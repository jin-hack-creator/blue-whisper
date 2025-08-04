-- 1. Create profiles table
-- This table will store public user data.
CREATE TABLE profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create a trigger to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Set up Row Level Security (RLS) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON profiles FOR UPDATE USING (auth.uid() = id);


-- 4. Create chat tables
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT -- For group chats
);

CREATE TABLE participants (
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    content TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE
);

-- 5. Set up RLS for chat tables
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view conversations they are part of."
ON conversations FOR SELECT USING (id IN (
    SELECT conversation_id FROM participants WHERE user_id = auth.uid()
));
CREATE POLICY "Users can create conversations."
ON conversations FOR INSERT WITH CHECK (true);


ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view participants of conversations they are in."
ON participants FOR SELECT USING (conversation_id IN (
    SELECT conversation_id FROM participants WHERE user_id = auth.uid()
));
CREATE POLICY "Users can join or leave conversations."
ON participants FOR ALL USING (user_id = auth.uid());


ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages in their conversations."
ON messages FOR SELECT USING (conversation_id IN (
    SELECT conversation_id FROM participants WHERE user_id = auth.uid()
));
CREATE POLICY "Users can send messages in their conversations."
ON messages FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    conversation_id IN (
        SELECT conversation_id FROM participants WHERE user_id = auth.uid()
    )
);

-- 6. Enable Realtime on tables
-- After running this SQL, you must go to Database -> Replication in your Supabase dashboard
-- and enable realtime for the 'profiles', 'conversations', and 'messages' tables.
