/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

// Load the SDK and UUID

var AWS = require('aws-sdk');
var uuid = require('node-uuid');

AWS.config.region = 'us-east-1'; // Region

//it will provide us Credentials to access AWS Resource for this user
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:066e2332-017e-47bc-a774-d079bc2ee215",
    Logins:{
      //Add User IDToken here
      //cognito poolId: ID-Token
      "cognito-idp.us-east-1.amazonaws.com/us-east-1_toJRxZ9kJ": "eyJraWQiOiJHdUxVQlBOb0RcL1VKTUdzS1ByS3BJS05neGZNaEUyekdrVjRSTkxWSlVLcz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiVzROSUVUN1VPU09MWFB4QTJwcVpLUSIsInN1YiI6IjQ2MTdkZDAwLTA3YzctNGQ0Zi04Njg4LWY4ODFlYmRjMDNkMyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJiaXJ0aGRhdGUiOiIwMVwvMDdcLzE5OTEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90b0pSeFo5a0oiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJjb2duaXRvOnVzZXJuYW1lIjoiNDYxN2RkMDAtMDdjNy00ZDRmLTg2ODgtZjg4MWViZGMwM2QzIiwiZ2l2ZW5fbmFtZSI6InJhanUgY2hhY2hhIiwiYXVkIjoiMTBnZDF0bHFoZmZwNzhsbDVjamZ1ZnRiNTYiLCJldmVudF9pZCI6IjExNzk5YjQ1LTYyYzMtNDhjYS1iMjk5LTBmZWRmYjMzODZkOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4MzYyNTc2LCJwaG9uZV9udW1iZXIiOiIrOTE4OTc2NDUzNDIzIiwiZXhwIjoxNTk4MzY2MTc2LCJpYXQiOjE1OTgzNjI1NzYsImZhbWlseV9uYW1lIjoicmFqdSIsImVtYWlsIjoiaGFydmluZGVyLnNpbmdoQGdsb2JhbG1hbnRyYWkuY29tIn0.v0CRo2INWqZWToxQgzi6vq9Tnx_k5jLihcFT_FhkZDUpBSfa_ZOoLQ-X17fzQ2l1roIVe8arYl4-a3LKFqTDhG4HxBGB9VdTVKXv98BtBYZ6Fqyk3t2XJcgxHP30U93J-OWcKu0mJG4ToYPA13aEVzo87tnuI8Zna3hB_CAi0Q14K8x59Xwa-bXq3ZbvW5Tai_XaUVzBWtUi0x3g6ry8JLKRomQlobfDpF8ZSONZSmu7hMGCv5QkcJ83nN6JJRYwdBm_DsfA71OJgx41yXSxtwLlOqhG4lKaCSvR4GXjWurWmpEa0CDXDwoDLCL8JGlPw0kYtpYg-4-7lqcVL-i9vA"
    }
});

AWS.config.getCredentials((err) => {
  if (err) {
      console.log(err);
  } else {
      var accessKeyId = AWS.config.credentials.accessKeyId
      var secretAccessKey = AWS.config.credentials.secretAccessKey
      var sessionToken = AWS.config.credentials.sessionToken
      //Unique Id for each user in identity pool
      var IdentityID  = AWS.config.credentials._identityId;   
      
      var s3 =  new AWS.S3();           

    //var bucketName =  'harvibkt/us-east-1:01217052-8bc2-417c-a69b-574638df1416';
      var bucketName = 'harvibkt/'+AWS.config.credentials._identityId; //harvinder
      var keyName = 'hello_world.txt';
     
      s3.createBucket({Bucket: bucketName}, function() {
      var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
      s3.putObject(params, function(err, data) {
        if (err)
         console.log(err)
       else
         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
     });
   }); 
     
      
var params = {
  Bucket: 'harvibkt',
  Delimiter: '/',
  Prefix: AWS.config.credentials._identityId +"/",
  //Prefix: "us-east-1:29feb46b-8525-4dc3-9d05-b6d6bca14589/*"
 };

s3.listObjects(params,function(err,data){
  if(err) console.log(err,err.stack);
  else console.log(data.Contents[0]);
  }); 
}
});
