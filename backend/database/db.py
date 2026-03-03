import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()

Supabase_url = os.getenv("SUPABASE_URL")    
Supabase_key = os.getenv("SUPABASE_KEY")

supabase = create_client(Supabase_url, Supabase_key)
