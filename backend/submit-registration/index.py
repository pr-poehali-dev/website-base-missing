'''
Business: Process registration form submissions and send email notifications
Args: event - dict with httpMethod, body (JSON with name, email, institution)
      context - object with request_id, function_name attributes
Returns: HTTP response dict with success/error status
'''

import json
import os
from typing import Dict, Any
import psycopg2
from pydantic import BaseModel, EmailStr, Field


class RegistrationRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    institution: str = Field(default='', max_length=255)


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    reg_data = RegistrationRequest(**body_data)
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO registrations (name, email, institution) VALUES (%s, %s, %s) RETURNING id",
        (reg_data.name, reg_data.email, reg_data.institution)
    )
    registration_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'message': 'Регистрация успешна',
            'id': registration_id
        })
    }