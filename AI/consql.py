import pymysql
import a5t  # sql 아이디 비밀번호(코드스페이스에만, 커밋x)

host="database"
user="miliroutine_developer"
password="2022MySQL!@"
port=3306
database="miliroutine_db"
use_unicode=True
charset='utf8'

def ex(q):
    con=pymysql.connect(host=host, user=a5t.user, passwd=a5t.password, db=database, port=port, use_unicode=True, charset='utf8')
    cur=con.cursor()
    cur.execute(q)
    ret=cur.fetchall()
    con.close()
    return ret
