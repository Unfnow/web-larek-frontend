module.exports = {
    "info": {
      "_postman_id": "7d7a7e6f-ec66-4687-adca-21a50f27c19a",
      "name": "WebLarek",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      "_exporter_id": "11716985"
    },
    "item": [
      {
        "name": "Product List",
        "request": {
          "method": "GET",
          "header": [],
          "url": {
            "raw": "{{baseUrl}}/product/",
            "host": [
              "{{baseUrl}}"
            ],
            "path": [
              "product",
              ""
            ]
          }
        },
        "response": [
          {
            "name": "Success",
            "originalRequest": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "{{baseUrl}}/product/",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "product",
                  ""
                ]
              }
            },
            "status": "OK",
            "code": 200,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "2723"
              },
              {
                "key": "ETag",
                "value": "W/\"aa3-y+wJfqV/fdEJPP9Np/+WEJUYAdk\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 19:45:22 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"total\": 10,\n    \"items\": [\n        {\n            \"id\": \"854cef69-976d-4c2a-a18c-2aa45046c390\",\n            \"description\": \"Если планируете решать задачи в тренажёре, берите два.\",\n            \"image\": \"/5_Dots.svg\",\n            \"title\": \"+1 час в сутках\",\n            \"category\": \"софт-скил\",\n            \"price\": 750\n        },\n        {\n            \"id\": \"c101ab44-ed99-4a54-990d-47aa2bb4e7d9\",\n            \"description\": \"Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.\",\n            \"image\": \"/Shell.svg\",\n            \"title\": \"HEX-леденец\",\n            \"category\": \"другое\",\n            \"price\": 1450\n        },\n        {\n            \"id\": \"b06cde61-912f-4663-9751-09956c0eed67\",\n            \"description\": \"Будет стоять над душой и не давать прокрастинировать.\",\n            \"image\": \"/Asterisk_2.svg\",\n            \"title\": \"Мамка-таймер\",\n            \"category\": \"софт-скил\",\n            \"price\": null\n        },\n        {\n            \"id\": \"412bcf81-7e75-4e70-bdb9-d3c73c9803b7\",\n            \"description\": \"Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.\",\n            \"image\": \"/Soft_Flower.svg\",\n            \"title\": \"Фреймворк куки судьбы\",\n            \"category\": \"дополнительное\",\n            \"price\": 2500\n        },\n        {\n            \"id\": \"1c521d84-c48d-48fa-8cfb-9d911fa515fd\",\n            \"description\": \"Если орёт кот, нажмите кнопку.\",\n            \"image\": \"/mute-cat.svg\",\n            \"title\": \"Кнопка «Замьютить кота»\",\n            \"category\": \"кнопка\",\n            \"price\": 2000\n        },\n        {\n            \"id\": \"f3867296-45c7-4603-bd34-29cea3a061d5\",\n            \"description\": \"Чтобы научиться правильно называть модификаторы, без этого не обойтись.\",\n            \"image\": \"Pill.svg\",\n            \"title\": \"БЭМ-пилюлька\",\n            \"category\": \"другое\",\n            \"price\": 1500\n        },\n        {\n            \"id\": \"54df7dcb-1213-4b3c-ab61-92ed5f845535\",\n            \"description\": \"Измените локацию для поиска работы.\",\n            \"image\": \"/Polygon.svg\",\n            \"title\": \"Портативный телепорт\",\n            \"category\": \"другое\",\n            \"price\": 100000\n        },\n        {\n            \"id\": \"6a834fb8-350a-440c-ab55-d0e9b959b6e3\",\n            \"description\": \"Даст время для изучения React, ООП и бэкенда\",\n            \"image\": \"/Butterfly.svg\",\n            \"title\": \"Микровселенная в кармане\",\n            \"category\": \"другое\",\n            \"price\": 750\n        },\n        {\n            \"id\": \"48e86fc0-ca99-4e13-b164-b98d65928b53\",\n            \"description\": \"Очень полезный навык для фронтендера. Без шуток.\",\n            \"image\": \"Leaf.svg\",\n            \"title\": \"UI/UX-карандаш\",\n            \"category\": \"хард-скил\",\n            \"price\": 10000\n        },\n        {\n            \"id\": \"90973ae5-285c-4b6f-a6d0-65d1d760b102\",\n            \"description\": \"Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.\",\n            \"image\": \"/Mithosis.svg\",\n            \"title\": \"Бэкенд-антистресс\",\n            \"category\": \"другое\",\n            \"price\": 1000\n        }\n    ]\n}"
          }
        ]
      },
      {
        "name": "Product Item",
        "request": {
          "method": "GET",
          "header": [],
          "url": {
            "raw": "{{baseUrl}}/product/854cef69-976d-4c2a-a18c-2aa45046c390",
            "host": [
              "{{baseUrl}}"
            ],
            "path": [
              "product",
              "854cef69-976d-4c2a-a18c-2aa45046c390"
            ]
          }
        },
        "response": [
          {
            "name": "Success",
            "originalRequest": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "{{baseUrl}}/product/854cef69-976d-4c2a-a18c-2aa45046c390",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "product",
                  "854cef69-976d-4c2a-a18c-2aa45046c390"
                ]
              }
            },
            "status": "OK",
            "code": 200,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "262"
              },
              {
                "key": "ETag",
                "value": "W/\"106-tQhoH+yYIBbNE2UOGvU1poblMkY\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 19:45:58 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"id\": \"854cef69-976d-4c2a-a18c-2aa45046c390\",\n    \"description\": \"Если планируете решать задачи в тренажёре, берите два.\",\n    \"image\": \"/5_Dots.svg\",\n    \"title\": \"+1 час в сутках\",\n    \"category\": \"софт-скил\",\n    \"price\": 750\n}"
          },
          {
            "name": "Not Found",
            "originalRequest": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "{{baseUrl}}/product/854cef69-976d-4c2a",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "product",
                  "854cef69-976d-4c2a"
                ]
              }
            },
            "status": "Not Found",
            "code": 404,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "20"
              },
              {
                "key": "ETag",
                "value": "W/\"14-s+qz4i6AO6tDYm6PsMCkX6W2fzY\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 19:46:49 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"error\": \"NotFound\"\n}"
          }
        ]
      },
      {
        "name": "Order",
        "request": {
          "method": "POST",
          "header": [],
          "body": {
            "mode": "raw",
            "raw": "{\r\n    \"payment\": \"online\",\r\n    \"email\": \"test@test.ru\",\r\n    \"phone\": \"+71234567890\",\r\n    \"address\": \"Spb Vosstania 1\",\r\n    \"total\": 2200,\r\n    \"items\": [\r\n        \"854cef69-976d-4c2a-a18c-2aa45046c390\",\r\n        \"c101ab44-ed99-4a54-990d-47aa2bb4e7d9\"\r\n    ]\r\n}",
            "options": {
              "raw": {
                "language": "json"
              }
            }
          },
          "url": {
            "raw": "{{baseUrl}}/order",
            "host": [
              "{{baseUrl}}"
            ],
            "path": [
              "order"
            ]
          }
        },
        "response": [
          {
            "name": "Success",
            "originalRequest": {
              "method": "POST",
              "header": [],
              "body": {
                "mode": "raw",
                "raw": "{\r\n    \"payment\": \"online\",\r\n    \"email\": \"test@test.ru\",\r\n    \"phone\": \"+71234567890\",\r\n    \"address\": \"Spb Vosstania 1\",\r\n    \"total\": 2200,\r\n    \"items\": [\r\n        \"854cef69-976d-4c2a-a18c-2aa45046c390\",\r\n        \"c101ab44-ed99-4a54-990d-47aa2bb4e7d9\"\r\n    ]\r\n}",
                "options": {
                  "raw": {
                    "language": "json"
                  }
                }
              },
              "url": {
                "raw": "{{baseUrl}}/order",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "order"
                ]
              }
            },
            "status": "OK",
            "code": 200,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "58"
              },
              {
                "key": "ETag",
                "value": "W/\"3a-ukGUv0ohkG5SLpzugvC0khe3KJQ\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 20:04:16 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"id\": \"28c57cb4-3002-4445-8aa1-2a06a5055ae5\",\n    \"total\": 2200\n}"
          },
          {
            "name": "Product not found",
            "originalRequest": {
              "method": "POST",
              "header": [],
              "body": {
                "mode": "raw",
                "raw": "{\r\n    \"payment\": \"online\",\r\n    \"email\": \"test@test.ru\",\r\n    \"phone\": \"+71234567890\",\r\n    \"address\": \"Spb Vosstania 1\",\r\n    \"total\": 2200,\r\n    \"items\": [\r\n        \"854cef69-976d-4c2a-a18c-2aa45046c390\",\r\n        \"c101ab44-ed99-4a54-990d-47aa2bb4e7d\"\r\n    ]\r\n}",
                "options": {
                  "raw": {
                    "language": "json"
                  }
                }
              },
              "url": {
                "raw": "{{baseUrl}}/order",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "order"
                ]
              }
            },
            "status": "Bad Request",
            "code": 400,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "82"
              },
              {
                "key": "ETag",
                "value": "W/\"52-JUt2bfLJfICMao2+gjMqyE5JOxw\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 20:05:10 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"error\": \"Товар с id c101ab44-ed99-4a54-990d-47aa2bb4e7d не найден\"\n}"
          },
          {
            "name": "Wrong total",
            "originalRequest": {
              "method": "POST",
              "header": [],
              "body": {
                "mode": "raw",
                "raw": "{\r\n    \"payment\": \"online\",\r\n    \"email\": \"test@test.ru\",\r\n    \"phone\": \"+71234567890\",\r\n    \"address\": \"Spb Vosstania 1\",\r\n    \"total\": 1200,\r\n    \"items\": [\r\n        \"854cef69-976d-4c2a-a18c-2aa45046c390\",\r\n        \"c101ab44-ed99-4a54-990d-47aa2bb4e7d9\"\r\n    ]\r\n}",
                "options": {
                  "raw": {
                    "language": "json"
                  }
                }
              },
              "url": {
                "raw": "{{baseUrl}}/order",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "order"
                ]
              }
            },
            "status": "Bad Request",
            "code": 400,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "52"
              },
              {
                "key": "ETag",
                "value": "W/\"34-mpjWGKPsYwI2hesfbH5QeqXknWE\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 20:05:36 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"error\": \"Неверная сумма заказа\"\n}"
          },
          {
            "name": "No address",
            "originalRequest": {
              "method": "POST",
              "header": [],
              "body": {
                "mode": "raw",
                "raw": "{\r\n    \"payment\": \"online\",\r\n    \"email\": \"test@test.ru\",\r\n    \"phone\": \"+71234567890\",\r\n    \"total\": 2200,\r\n    \"items\": [\r\n        \"854cef69-976d-4c2a-a18c-2aa45046c390\",\r\n        \"c101ab44-ed99-4a54-990d-47aa2bb4e7d9\"\r\n    ]\r\n}",
                "options": {
                  "raw": {
                    "language": "json"
                  }
                }
              },
              "url": {
                "raw": "{{baseUrl}}/order",
                "host": [
                  "{{baseUrl}}"
                ],
                "path": [
                  "order"
                ]
              }
            },
            "status": "Bad Request",
            "code": 400,
            "_postman_previewlanguage": "json",
            "header": [
              {
                "key": "X-Powered-By",
                "value": "Express"
              },
              {
                "key": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "key": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "key": "Content-Length",
                "value": "40"
              },
              {
                "key": "ETag",
                "value": "W/\"28-ZSb1dC6GSyDT0zlpvtUDOGWyTOw\""
              },
              {
                "key": "Date",
                "value": "Thu, 11 Jan 2024 20:05:53 GMT"
              },
              {
                "key": "Connection",
                "value": "keep-alive"
              },
              {
                "key": "Keep-Alive",
                "value": "timeout=5"
              }
            ],
            "cookie": [],
            "body": "{\n    \"error\": \"Не указан адрес\"\n}"
          }
        ]
      }
    ],
    "event": [
      {
        "listen": "prerequest",
        "script": {
          "type": "text/javascript",
          "exec": [
            ""
          ]
        }
      },
      {
        "listen": "test",
        "script": {
          "type": "text/javascript",
          "exec": [
            ""
          ]
        }
      }
    ],
    "variable": [
      {
        "key": "baseUrl",
        "value": "http://localhost:3000/api/weblarek",
        "type": "string"
      }
    ],
  plugins: [["autoprefixer"]],
};
