from flask import Flask, request

from r12n import r12n
from r12n2 import r12n2

app = Flask(__name__)


@app.route('/')
def main():
    no = request.args.get('no', 1, int)
    count = request.args.get('count', 10, int)
    refresh = request.args.get('refresh', 0, int)
    if not refresh:
        return r12n(no, count)
    return r12n2(no, count, refresh)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
