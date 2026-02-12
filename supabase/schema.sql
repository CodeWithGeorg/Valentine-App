-- Valentine App Database Schema for Supabase
-- Run this SQL in your Supabase project's SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    theme TEXT NOT NULL DEFAULT 'romantic-red',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_page_id ON messages(page_id);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
-- Allow anyone to read pages (public view)
CREATE POLICY "Allow public read access to pages" ON pages
    FOR SELECT
    USING (true);

-- Allow anyone to insert pages (create page)
CREATE POLICY "Allow anyone to create pages" ON pages
    FOR INSERT
    WITH CHECK (true);

-- Create policies for messages
-- Allow anyone to read messages (for inbox view)
CREATE POLICY "Allow public read access to messages" ON messages
    FOR SELECT
    USING (true);

-- Allow anyone to insert messages (send anonymous message)
CREATE POLICY "Allow anyone to send messages" ON messages
    FOR INSERT
    WITH CHECK (true);

-- Allow page owner to delete their messages
CREATE POLICY "Allow owners to delete messages" ON messages
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM pages
            WHERE pages.id = messages.page_id
        )
    );

-- Create a function to get messages for a specific page
CREATE OR REPLACE FUNCTION get_page_messages(page_uuid UUID)
RETURNS TABLE (
    id UUID,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT messages.id, messages.content, messages.created_at
    FROM messages
    WHERE messages.page_id = page_uuid
    ORDER BY messages.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to count messages for a page
CREATE OR REPLACE FUNCTION count_page_messages(page_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM messages
        WHERE messages.page_id = page_uuid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

