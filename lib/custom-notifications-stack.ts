import * as path from 'path';
import * as cdk from "@aws-cdk/core";
import { SlackChannelConfiguration } from "@aws-cdk/aws-chatbot";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as s3Notifications from "@aws-cdk/aws-s3-notifications";
import { Topic } from "@aws-cdk/aws-sns";

export class CustomNotificationsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create sns topic
    const customNotificationsTopic = new Topic(this, "custom-notif-topic", {
      displayName: "CustomNotificationsTopic",
      topicName: "CustomNotificationsTopic",
    });
  

    // create extract and transform lambda functions
    const extractDataLambda = new NodejsFunction(
      this,
      "ExtractDataLambdaFunction",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "handler",
        entry: path.join(__dirname, '../lambda/extract.ts'),
        environment: {
          SNS_TOPIC_ARN: customNotificationsTopic.topicArn,
          REGION: 'us-east-2'
        }
      }
    );
    console.log("pathhh", path.join(__dirname, '../lambda/transform.ts'));
    const tranformDataLambda = new NodejsFunction(
      this,
      "TranformDataLambdaFunction",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "handler",
        entry: path.join(__dirname, '../lambda/transform.ts'),
        environment: {
          SNS_TOPIC_ARN: customNotificationsTopic.topicArn,
          REGION: 'us-east-2'
        }
      }
    );

    const snsTopicPolicy = new iam.PolicyStatement({
      actions: ['sns:publish'],
      resources: ['*'],
    });

    // add required permissions
    extractDataLambda.addToRolePolicy(snsTopicPolicy)
    tranformDataLambda.addToRolePolicy(snsTopicPolicy)

    // create step function
    const stateMachine = new sfn.StateMachine(this, 'DataProcessingStateMachine', {
      definition: new tasks.LambdaInvoke(this, "ExtractOrders", {
        lambdaFunction: extractDataLambda,
        // Assuming this Lambda function handles extracting orders from DB
        // You can add your specific logic to open tickets
      })
      .next(new tasks.LambdaInvoke(this, "tranformOrders", {
        lambdaFunction: tranformDataLambda,
        // Assuming this Lambda function tranforms the orders in required format
        // You can add your specific logic to close tickets
      }))
      .next(new sfn.Succeed(this, "DataProcessingCompleted")) // Final state after all ticket operations
    });

    // create chatbot configuration
    const slackConfiguration = new SlackChannelConfiguration(
      this,
      "custom-notification-configuration",
      {
        slackChannelConfigurationName: "custom-notification-configuration",
        slackWorkspaceId: "T5EMPHE0K",
        slackChannelId: "C046SE7BBGQ",
      }
    );

    slackConfiguration.addNotificationTopic(customNotificationsTopic);
  }
}
