from dotenv import load_dotenv
import os
from pydantic import PostgresDsn

load_dotenv()

DATABASE_URL: PostgresDsn = os.getenv("DATABASE_URL")  # type: ignore
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not set in the .env file")

