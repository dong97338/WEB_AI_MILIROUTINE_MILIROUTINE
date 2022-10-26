from flask import Flask

from r12n import r12n

app = Flask(__name__)


@app.route('/')
def main():
    return str(r12n(11, 10))  # 이 부분을 수정해주시면 됩니다


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
