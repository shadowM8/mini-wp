
<h1> Mini WP </h1>
<br>

**LIST OF USER ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/users/googleverify|POST|none|id_token: String **(REQUIRED)**|Create user and generate jwt (login)|
|/users/register|POST|none|email:String **(REQUIRED)**, password:String **(REQUIRED)**|Create user |
|/users/login|POST|token|none|Login and generate token |

<br>
<br>

**LIST OF ARTICLES ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/articles|GET|token|- |Get all articles|
|/articles/:id|GET|token|- |Get one article|
|/articles|POST|token|title: String **(REQUIRED)**, content: String **(REQUIRED)**, image : String, createdAt : Date | Create new article|
|/articles/:id|PUT|token|title: String **(REQUIRED)**, content: String **(REQUIRED)**, image : String |Edit Article (authorized user)|
|/articles/:id|DELETE|token| |Delete article (authorized user)|

<br>



**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```