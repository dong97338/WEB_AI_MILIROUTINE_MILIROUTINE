import pymysql
import a5t  # sql 아이디 비밀번호(코드스페이스에만, 커밋x)

class ex:
    def __init__(self):
        self.con=pymysql.connect(
            host="52.79.92.84",
            user=a5t.user,
            password=a5t.password,
            port=53609,
            database="miliroutine_db",
            use_unicode=True,
            charset='utf8')
        self.cur=self.con.cursor()
    def __enter__(self):
        return self
    def q(self,q):
        self.cur.execute(q)
        return self.cur.fetchall()
    def __exit__(self,*args):
        self.con.close()