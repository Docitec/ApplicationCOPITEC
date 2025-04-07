from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import BytesIO

router = APIRouter()

@router.post("/import-tasks/")
async def import_tasks(file: UploadFile = File(...)):
    if not file.filename or not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Le fichier doit être au format .xlsx")

    try:
        contents = await file.read()
        excel_data = pd.read_excel(BytesIO(contents), engine="openpyxl")
        return {"columns": list(excel_data.columns), "rows": excel_data.to_dict(orient="records")[:5]}  # aperçu
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la lecture du fichier : {str(e)}")
