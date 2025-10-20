'''
Business: Track unique website visitors and return total visitor count
Args: event - dict with httpMethod, body (visitor_id for POST)
      context - object with request_id, function_name attributes
Returns: HTTP response with visitor count or tracking confirmation
'''

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cursor.execute(
                "SELECT COUNT(DISTINCT visitor_id) as total FROM t_p84833296_metal_price_site.visitors"
            )
            result = cursor.fetchone()
            total_visitors = result['total'] if result else 0
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'total': total_visitors}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            visitor_id = body_data.get('visitor_id')
            
            if not visitor_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'visitor_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                """
                INSERT INTO t_p84833296_metal_price_site.visitors (visitor_id, first_visit, last_visit, visit_count)
                VALUES (%s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
                ON CONFLICT (visitor_id) 
                DO UPDATE SET 
                    last_visit = CURRENT_TIMESTAMP,
                    visit_count = t_p84833296_metal_price_site.visitors.visit_count + 1
                RETURNING visit_count
                """,
                (visitor_id,)
            )
            result = cursor.fetchone()
            conn.commit()
            
            visit_count = result['visit_count'] if result else 1
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'visit_count': visit_count
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    finally:
        cursor.close()
        conn.close()
