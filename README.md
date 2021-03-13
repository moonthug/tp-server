# 🧾tp-server

A Thermal Printer server and MQTT client providing a markup-like api interface around the `escpos' library.

An example HTTP request would look like...

```http request
POST /job HTTP/1.1
Host: 192.168.1.23:3000
Content-Type: text/plain

font "a"
size "2" "2"
align "ct"
style "bu"
text "Hi!"
size "0" "0"
text "A little test print for you!"
text "Have a barcode"
barcode "1234567" "EAN8"
cut
```

More commands can be found at the [escpos repo](https://www.npmjs.com/package/escpos).

## 🏃‍♀️ Run the server

To start the server, you can install globally, or use `npx`

```shell
npm install -g @h0me/tp-server
tp-server examples/config.js
```


```shell
npx @h0me/tp-server examples/config.js
```

## 🖨️ Print!

### HTTP

```shell
curl --location --request POST 'http://192.168.1.23:3000/job' \
--header 'Content-Type: text/plain' \
--data-raw 'font "a"
size "2" "2"
text "Hi!"
cut'
```

### MQTT

```shell
mqtt pub -t "h0me/tp-server" -m 'font "a"
size "2" "2"
text "Hi!"
cut'
```
