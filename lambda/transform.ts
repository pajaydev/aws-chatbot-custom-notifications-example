import { messages } from "../utils";
import { sendMessageToChatbot } from "../utils/sendMessageToChatbot";
import { Order } from "./extract";

export const handler = async (event: Record<string, any>) => {
    console.log(`Transform data event: ${event}`);
    
    const transformedOrders: Order[] = event.Payload.orders.map((order: any) => ({
        ...order,
        orderAmount: order.quantity * order.soldPrice,
        discount: order.price - order.soldPrice,
    }));

    const desc = `Transformed ${transformedOrders.length} orders successfully
    *Order Ids*:  ${transformedOrders.map((order: Order) => order.id).join(', ')}`;

    await sendMessageToChatbot(messages.TRANSFORM_STEP_TITLE, desc);

    return { success: true, transformedOrders }
}