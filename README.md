# AWS Chatbot Custom Notification

This project demonstrates how to customize and send a [custom notification](https://docs.aws.amazon.com/chatbot/latest/adminguide/custom-notifs.html) message from AWS Step function to slack via AWS Chatbot. 

![Architecture Diagram](img/architecture.png|width=250)

## Prerequisite

* Configure [AWS CLI](https://aws.amazon.com/cli/) and configured it with your credentials
* Should have an AWS account and have set up your [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
* Go to AWS Chatbot(https://console.aws.amazon.com/chatbot/) and perform OAuth to configure a slack workspace. Kindly follow this instructions in [step 1](https://docs.aws.amazon.com/chatbot/latest/adminguide/slack-setup.html#slack-client-setup)


## Setup

Clone this repo:
```bash
git clone https://github.com/aws-samples/aws-cdk-examples.git
```

Build this app using below commands:
```bash
npm install -g aws-cdk
npm install
npm run build
```

Configure environment variables - Replace `.env` file in this project with slack workspace Id and channel Id

## Deployment

Synthesize the CloudFormation template using below command:
```bash
cdk synth
```

Deploy the stack using below command:
```bash
cdk deploy
```

## Trigger a Notification


## Clean Up

To clean up, issue this command:
```bash
cdk destroy
```

## Troubleshooting

Kindly create an issue if you face any issues


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
