export enum Endpoint { 
    //user/{...}
    REGISTER = "register",
    LOGIN = "login",
    UPDATE_USER = "update-user/:id",
    DELETE_USER = "delete-user/:id",
    FIND_USER_BY_ID= ":id",
    FIND_USER_LOGIN = "user-login",
    ALL_USER = "all-users",

    ADD_CATEGORY = "add-category",
    GET_ALL_CATEGORY = "all-categories",
    DELETE_CATEGORY = "delete-category/:id",
    UPDATE_CATEGORY = "update-category/:id",

    ADD_COFFEE = "add-coffee",
    DELETE_COFFEE = "delete-coffee/:id",
    GET_ALL_COFFEE = "all-coffees",
    UPDATE_COFFEE = "update-coffee/:id",
    GET_COFFEE_BY_ID = "get-coffee-id/:id",
    LIKE_COFFEE = "like-coffee/:id",
    UNLIKE_COFFEE = "unlike-coffee/:id",
    GET_COFFEE_LIKED = "get-coffee-liked",

    ORDER_COFFEE = "order-coffee",
    GET_ALL_ORDER = "all-orders",
    RECEIVED_ORDER = "received/:id",
    DELETE_ORDER = "delete-order/:id",
    GET_ALL_ORDER_USER_LOGIN = "all-orders-user",
    CANCLE_ORDER = "cancle-order/:id",

    REVIEW_COFFEE = "review-coffee/:id",

    CREATE_WALLET = "create-wallet",
    TOP_UP_TO_WALLET = "top-up",
    
}