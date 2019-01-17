var AWS = require('aws-sdk');

var accessKeyId = process.env.AWS_ACCESS_KEY || "";
var secretAccessKey = process.env.AWS_SECRET_KEY || "";

// configurando região e credenciais (Caso for utilizar um Topic, a região da configuração deve ser a mesma que a região do Topic)
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

// Criando o parametros da publicação de um sms 
var params = {
    Message: 'Exemplo: Seu código de verificação é 001-901', 
    PhoneNumber: '',
};

function sendMessageSMS(params) {

    //criando promise para a publicação 
    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // verificando a resposta da promise
    publishTextPromise.then(function (data) {
        //console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}");
        console.log("MessageID is " + data.MessageId);
    }).catch(function (err) {
        console.error(err, err.stack);
    });

};

//verificando se um número foi desativado, retorna true ou false

function numberIsOff(number) {
    //criando promise para verificação do no numero 
    var phone = new AWS.SNS({apiVersion: '2010-03-31'}).checkIfPhoneNumberIsOptedOut({phoneNumber: number}).promise();
    
    //verificando a resposta da promise
    phone.then(
        function(data) {
          console.log("Phone Opt Out is " + data.isOptedOut);
          return data.isOptedOut;
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });

};

//Enviando SMS 
//sendMessageSMS(params);

//Verificando Número 
//numberIsOff(params.PhoneNumber);
