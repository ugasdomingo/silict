import axios from 'axios';

export const createOrder = async (req: any, res: any) => {
    const order = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'EUR',
                    value: '50.00',
                },
            },
        ],
        aplication_context: {
            brand_name: 'Silicit',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `${process.env.HOST}/payment/capture-order`,
            cancel_url: `${process.env.HOST}/payment/cancel-order`,
        },
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const {
        data: { access_token },
    } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: process.env.PAYPAL_CLIENT as string,
            password: process.env.PAYPAL_SECRET as string,
        },
    });

    const response = await axios.post(
        `${process.env.PAYPAL_API}/v2/checkout/orders`,
        order,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    return res.json(response.data);
};

export const captureOrder = async (req: any, res: any) => {
    const { token } = req.query;

    const response = await axios.post(
        `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        null,
        {
            auth: {
                username: process.env.PAYPAL_CLIENT as string,
                password: process.env.PAYPAL_SECRET as string,
            },
        }
    );
    console.log(response.data);

    return res.json('payed');
};

export const cancelOrder = (req: any, res: any) =>
    res.send('cancelOrder create');
