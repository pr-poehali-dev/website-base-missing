'''
Business: Get all registrations and messages from database
Args: event - dict with httpMethod, queryStringParameters
      context - object with request_id attribute
Returns: HTTP response with list of submissions
'''

import json
import os
from typing import Dict, Any, List
import psycopg2


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, name, email, institution, created_at 
        FROM registrations 
        ORDER BY created_at DESC
    """)
    registrations = cur.fetchall()
    
    cur.execute("""
        SELECT id, name, email, message, created_at 
        FROM messages 
        ORDER BY created_at DESC
    """)
    messages = cur.fetchall()
    
    cur.close()
    conn.close()
    
    registrations_list: List[Dict[str, Any]] = []
    for row in registrations:
        registrations_list.append({
            'id': row[0],
            'name': row[1],
            'email': row[2],
            'institution': row[3],
            'created_at': row[4].isoformat() if row[4] else None
        })
    
    messages_list: List[Dict[str, Any]] = []
    for row in messages:
        messages_list.append({
            'id': row[0],
            'name': row[1],
            'email': row[2],
            'message': row[3],
            'created_at': row[4].isoformat() if row[4] else None
        })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'registrations': registrations_list,
            'messages': messages_list
        })
    }
