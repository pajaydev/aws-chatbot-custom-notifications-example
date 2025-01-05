import { messages } from "../utils";
import { sendMessageToChatbot } from "../utils/sendMessageToChatbot";

export type Order = {
    id: number,
    product: string,
    quantity: number,
    price: number,
    soldPrice: number,
    orderAmount?: number,
    discount?: number,
}
export const handler = async (event: Record<string, any>) => {
    console.log(`Extract data event: ${event}`);

    // fetch data from dynamo, using the mock data here
    const orders: Order[] = [
        { id: 101, product: 'laptop', quantity: 1, price: 1200, soldPrice: 1000 },        
        { id: 102, product: 'monitor', quantity: 2, price: 400, soldPrice: 350 }
    ];
    
    const desc = `Extracted ${orders.length} orders successfully`;
    
    // send update to slack via AWS Chatbot
    await sendMessageToChatbot(messages.EXTRACT_STEP_TITLE, desc);

    return { success: true, orders }
}