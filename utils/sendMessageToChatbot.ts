import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

export const sendMessageToChatbot = async(title: string, description: string) => {
    const region = process.env.REGION
    const topicArn = process.env.SNS_TOPIC_ARN

    if (!region || !topicArn) {
        throw new Error(`Missing env variables, region: ${region} and topicArn: ${topicArn}.`);
    }

    // custom notification schema
    // https://docs.aws.amazon.com/chatbot/latest/adminguide/custom-notifs.html
    const content = {
        version: "1.0",
        source: "custom",
        content: {
            title,
            description
        }
    }

    // publish message to SNS topic
    const snsClient = new SNSClient({
        region,
    });

    await snsClient.send(
        new PublishCommand({
          TopicArn: topicArn,
          Message: JSON.stringify(content),
        }),
    );
}