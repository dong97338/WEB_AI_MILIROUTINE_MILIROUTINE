FROM python:3.8

WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY requirements.txt .

RUN python3.8 -m pip install -r requirements.txt

CMD ["python", "server.py"]