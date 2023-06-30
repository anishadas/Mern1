server:
1. npm init -y : install package.json
2. npm install body-parser cors express mongoose nodemon
3. npm i dotenv
4. npm i google-auth-library jsonwebtoken
5. What Is Body-parser?
6. npm install bcryptjs

- Express body-parser is an npm module used to process data sent in an HTTP request body. It provides four express middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body. Before the target controller receives an incoming request, these middleware routines handle it.

client
1. npm install axios moment react-file-base64 redux react-redux redux-thunk
2. npm install @mui/material @emotion/react @emotion/styled
3. npm i react-google-login
4.  npm install jwt-decode


## Base64
- Base64 also known as Base64 Content-Transfer-Encoding is an encoding and decoding technique used to convert binary data to an American Standard for Information Interchange (ASCII) text format, and vice versa.
- Any binary data (such as an image in this case) can be encoded by base64 and the encoded data is usually composed of 64 English characters which isn't human-readable. When an image is stored using base64 to a database such as MongoDB, the image is stored as a string in the database. This string can then be decoded back to its original form when needed.

forms --> adding data to state : postData -->handleSubmit(): dispatch(createPost(postData))--> createPost() in action : api.createPost(post) --> call api: axios.post(url):url=localhost:5000/posts -->router route to controllers:posts --> create new schema(mongodb): save the data -->send json response to client --> dispatch(data) --> reducer : return updated state --> store -->all compoents recieve updates


https://www.svgbackgrounds.com/#liquid-cheese


client id:
959818041316-5ovvcs1klpkcm8uiq895jk3uvmorblpn.apps.googleusercontent.com

client secret:
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


<!-- authentication middleware -->
<!-- once the user is logged in, he/she can create/update/delete their post.  But we have to tell teh backened to allow him to do that: we will need a middleware to do that -->