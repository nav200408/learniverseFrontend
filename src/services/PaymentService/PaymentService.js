import axiosClient from "../AxiosSecurity";

export function doPayment(orderInfo, amount){
return axiosClient.post("http://localhost:8084/payment-route/payment/submitOrder",{
    "orderInfo": orderInfo,
    "amount": amount
},{
    headers:{
        "Content-Type":"application/json"
    }
});
}