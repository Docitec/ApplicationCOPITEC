# backend/utils/hash_password.py

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage : python hash_password.py monMotDePasse")
        sys.exit(1)

    password = sys.argv[1]
    hashed = hash_password(password)
    print(f"🔐 Hash bcrypt pour '{password}' :\n{hashed}")
